import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function Post({_id,title,text,tags,image,createdAt}) {
    return (
        <article className="grid place-items-center pb-12 max-w-4xl mx-auto">
              <Link to={`/posts/${_id}`} className=" w-full h-80"><img className="h-full object-cover w-full" src={image} alt={title} /></Link>
              <h2 className="mt-5 mb-2 text-center font-semibold">{title}</h2>
              <Moment className="text-gray-400" format="MMM DD YYYY" date={createdAt}/>
              <ul className="flex gap-2 text-gray-500 dark:text-purple-400">
                  {tags.map((tag,index)=>{
                      return(
                          <li key={index}>#{tag}</li>
                      )
                  })}
              </ul>
              
              <div className="p-5">{
                 text.replace('\n\n','\n').split('\n').map((paragraph,index)=>{
                    return <p key={index}>{paragraph}<br/><br/></p>
                })
              }</div>
        </article>
    )
}
