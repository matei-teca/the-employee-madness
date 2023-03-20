import React from 'react'

export default function SearchBy() {
  return (
    <div>
        {/* <div>SearchBy</div> */}
        <input type="text" placeholder="choose a Position or Level" className='input'/>
        <button>Filter by Position</button>
        <button>Filter by Level</button>
    </div>
  )
}
