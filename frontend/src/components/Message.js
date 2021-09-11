import React from 'react'
import {BiCheckCircle, BiXCircle} from 'react-icons/bi';
import {Link} from 'react-router-dom';

export default function Message({type,children,link}) {
    return (
        // <div className={`mt-5 text-center p-2 border-2 border-gray-200 ${type==="error" && `border-red-500`}
        // ${type==="success" && `border-purple-500`}
        // flex justify-center items-center gap-5
        // dark:text-white dark:bg-purple-500`}>
        //     {type==="success" ? <BiCheckCircle className="text-2xl text-purple-500 dark:text-white"/> : <BiXCircle className="text-2xl text-red-500"/>}
        //     {children}
        //     {link &&<Link className="text-purple-500 hover:text-purple-700" to={link}>View post</Link>}
        // </div>
        <div className={`mt-5 text-gray-100 text-center p-2 px-5 rounded ${type==="error" && `bg-red-500`}
        ${type==="success" && `bg-purple-500`}
        flex justify-center items-center gap-5`}>
            {type==="success" ? <BiCheckCircle className="text-2xl text-white"/> : <BiXCircle className="text-2xl text-white"/>}
            {children}
            {link &&<Link className="text-purple-500 hover:text-purple-700" to={link}>View post</Link>}
        </div>
    )
}
