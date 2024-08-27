import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className=' text-white flex items-center flex-row py-3 justify-between sm:mx-10'>
    <div className='flex flex-row items-center gap-x-3 hover:cursor-pointer'>
    <i className='bx bx-play bg-[#B6FF52] text-blue-950 text-5xl rounded-full'></i>
    <h1 className='font-bold text-2xl'>SoundBox</h1>
    </div>
    <div className='hover:cursor-pointer hidden sm:flex flex-row gap-x-10'>
        <p className='text-[#B6FF52] font-bold'>Home</p>
        <p>Album</p>
        <p>Artist</p>
        <p>Sound</p>
    </div>
    <div className='sm:hidden'>
    <i className='bx bx-menu text-5xl text-[#B6FF52]'></i>
    </div>
    <div className='hidden sm:block'>
        <button className='sm:bg-[#B6FF52] sm:font-bold  sm:rounded-xl  sm:text-black sm:py-[12px] sm:px-[44px]'>JOIN</button>
    </div>
    </nav>    
    </>
  )
}

export default Navbar