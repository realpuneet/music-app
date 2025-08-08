import React from 'react'

const Search = () => {
  return (
    <div className='h-screen flex flex-col gap-2 items-center  bg-gray-800 p-2'>
      <h2 className='text-xl text-white font-bold'>Search Song</h2>
      <div className='w-full'>
        <input className='w-full bg-white p-1 text-black rounded outline-0' type="search" name="" id="" />
      </div>
    </div>
  )
}

export default Search
