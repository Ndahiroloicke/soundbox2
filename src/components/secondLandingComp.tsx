
import backpic from '../assets/backpic.png'
import frontpic from '../assets/frontpic.png'

const SecondLanding = () => {
  return (
    <div className='sm:mx-40 mt-16 sm:mt-36 text-white'>
        <div className='flex flex-row items-center'>
            <div className='ml-3'>
                <img src={backpic} alt="" className='sm:size-64 z-10'/>
                <img src={frontpic} alt="" className='sm:size-64 z-20 -mt-12 ml-8 sm:-mt-36 sm:ml-20'/>
            </div>
            <div className='sm:ml-14'>
            <div className='ml-12'>
                <h1 className='sm:text-5xl text-sm w-56  sm:w-[600px] font-semibold mb-6'>MANY TOP SONGS THAT CAN BE PLAYED FROM ALL COUNTRIES</h1>
                <p className='sm:w-[590px] sm:text-2xl text-xs w-60 font-extralight'>Find your favorite music playlist easily and quickly that can be accessed anytime, anywhere, and anymore</p>
            </div>
            <div className='flex flex-row ml-12 gap-3 sm:gap-x-16 sm:mt-16'>
                <div>
                    <h1 className='sm:text-4xl font-semibold'>500K+</h1>
                    <p className='font-extralight text-xs'>famous singer</p>
                </div>
                <div>
                    <h1 className='sm:text-4xl font-semibold'>240K+</h1>
                    <p className='font-extralight text-xs'>Playlist Song</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SecondLanding