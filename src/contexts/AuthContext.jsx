import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (credentials) => {
        if (credentials.email === 'testuser@example.com' && credentials.password === 'password123') {
            setUser(credentials.email);
            return true;
        } else {
            alert('Invalid credentials');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};