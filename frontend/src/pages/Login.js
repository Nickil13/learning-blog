import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import Message from '../components/Message';

export default function Login() {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const{login, message, loading} = useGlobalContext();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        login(username,password);
    }
    return (
        <div className="grid place-items-center max-w-lg mx-auto bg-gray-600 p-10 w-full rounded-md">
            <h1 className="text-gray-100 mb-5">Login</h1>
            {loading ? <p>Loading...</p> : message && <Message type="error">{message}</Message>}
            <form className="grid w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row justify-between items-center py-5">
                    <label className="text-gray-100 md:mr-5 mb-3" htmlFor="username">Username</label>
                    <input className="p-3 w-4/5 dark:bg-purple-200 dark:text-black" type="text" id="username" placeholder="admin" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center py-5">
                    <label className="text-gray-100 md:mr-5 mb-3" htmlFor="password">Password</label>
                    <input className="p-3 w-4/5 dark:bg-purple-200 dark:text-black" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="btn-primary mx-auto mt-5 w-32">login</button>
            </form>
        </div>
    )
}
