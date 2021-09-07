import React, { useState } from 'react';
import { useGlobalContext } from '../context';

export default function Login() {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const{login, loginMessage} = useGlobalContext();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        login(username,password);
    }
    return (
        <div className="grid place-items-center w-4/5 max-w-lg mx-auto bg-gray-600 p-10 rounded-md">
            <h1 className="text-gray-100 mb-5">Login</h1>
            {loginMessage && <h2>{loginMessage}</h2>}
            <form className="grid" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row justify-between items-center p-5">
                    <label className="text-gray-100 mr-5 mb-3" htmlFor="username">Username</label>
                    <input className="p-3 dark:bg-purple-200 dark:text-black" type="text" id="username" placeholder="Admin" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center p-5 py-3">
                    <label className="text-gray-100 mr-5 mb-3" htmlFor="password">Password</label>
                    <input className="p-3 dark:bg-purple-200 dark:text-black" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="btn-primary mx-auto mt-5 w-32">login</button>
            </form>
        </div>
    )
}
