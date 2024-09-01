import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSession } from '../../components/SessionContext.jsx';

const BrowsePage = () => {
  const [term, setTerm] = useState('Fall');
  const [comparison, setComparison] = useState("1");
  const [classTag, setClassTag] = useState('');
  const [instructor, setInstructor] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]); // State to hold department list
  const [displayedClasses, setDisplayedClasses] = useState([]); // Classes to display on the current page
  const [classes, setClasses] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [timeoutId, setTimeoutId] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const { user, csrfToken, schedules, setSchedules, loading, setClassCounts } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const limit = 10;

  const fetchClasses = async (page = 1) => {
    setLocalLoading(true);
    try {
      const response = await axios.get('/api/classes/fetchClasses', { 
        params: { 
          term, 
          classTag,
          comparison,
          instructor, 
          department, 
          limit: limit           // Number of classes per page
        } 
      });
      setCurrentPage(1)
      setClasses(response.data.classes);
      setDisplayedClasses(response.data.classes.slice(0, limit));
      setTotalPages(response.data.totalPages); // Update total pages from backend response
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
    setLocalLoading(false);
  };

  // Fetch departments and classes on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/classes/departments'); // Fetching departments dynamically
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    console.log("depts found")
    fetchDepartments();
    fetchClasses();
    console.log("classes found")
  }, []);

  // Handle page changes
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;
    setDisplayedClasses(classes.slice(startIndex, endIndex));
  };

  useEffect(() => {
    console.log(classes);
  }, [classes])

  const handleAddClass = async (classId) => {
    if (!user) {
      navigate('/signin');
    } else {
      try {
        const response = await axios.post(
          '/api/schedules/addClass',
          { classId, term: term.toLowerCase() },
          {
            withCredentials: true,
            headers: {
              'X-CSRF-TOKEN': csrfToken
            }
          }
        );
        setMessage(response.data.message);
        setMessageType('success');
        setMessageVisible(true);

        const updatedSchedule = response.data.schedule;

        setSchedules((prevSchedules) => {
          const newSchedules = { ...prevSchedules };
          newSchedules[term] = updatedSchedule;
          return newSchedules;
        });

        setClassCounts((prevClassCounts) => {
          const newClassCounts = { ...prevClassCounts };
          newClassCounts[term] = newClassCounts[term] + 1;
          return newClassCounts;
        });
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
          setMessageType('error');
        } else {
          setMessage('Error adding class.');
          setMessageType('error');
        }
        setMessageVisible(true);
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setMessageVisible(false);
      }, 4000);

      setTimeoutId(newTimeoutId);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 sm:p-16 bg-gray-100">
      {/* Filter Container */}
      <div className="w-full max-w-full lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[60%] p-4 sm:p-6 bg-white shadow-md rounded-lg mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Term Dropdown */}
          <div className="w-full sm:w-1/4">
            <label htmlFor="term" className="block text-sm font-medium text-gray-700">
              Select Term
            </label>
            <select
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="w-full sm:w-1/4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Select Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* ClassTag and Comparison Container */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <label htmlFor="classTag" className="block text-sm font-medium text-gray-700">
              Class Tag
            </label>
            <div className="w-full sm:w-1/2 flex items-center">
              <select
                id="comparison"
                value={comparison}
                onChange={(e) => setComparison(e.target.value)}
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="0">Less Than</option>
                <option value="1">Equals</option>
                <option value="2">Greater Than</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <input
                id="classTag"
                type="text"
                value={classTag}
                onChange={(e) => setClassTag(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Instructor Input */}
          <div className="w-full sm:w-1/4">
            <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
              Search by Instructor
            </label>
            <input
              type="text"
              id="instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g. Smith"
            />
          </div>

          
        </div>
        {/* Find Classes Button */}
        <div className="flex justify-end">
          <button
            onClick={() => fetchClasses(1)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Find Classes
          </button>
        </div>
      </div>

      {/* Display Message */}
      {message && (
        <div
          className={`text-center mb-4 ${messageType === 'error' ? 'text-red-500' : 'text-blue-500'} font-semibold`}
          style={{
            transition: 'opacity 0.5s ease-out',
            opacity: messageVisible ? 1 : 0,
          }}
        >
          {message}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="w-full max-w-full lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[60%] mb-4 flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="text-blue-600 disabled:text-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          className="text-blue-600 disabled:text-gray-400"
        >
          Next
        </button>
      </div>

      {/* Carousel Container */}
      <div className="w-full max-w-full lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[60%] mt-6">
        {!localLoading? (
          displayedClasses.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {displayedClasses.map((course) => (
                <div
                  key={course._id}
                  className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center"
                >
                  {/* Left side: Class Info */}
                  <div className="w-full sm:w-2/3">
                    <div className="text-lg sm:text-xl font-bold">
                      {course.dept} {course.classTag} - {course.sectionNumber} : {course.className}
                    </div>
                    <div className="text-sm text-gray-600">{course.instructor}</div>
                  </div>

                  {/* Right side: Class Days */}
                  <div className="ml-auto w-full sm:w-1/3 text-sm text-right mt-2 sm:mt-0">
                    {Object.entries(course.classDays).map(([day, time]) => (
                      <div key={day}>
                        <span className="font-medium">{day}:</span> {time}
                      </div>
                    ))}
                  </div>

                  {/* Add to Schedule Button */}
                  <button
                    onClick={() => handleAddClass(course._id)}
                    className="bg-blue-500 text-white rounded-full p-2 mt-2 sm:mt-0 sm:ml-4"
                  >
                    <span className="font-bold">+</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No classes found for the selected filters.</div>
          )
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>

      {/* Pagination Controls at Bottom */}
      <div className="w-full max-w-full lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[60%] mt-4 flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="text-blue-600 disabled:text-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          className="text-blue-600 disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};


export default BrowsePage;