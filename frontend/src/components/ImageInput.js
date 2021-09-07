import React from 'react'
import { BsImage} from 'react-icons/bs';

export default function ImageInput({name, onChange}) {
    return ( 
        <div className="p-5 flex gap-5 justify-between items-center">
            <p>Image</p>
            <div className="flex justify-between items-center w-full p-3">
                <p className="post-input mr-5">{name}</p>
                <label className="mr-5 mb-3 dark:text-gray-400" htmlFor="image"><BsImage className="cursor-pointer hover:text-purple-500 dark:hover:text-white text-2xl"/></label>
            </div>
            <input className="hidden" type="file" id="image" placeholder="an image" onChange={onChange}/>
        </div>
    )
}
