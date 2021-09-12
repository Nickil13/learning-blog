import React from 'react';
import {useGlobalContext} from '../context';
import { FaTimes } from 'react-icons/fa';

export default function Alert({postName}) {
    const{closeAlert,confirmDelete} = useGlobalContext();

    const handleConfirmDelete = () =>{
        confirmDelete();
        closeAlert();
    }
    return (
        <div className="fixed z-10 top-0 right-0 left-0 bottom-0 grid place-items-center bg-black bg-opacity-50">
            <div className="grid place-items-center relative w-4/5 max-w-md bg-gray-200 border-8 border-white p-5 shadow-md rounded">
                <h3 className="font-semibold  w-full border-b-2 border-black p-5">Delete Post</h3>
                <p className="text-center p-5">Are you sure you want to delete the post:<br/>[{postName}]?</p>
                
                <div className="flex gap-5">
                    <button className="btn-primary bg-white w-16" onClick={handleConfirmDelete}>yes</button>
                    <button className="btn-primary bg-white w-16" onClick={closeAlert}>no</button>
                </div>
                
                {/* <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={closeAlert}><FaTimes/></span> */}
                
                
            </div>
            
        </div>
    )
}
