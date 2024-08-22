import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowsePage = () => {
    const [term, setTerm] = useState('Fall');
    const [term2, setTerm2] = useState('Fall');
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('/api/classes/fetchClasses', { params: { term } });
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
      <div className="min-h-screen w-full flex flex-col items-center p-16 bg-gray-100">
        {/* Filter Container */}
        <div className="w-full max-w-full lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[60%] p-4 sm:p-6 bg-white shadow-md rounded-lg mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Term Dropdown */}
                <div className="w-full sm:w-1/2">
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
                {/* Term 2 Dropdown */}
                <div className="w-full sm:w-1/2">
                    <label htmlFor="term2" className="block text-sm font-medium text-gray-700">
                        Select Term 2
                    </label>
                    <select
                        id="term2"
                        value={term2}
                        onChange={(e) => setTerm2(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="Fall2">Fall2</option>
                        <option value="Winter2">Winter2</option>
                        <option value="Spring2">Spring2</option>
                        <option value="Summer2">Summer2</option>
                    </select>
                </div>
            </div>
            {/* Find Classes Button */}
            <div className="flex justify-end">
                <button
                    onClick={fetchClasses}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                    Find Classes
                </button>
            </div>
        </div>

        {/* Carousel Container */}
        <div className="w-full max-w-full lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[60%] mt-6">
            {classes.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {classes.map((course) => (
                        <div 
                            key={course._id} 
                            className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center"
                        >
                            {/* Left side: Class Info */}
                            <div className="w-full sm:w-2/3">
                                <div className="text-lg sm:text-xl font-bold">{course.classTag} - {course.className}</div>
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
                            <button className="bg-blue-500 text-white rounded-full p-2 mt-2 sm:mt-0 sm:ml-4">
                                <span className="font-bold">+</span>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No classes found for the selected term.</div>
            )}
        </div>
      </div>
    );
};

export default BrowsePage;