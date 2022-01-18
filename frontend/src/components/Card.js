import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Card({_id,title,text,image}) {
    const history = useHistory();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:max-w-md mb-4">
              <div className="self-center relative w-full h-0 pb-2/3">
                <img className="absolute inset-0 object-cover h-full w-full" src={image} alt={title} />
              </div>
             
              {/* Card Content */}
              <div className="relative p-5 mb-14 w-full h-full">
                <div className="grid gap-5">
                  <h3>{title}</h3>
                  <p>{
                    text.split('\n')[0].length>200 ? `${text.split('\n')[0].substring(0,200)}...`: text.split('\n')[0]
                }</p>
                  <div className="absolute grid justify-items-center place-items-center left-0 bottom-0 h-14 w-full">
                    <button className="inline-block btn-primary w-3/5" onClick={()=>history.push(`/posts/${_id}`)}>Read more</button>
                  </div>
                </div>
              </div>
        </div>
    )
}
