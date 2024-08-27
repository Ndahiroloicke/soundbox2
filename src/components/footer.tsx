import React from 'react'

const Footer = () => {
    return (
        <div className='text-white mt-36 flex flex-row justify-between bg-[#162945] px-40 py-16'>
            <div>
                <div className='flex mb-5 flex-row items-center gap-x-3 hover:cursor-pointer'>
                    <i className='bx bx-play bg-[#B6FF52] text-blue-950 text-5xl rounded-full'></i>
                    <h1 className='font-bold text-2xl'>SoundBox</h1>
                </div>
                <div className='font-extralight'>
                    <p>Copyrights &copy; 2022</p>
                    <p>All Rights Reserved</p>
                </div>
            </div>
            <div className='flex flex-col font-extralight'>
                <h1 className='font-bold'>Social Media</h1>
                <p>Twitter</p>
                <p>TikTok</p>
                <p>Facebook</p>
                <p>Instagram</p>
            </div>
            <div className='font-extralight'>
                <h1 className='font-bold'>Terms &amp; Condition</h1>
                <p>Privacy Policy</p>
            </div>
            <div>
                <h1 className='font-bold'>Contact the developer</h1>
                <i className='bx bxl-instagram-alt text-4xl text-[#B6FF52]'></i>
            </div>
            <div>
                <button className='bg-[#B6FF52] font-bold text-black py-6 px-7 rounded-2xl'>Join As a Guest</button>
            </div>
        </div>
    )
}

export default Footer