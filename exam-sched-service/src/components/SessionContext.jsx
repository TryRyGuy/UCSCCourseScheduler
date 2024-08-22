import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    const [loading, setLoading] = useState(true);

    // Explore swapping order of these procedures/functions
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true });
                setUser(response.data.user);
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

        
        fetchCsrfToken();
        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{ user, setUser, csrfToken, loading }}>
            {children}
        </SessionContext.Provider>
    );
};
