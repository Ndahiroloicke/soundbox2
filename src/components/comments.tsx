import CommentsCards from './commentsCards';
import diannne from '../assets/Dianne.png';
import kristin from '../assets/kristin.png';
import cameron from '../assets/cameron.png';

const Comments = () => {
  return (
    <div className='z-50'>
      <div className='text-white mt-20 md:mt-40 lg:mt-60 mx-5 md:mx-20 lg:mx-40 flex flex-col'>
        <div>
          <div className='flex flex-col lg:flex-row justify-between mb-16 lg:mb-32 items-start lg:items-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left'>
              WHAT ARE THEY SAYING?
            </h1>
            <p className='font-extralight mt-4 lg:mt-0 text-center lg:text-left text-sm md:text-base lg:w-1/2'>
              It has been proven that thousands of users are satisfied with the features we provide, here are some words from them
            </p>
          </div>
          <div className='flex justify-center lg:justify-end items-center mb-10'>
            <i className='bx bx-left-arrow-alt bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 py-2 px-3 md:py-3 md:px-4 sm:mr-1 mr-1 rounded-xl'></i>
            <i className='bx bx-right-arrow-alt bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 py-2 px-3 md:py-3 md:px-4 rounded-xl'></i>
          </div>
          <div className='flex flex-col lg:flex-row mt-10 gap-y-8 lg:gap-x-8 justify-center'>
            <CommentsCards 
              image={diannne} 
              name='Dianne Russell' 
              role='Marketing Coordinator' 
              comment="The soundbox website platform really makes it easy for me to find songs that are going viral on tiktok"
            />
            <CommentsCards 
              image={cameron} 
              name='Cameron Williamson' 
              role='Trust Administrator' 
              comment="I think this is very good and the features used are very satisfying, you should try this platform"
            />
            <CommentsCards 
              image={kristin} 
              name='Kristin Watson' 
              role='President of Sales' 
              comment="With the existence of a music website platform, of course many are helped, from musicians and music lovers"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
