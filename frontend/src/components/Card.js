import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Card({_id,title,text,image}) {
    const history = useHistory();
    return (
        <div className="grid place-items-center grid-cols-2 md:grid-cols-1 lg:max-w-md">
              <img className="object-cover h-60 w-full" src={image} alt={title} />
                      
              {/* Card Content */}
              <div className="p-5 w-full">
                <div className="grid gap-5">
                  <h3>{title}</h3>
                  <div>{
                    text.split('\n')[0].length>200 ? `${text.split('\n')[0].substring(0,200)}...`: text.split('\n')[0]
                }</div>
                  <button className="btn-primary w-3/5 mx-auto" onClick={()=>history.push(`/posts/${_id}`)}>Read more</button>
                </div>
            
                
              </div>
        </div>
    )
}
