
import ToptierCard from './ToptierCard'
import compass from '../assets/Compass.png'
import save from '../assets/save.png'
import speaker from '../assets/speaker.png'


const TopTier = () => {
  return (
    <div className='sm:mt-48 mt-24 mx-6 sm:mx-40 text-white'>
        <div className='flex flex-row  items-center mb-24'>
            <div>
                <h1 className='sm:text-6xl font-bold w-[150px] sm:w-[473px]'>OUR TOP TIER FEATURES</h1>
            </div>
            <div>
                <p className='sm:w-[546px] text-xs sm:text-base font-extralight'>Soundbox is a streaming service that allows you to listen to millions of songs. Its great features include the ability to download your favorite tracks and play them offline, lyrics in real time, listening across all your favorite device.</p>
            </div>
        </div>
        <div className='flex justify-center sm:flex-row flex-col gap-y-4  sm:gap-x-10'>
            <ToptierCard image={compass} heading='Play Millions Of Song Available' para='All songs and musics available from around the world, from old generation to the new.'/>
            <ToptierCard image={speaker} heading='Listen Across All Your Devices' para='Wherever you go online, we got your back. You only need one account to sync through all your devices.'/>
            <ToptierCard image={save} heading='Download All Your Favorite Tracks' para='Wherever ypu got online, we got your back. you only need one account tou sync  through all your devices.'/>
        </div>
    </div>
  ) 
}

export default TopTier