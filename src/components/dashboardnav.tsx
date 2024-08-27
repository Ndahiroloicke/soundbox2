import React from 'react'

const DashboardNav = () => {
    return (
        <div className='text-white'>
            <div className='flex flex-row items-center gap-x-3 hover:cursor-pointer'>
                <i className='bx bx-play bg-[#B6FF52] text-blue-950 text-5xl rounded-full'></i>
                <h1 className='font-bold text-2xl'>SoundBox</h1>
            </div>
            <p>Main Menu</p>
            <nav>
                <p><i className='bx bx-grid-alt' ></i><span>Dashboard</span></p>
                <p><i className='bx bx-bar-chart'></i><span>Album</span></p>
                <p><i className='bx bx-user'></i><span>Artist</span></p>
                <p><i className='bx bx-volume-full'></i><span>Sound</span></p>
                <p><i className='bx bx-heart'></i><span>Favourites</span></p>
            </nav>
        </div>
    )
}

export default DashboardNav