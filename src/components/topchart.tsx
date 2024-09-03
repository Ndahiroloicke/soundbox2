import React from 'react'
import profile from '../assets/profile.png'
import Topsong from './topsong'

const TopChart = () => {
  return (
    <div className='text-white my-6'>
        <div className='flex flex-row items-center gap-x-3'>
            <img src={profile} alt="" className='size-12'/>
            <div className='text-sm'>
                <h1 className='font-bold'>Guest</h1>
                <p className='text-gray-500'>guest@gmail.com</p>
            </div>
        </div>
        <div className='mt-16'>
            <h1 className='font-bold text-xl'>Today's Top Charts</h1>
            <div className='flex flex-col gap-y-4 mt-7'>
                <Topsong/>        
                <Topsong/>        
                <Topsong/>        
                <Topsong/>        
            </div>
        </div>
    </div>
  )
}

export default TopChart