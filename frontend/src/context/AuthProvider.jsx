import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../api"

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});
    const [loadingFetchUser, setLoadingFetchUser] = useState(true);

    const fetchUser = async () => {
        setLoadingFetchUser(true);
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const response = await api.get('/api/user');
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem("token");
        }finally{
            setLoadingFetchUser(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const setUserAndToken = (userData, accessToken) => {
        setUser(userData);
        localStorage.setItem("token", accessToken);
    }

    const register = async (name, email, password, passwordConfirmation) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);   
        try {
            const response = await api.post('/api/register', formData);
            setUserAndToken(response.data.user, response.data.access_token);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    const login = async (email, password) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        try {
            const response = await api.post("/api/login", formData);
            setUserAndToken(response.data.user, response.data.access_token);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    const logout = async () => {
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await api.post('/api/logout');
        } catch (error) {
            console.log('Logout error: '+error);
        }finally{
            setUser({});
            localStorage.removeItem("token");
        }
    };
    
    const contextValue = {
        user,
        loadingFetchUser,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};