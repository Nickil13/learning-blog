import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Card({_id,title,text,image}) {
    const history = useHistory();
    return (
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:max-w-md">
              <div className="h-60">
                <img className="object-cover h-full w-full" src={image} alt={title} />
              </div>
             
                 
              {/* Card Content */}
              <div className="p-5 w-full h-full">
                <div className="grid gap-5">
                  <h3>{title}</h3>
                  <p>{
                    text.split('\n')[0].length>200 ? `${text.split('\n')[0].substring(0,200)}...`: text.split('\n')[0]
                }</p>
                  <button className="btn-primary w-3/5 mx-auto" onClick={()=>history.push(`/posts/${_id}`)}>Read more</button>
                </div>
            
                
              </div>
        </div>
    )
}
