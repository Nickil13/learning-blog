import React from 'react';
import {Link} from 'react-router-dom';

export default function Pagination({ pages, page}) {
    return pages >1 && (
        <div>
            <ul className="flex gap-5 w-full justify-center mt-5">
                {[...Array(pages).keys()].map((pageNum)=>{
                    return(
                    <Link key={pageNum+1}to={`/admin/page/${pageNum+1}`}>
                        <li className={`${Number(page)===(pageNum+1) && "bg-purple-300"} px-2 py-1 rounded bg-gray-300 hover:bg-purple-600 cursor-pointer`}>
                            {pageNum+1}
                        </li>
                    </Link>
                    );
                })}
            </ul>
        </div>
    )
}
