import requests
from bs4 import BeautifulSoup
import json

url = 'https://registrar.ucsc.edu/soc/final-examinations.html'

def scrape_data(url):
    response = requests.get(url)
    header_mapping = {
        "Class": "classDay",
        "Start": "startTime",
        "Exam Date": "examDate",
        "Exam Times": "examTimes"
    }
    soup = BeautifulSoup(response.content, 'html.parser')
    table = soup.find('table')
    data = []
    if table:
        headers = [header.get_text().strip() for header in table.find_all('th')]
        for row in table.find_all('tr')[1:-1]:
            cols = row.find_all('td')
            if cols:
                if all(col.get_text().strip() == '' for col in cols):
                    continue
                exam_info = {
                            header_mapping.get(headers[i], headers[i]): cols[i].get_text().strip()
                            for i in range(len(cols))
                        }
                data.append(exam_info)
    with open('final_exam.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)