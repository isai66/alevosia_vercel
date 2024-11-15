import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); 

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    const navigateTo = useNavigate();



    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData);

        const decodedToken = jwtDecode(token);
        const userRoles = decodedToken.roles;

        console.log(userData);
        console.log('Roles del usuario:', userRoles);
        
    };

    const logout = () => {
        localStorage.removeItem('id_usuario');
        localStorage.removeItem('token');
        setAuthToken(null);
        localStorage.removeItem('userData');
        setUserData(null);
        navigateTo('/');
    };

    function clearSessionCookies() {
        // Obtener todas las cookies
        var cookies = document.cookie.split(";");
      
        // Iterar sobre cada cookie
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          // Establecer la fecha de caducidad en el pasado para eliminar la cookie
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      }

    const isAuthenticated = !!authToken;

    return (
        <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated, userData, setUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};

