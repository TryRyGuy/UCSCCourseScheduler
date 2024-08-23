import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    // Variables for the user (format _id, email), the user's csrf token, and loading status
    const [user, setUser] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    const [loading, setLoading] = useState(true);

    // Variables for the User's schedules and their classCounts (Lists of the actual classes)
    const [schedules, setSchedules] = useState({ 
        fall: null, 
        winter: null, 
        spring: null, 
        summer: null 
    });
    const [classCounts, setClassCounts] = useState({ 
        fall: 0, 
        winter: 0, 
        spring: 0, 
        summer: 0 
    });

    const fetchSession = async () => {
        try {
            const response = await axios.get('/api/session', { withCredentials: true });
            setUser(response.data.user);
            if (response.data.user) {
                const schedulesResponse = await axios.get('/api/schedules/getSchedules', { withCredentials: true });
                setSchedules(schedulesResponse.data.schedules);
                setClassCounts(schedulesResponse.data.classCounts);
               
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // If the user is not logged in, just set user to null
                setUser(null);
            } else {
                console.error('Error checking session:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCsrfToken = async () => {
        try {
            const csrfResponse = await axios.get('http://localhost:5000/api/csrf-token', { withCredentials: true });
            setCsrfToken(csrfResponse.data.csrfToken);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };
    
    // Explore swapping order of these procedures/functions
    useEffect(() => {
        fetchCsrfToken();
        fetchSession();
    }, []);

    useEffect(() => {
        console.log('Schedules updated:', schedules);
        console.log('Class counts updated:', classCounts);
    }, [schedules, classCounts]); // Logs will occur after updates
    
    useEffect
    return (
        <SessionContext.Provider value={{ user, setUser, csrfToken, loading, schedules, setSchedules, classCounts, setClassCounts  }}>
            {children}
        </SessionContext.Provider>
    );
};
