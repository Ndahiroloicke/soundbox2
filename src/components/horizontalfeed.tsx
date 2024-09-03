import React from 'react'
import Imagebox from './imagebox'

const Horizontal = () => {
  return (
    <div className='text-white mt-9'>
        <div className='mb-9'>
            <h1 className='font-extrabold text-2xl'>Recently Played</h1>
        </div>
        <div className='flex flex-row gap-x-6'>
            <Imagebox/>
            <Imagebox/>
            <Imagebox/>
            <Imagebox/>
            <Imagebox/>
            <Imagebox/>
        </div>
    </div>
  )
}

export default Horizontal