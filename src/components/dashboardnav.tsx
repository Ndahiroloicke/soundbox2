

const DashboardNav = () => {
    return (
        <div className='hidden lg:block sm:text-white sm:pt-10 sm:bg-[#0C203C] sm:w-fit sm:pb-20'>
            <div className='sm:flex ml-9 mr-20 mb-10 flex-row items-center gap-x-3 hover:cursor-pointer'>
                <i className='bx bx-play bg-[#B6FF52] text-blue-950 text-5xl rounded-full'></i>
                <h1 className='font-bold text-2xl'>SoundBox</h1>
            </div>
            <p className='mb-8 pl-8'>Main Menu</p>
            <nav className='pl-8'>
                <p><i className='bx bx-grid-alt text-[#B6FF52] text-2xl mr-4 mb-8' ></i><span className='font-bold text-[#B6FF52]'>Dashboard</span></p>
                <p><i className='bx bx-bar-chart mr-4 mb-8'></i><span>Album</span></p>
                <p><i className='bx bx-user mr-4 mb-8'></i><span>Artist</span></p>
                <p><i className='bx bx-volume-full mr-4 mb-8'></i><span>Sound</span></p>
                <p><i className='bx bx-heart mr-4 mb-8'></i><span>Favourites</span></p>
            </nav>
            <p className='mb-8 pl-8'>Support</p>
            <nav className='pl-8'>
                <p><i className='bx bx-cog mr-4 mb-8'></i><span>Settings</span></p>
                <p><i className='bx bxs-user-account mr-4 mb-8'></i><span>Community</span></p>
                <p><i className='bx bx-message-rounded-dots mr-4 mb-8'></i>Comments</p>
            </nav>
        </div>
    )
}

export default DashboardNav;