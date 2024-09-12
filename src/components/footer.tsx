import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='text-white mt-20 md:mt-28 lg:mt-36 bg-[#162945] px-5 py-10 md:px-20 lg:px-40 md:py-16'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-y-10'>
                <div>
                    <div className='flex mb-5 flex-row items-center gap-x-3 hover:cursor-pointer'>
                        <i className='bx bx-play bg-[#B6FF52] text-blue-950 text-4xl md:text-5xl rounded-full'></i>
                        <h1 className='font-bold text-xl md:text-2xl'>SoundBox</h1>
                    </div>
                    <div className='font-extralight text-sm md:text-base'>
                        <p>Copyrights &copy; 2022</p>
                        <p>All Rights Reserved</p>
                    </div>
                </div>
                
                <div className='flex flex-col font-extralight text-sm md:text-base'>
                    <h1 className='font-bold mb-2'>Social Media</h1>
                    <p>Twitter</p>
                    <p>TikTok</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                </div>
                
                <div className='flex flex-col font-extralight text-sm md:text-base'>
                    <h1 className='font-bold mb-2'>Terms &amp; Condition</h1>
                    <p>Privacy Policy</p>
                </div>

                <div className='flex flex-col items-start'>
                    <h1 className='font-bold text-sm md:text-base mb-2'>Contact the developer</h1>
                    <i className='bx bxl-instagram-alt text-3xl md:text-4xl text-[#B6FF52]'></i>
                </div>

                <div>
                    <Link to={'/login'}>
                        <button className='bg-[#B6FF52] font-bold text-black py-4 px-5 md:py-6 md:px-7 rounded-xl md:rounded-2xl w-full md:w-auto'>
                            Join With Spotify
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;
