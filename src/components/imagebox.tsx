import React from 'react'
import sadsong from '../assets/sadsong.png'

const Imagebox = () => {
  return (
    <div>
        <div className='flex flex-col'>
        <img src={sadsong} alt="" className='size-28 rounded-md'/>
        <div className='text-sm mt-2'>
            <h1 className='font-bold'>Bad Habit</h1>
            <p className='text-gray-500'>Steve Lacy</p>
        </div>
        </div>
    </div>
  )
}

export default Imagebox