
import sadsong from '../assets/sadsong.png'
import statusbar from '../assets/statusbar.png'
import back from '../assets/back.png'
import play from '../assets/play.png'
import next from '../assets/next.png'
const Nowplaying = () => {
  return (
    <div className='text-white px-9 py-2 fixed bottom-0 w-full bg-slate-600 bg-opacity-75'>
        <div className='flex flex-row items-center justify-between'>
        <img src={sadsong} alt="" className='sm:size-16 rounded-lg'/>
        <div>
            <h1 className='font-bold'>Bad Habbit</h1>
            <p className='font-thin'>Steve Lacy</p>
        </div>
        <img src={statusbar} alt="" className='w-[900px] h-2 items-center'/>
        <div className='flex flex-row items-center gap-x-7'>
            <img src={back} alt="" className='w-5 h-3'/>
            <img src={play} alt="" className='size-10'/>
            <img src={next} alt="" className='w-5 h-3'/>
        </div>
        </div>
    </div>
  )
}

export default Nowplaying