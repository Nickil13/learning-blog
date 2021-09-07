import React from 'react'

export default function ComboBox({name, list, value,onChange}) {
    return (
        <div>
            <select className="post-input" type="text" id={name} value={value} placeholder={name} onChange={onChange}>
                    {list.map((item,index)=>{
                            return <option key={index} value={item}>{item}</option>
                        })}
             </select>
        </div>
    )
}
