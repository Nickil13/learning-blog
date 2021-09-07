import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const[theme,setTheme] = useState('light');
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const[userInfo,setUserInfo] = useState({});
    const[loginMessage,setLoginMessage] = useState("");
    const[isConfirmDelete,setIsConfirmDelete] = useState(false);
    const[isAlertShowing,setIsAlertShowing] = useState(false);

    
    useEffect(()=>{
        // Check if there is a user already logged in
        let data = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
        if(data){
            setUserInfo(data);
            setIsLoggedIn(true);
        }
    },[])

    useEffect(()=>{
        let localTheme = localStorage.getItem('theme');
        setTheme(localTheme);
    },[])

    const toggleTheme = () => {
        if(theme==='dark'){
            setTheme('light');
            localStorage.setItem('theme','light');
        }else if(theme==='light'){
            setTheme('dark');
            localStorage.setItem('theme','dark');
        }
    }
    const confirmDelete = () =>{
        setIsConfirmDelete(true);
    }

    const closeAlert = () =>{
        setIsAlertShowing(false);
    }
    const showAlert = () =>{
        setIsAlertShowing(true);
    }
    
    const login = async (username,password) => {
        //Verify password
        try{
            const {data} = await axios.post("/api/users/login",{username,password})
            setUserInfo(data);
            setIsLoggedIn(true);
            //save user & token to local storage
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoginMessage("Logged in!");
        }catch(error){
            console.log(error);
            setLoginMessage("Error logging in");
        }
        
        
    }
    const logout = () =>{
        setUserInfo({});
        setIsLoggedIn(false);
        localStorage.removeItem('userInfo');
    }
    
    return <AppContext.Provider 
    
    value=
    {{
        isLoggedIn,
        login,
        loginMessage,
        userInfo,
        logout,
        confirmDelete,
        isConfirmDelete,
        setIsConfirmDelete,
        showAlert,
        closeAlert,
        isAlertShowing,
        toggleTheme,
        theme
    }}>
        {children}
    </AppContext.Provider>
}


export const useGlobalContext = () =>{
    return useContext(AppContext);
}

