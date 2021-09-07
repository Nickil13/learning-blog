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
        <div className="absolute top-0 right-0 left-0 bottom-0 grid place-items-center bg-black bg-opacity-50">
            <div className="grid place-items-center relative w-60 h-40 bg-gray-400 p-5 shadow-md rounded">
                <p>Are you sure you want to delete the post: [{postName}]?</p>
                
                <button className="btn-primary w-16" onClick={handleConfirmDelete}>yes</button>
                <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={closeAlert}><FaTimes/></span>
                
                
            </div>
            
        </div>
    )
}
