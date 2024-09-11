
import musicVector from '../assets/musicVector.png'
import musicPic from '../assets/musicPic.png'
import pause from '../assets/pause.png'
import greenbar from '../assets/greenbar.png'
import Image from '../assets/Group.png'
import lightbar from '../assets/lightbar.png'

const AttractiveFeed = () => {
  return (
    <div className='text-white'>
      <div className='flex flex-row items-baseline mt-[83px]'>
        <h1 className='sm:ml-[276px] ml-[50px]  text-3xl sm:text-7xl lg:text-8xl font-bold'>EXPRESS</h1>
        <i className='bx bx-skip-next text-5xl sm:text-6xl ml-3 sm:ml-9 backdrop-blur-sm z-10  border-white border-2 rounded-full'></i>
        <div className='bg-[#E97FF1] h-[34px] w-[34px] absolute left-[220px] top-[170px] sm:left-[755px] sm:top-[200px] z-0 rounded-full'></div>
        <p className='sm:ml-9 ml-5   sm:text-3xl font-extralight'>in music</p>
      </div>
      <div>
        <h1 className='sm:text-7xl lg:text-8xl text-3xl ml-[180px] sm:ml-[474px] font-bold'>YOURSELF</h1>
      </div>
      <img src={musicVector} alt="" className='z-0 w-full' />
      <div className="flex flex-row items-center gap-x-11  sm:gap-x-56">
        <div className='sm:ml-32 flex flex-coll'>
          <i className='bx bx-left-arrow-alt bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 sm:py-3 sm:px-4 sm:mr-3 mr-1 rounded-xl'></i>
          <i className='bx bx-right-arrow-alt  bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 sm:py-3 sm:px-4 rounded-xl'></i>
        </div>
        <div className='sm:-mt-64 -mt-24 ml-0 items-center flex justify-center sm:ml-9'>
          <img src={Image} alt="" className='sm:w-80 w-44 z-20 ' />
          <div className=' flex -ml-7 flex-row gap-x-2 sm:gap-x-6 items-center rounded-xl border-1 z-30 py-1 lg:py-2 sm:py-2 bg-slate-500  sm:px-5 border-white w-fit h-fit'>
            <i className='bx bx-bar-chart sm:text-3xl text-lg font-bold'></i>
            <div className='flex flex-row gap-x-4 items-center'>
            <img src={musicPic} alt="" className='sm:size-10  size-7' />
            <div>
              <h1 className='font-semibold sm:text-lg text-[9px]'>The Upstairs</h1>
              <p className='font-extralight sm:text-base text-[7px]'>Matraman</p>
              </div>
            </div>
          <img src={pause} alt="" className='sm:ml-10 sm:size-8 size-5 ml-4'/>
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-x-2 -mt-10 justify-end mx-40'>
            <img src={greenbar} alt="" />
            <img src={lightbar} alt="" />
            <img src={lightbar} alt="" />
          </div>
    </div>
  )
}

export default AttractiveFeed