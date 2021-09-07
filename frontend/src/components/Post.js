import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function Post({_id,title,text,tags,image,createdAt}) {
    return (
        <article className="grid place-items-center pb-12 max-w-4xl mx-auto">
              <Link to={`/posts/${_id}`} className=" w-full"><img className="max-h-80 object-cover w-full" src={image} alt={title} /></Link>
              <h2 className="mt-5 mb-5 text-center">{title}</h2>
              <ul className="flex gap-2 text-gray-500 dark:text-purple-400">
                  {tags.map((tag,index)=>{
                      return(
                          <li key={index}>#{tag}</li>
                      )
                  })}
              </ul>
              <Moment className="text-gray-400" format="MMM DD YYYY" date={createdAt}/>
              <div className="p-5">{
                 text.split('\n').map((paragraph,index)=>{
                    return <p key={index}>{paragraph}<br/><br/></p>
                })
              }</div>
        </article>
    )
}
