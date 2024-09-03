import React from 'react'
import sadsong from '../assets/sadsong.png'
import play from '../assets/playbutton.png'

const Topsong = () => {
  return (
    <div>
        <div className='flex flex-row gap-x-6 items-center'>
            <h1 className='font-bold'>#01</h1>
            <div className='flex flex-row gap-2'>
            <img src={sadsong} alt="" className='size-10 rounded-lg'/>
            <div className='text-sm'>
                <h1 className='font-bold'>Bad Habbit</h1>
                <p className='text-gray-500'>Steve Lacy</p>
            </div>
            </div>
            <img src={play} alt="" className='size-6'/>
        </div>
    </div>
  )
}

export default Topsong