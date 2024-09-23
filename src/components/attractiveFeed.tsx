import musicVector from "../assets/musicVector.png";
import musicPic from "../assets/musicPic.png";
import pause from "../assets/pause.png";
import greenbar from "../assets/greenbar.png";
import Image from "../assets/Group.png";
import lightbar from "../assets/lightbar.png";

const AttractiveFeed = () => {
  return (
    <div className="text-white flex-1 flex flex-col items-center">
      
      <div className="flex flex-col sm:flex-row items-center mt-20 sm:mt-32">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold mx-4 sm:mx-0">
          EXPRESS
        </h1>
        <i className="bx bx-skip-next text-4xl sm:text-6xl ml-3 sm:ml-9 backdrop-blur-sm z-10 border-white border-2 rounded-full"></i>
        <div className="bg-[#E97FF1] h-8 w-8 sm:h-10 sm:w-10 -ml-5 -mt-10 z-0 rounded-full"></div>
        <p className="text-xl sm:text-3xl ml-3 font-extralight mt-4 sm:mt-0">
          in music
        </p>
      </div>

      <div className="text-center mt-4 sm:mt-8">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold">
          YOURSELF
        </h1>
      </div>

      
      <img src={musicVector} alt="" className="w-full mt-8" />

      
      <div className="flex flex-col sm:-mt-72 sm:flex-row gap-4 sm:gap-16">
        <div className='flex flex-row gap-2 -ml-14 items-end'>
          <i className='bx bx-left-arrow-alt bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 sm:py-2 sm:px-3 rounded-sm sm:rounded-xl'></i>
          <i className='bx bx-right-arrow-alt bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 sm:py-2 sm:px-3 rounded-sm sm:rounded-xl'></i>
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <div className='flex justify-center items-center'>
            <img src={Image} alt="" className='w-48 sm:w-80' />
          </div>
          <div className='flex items-center gap-2 sm:gap-4 rounded-xl border-2 border-white py-2 px-4 bg-slate-500'>
            <i className='bx bx-bar-chart text-2xl sm:text-3xl font-bold'></i>
            <div className='flex flex-row sm:flex-row items-center gap-2'>
              <img src={musicPic} alt="" className='w-7 sm:w-16' />
              <div>
                <h1 className='font-semibold text-[8px] sm:text-lg'>The Upstairs</h1>
                <p className='font-extralight text-[6px] sm:text-base'>Matraman</p>
              </div>
            </div>
            <img src={pause} alt="" className='w-5 sm:w-12 ml-4' />
          </div>
        </div>
      </div>

     
      <div className="flex flex-row gap-2 mt-8 justify-end mx-8 sm:mx-16">
        <img src={greenbar} alt="" className="w-8 sm:w-16" />
        <img src={lightbar} alt="" className="w-8 sm:w-16"/>
        <img src={lightbar} alt="" className="w-8 sm:w-16"/>
      </div>
    </div>
  );
};

export default AttractiveFeed;
