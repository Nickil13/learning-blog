import React from 'react'
import {BiCheckCircle} from 'react-icons/bi';

export default function Message({type,children}) {
    return (
        <div className={`mt-5 text-center p-2 border-2 border-gray-200 ${type==="error" && `border-red-500`}
        ${type==="success" && `border-purple-500`}
        flex justify-center items-center gap-5
        dark:text-white dark:bg-purple-500`}>
            {type==="success" && <BiCheckCircle className="text-2xl text-purple-500 dark:text-white"/>}
            {children}
        </div>
    )
}
