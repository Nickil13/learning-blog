import React from 'react'

export default function Cell({children}) {
    return (
        <div className="lg:w-4/5 p-2">
            {children}
        </div>
    )
}
