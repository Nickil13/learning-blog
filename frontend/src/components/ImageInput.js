import React, { useState } from 'react'
import { BsImage} from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';

export default function ImageInput({name, onUploadClick, handleUploadSelect, setSelectorShowing}) {
    const[file,setFile] = useState(null);

    const handleOnChange = (e) => {
        let file = e.target.files[0];
        
        setFile(file);
        handleUploadSelect(file);
    }
    const handleUploadImage = () =>{
        onUploadClick(file);
        setFile(null);
    }
    return ( 
        <div className="p-5 grid gap-5 justify-center bg-purple-200 dark:bg-transparent  items-center border-2 border-transparent dark:border-purple-200">
            
            <div className="text-center">
                <p className="font-semibold">Image</p>
                <p className="pt-2 pb-5">Select an existing image or upload a new one.</p>
                <div className="flex space-between">
                    <p className="border-b-2 max-w-60 w-4/5 mx-auto">{name}</p>
                    <button type="button" className="cursor-pointer hover:text-purple-500 dark:text-gray-300 dark:hover:text-white text-2xl" onClick={()=>setSelectorShowing(true)}><BsImage/></button>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <label className="mr-5 mb-3 dark:text-gray-400" htmlFor="image"><FiUpload className="cursor-pointer hover:text-purple-500 dark:hover:text-white text-2xl"/></label>
                <button className="btn-primary w-20" type="button" onClick={handleUploadImage}>Upload {file && file.name}</button>
            </div>
            <input className="hidden" accept="image/*" type="file" id="image" placeholder="an image" onChange={handleOnChange}/>
            
            
        </div>
    )
}
