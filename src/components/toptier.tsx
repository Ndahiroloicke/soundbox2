import ToptierCard from './ToptierCard'
import compass from '../assets/Compass.png'
import save from '../assets/save.png'
import speaker from '../assets/speaker.png'

const TopTier = () => {
  return (
    <div className='sm:mt-48 mt-24 mx-4 sm:mx-40 text-white'>
    
      <div className='flex flex-col sm:flex-row items-center mb-12 sm:mb-24'>
        <div className='flex-1'>
          <h1 className='text-3xl sm:text-6xl font-bold'>
            OUR TOP TIER FEATURES
          </h1>
        </div>
        <div className='flex-1 mt-4 sm:mt-0'>
          <p className='text-sm sm:text-base font-extralight'>
            Soundbox is a streaming service that allows you to listen to millions of songs. Its great features include the ability to download your favorite tracks and play them offline, lyrics in real time, listening across all your favorite devices.
          </p>
        </div>
      </div>
      
 
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-10'>
        <ToptierCard 
          image={compass} 
          heading='Play Millions Of Songs Available' 
          para='All songs and music available from around the world, from old generation to the new.' 
        />
        <ToptierCard 
          image={speaker} 
          heading='Listen Across All Your Devices' 
          para='Wherever you go online, we’ve got your back. You only need one account to sync through all your devices.' 
        />
        <ToptierCard 
          image={save} 
          heading='Download All Your Favorite Tracks' 
          para='Wherever you go online, we’ve got your back. You only need one account to sync through all your devices.' 
        />
      </div>
    </div>
  )
}

export default TopTier
