import CommentsCards from './commentsCards';
import diannne from '../assets/Dianne.png';
import kristin from '../assets/kristin.png';
import cameron from '../assets/cameron.png'

const Comments = () => {
  return (
    <div className='z-50'>
    <div className='text-white mt-60 mx-40 flex flex-col'>
        <div>
            <div className='flex flex-row justify-between mb-32 items-center'>
                <div>
                    <h1 className='text-6xl font-bold'>WHAT ARE THEY SAYING?</h1>
                </div>
                <div>
                    <p className='font-extralight'>It has been proven that thousands of users are satisfied with the features we provide, here are some words from them</p>
                </div>
            </div>
            <div className='sm:ml-32 justify-end flex flex-coll'>
          <i className='bx bx-left-arrow-alt bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 sm:py-3 sm:px-4 sm:mr-1 mr-1 rounded-xl'></i>
          <i className='bx bx-right-arrow-alt  bg-gradient-to-br from-gray-700 to-gray-800 border-white border-2 sm:py-3 sm:px-4 rounded-xl'></i>
            </div>
            <div className='flex flex-row mt-10 gap-x-8'>
                <CommentsCards image={diannne} name='Dianne Russell' role='Marketing Coordinator' comment="The soundbox website platform really makes it easy for me to find songs that are going viral on tiktok"/>
                <CommentsCards image={cameron} name='Cameron Williamson' role='Trust Administrator' comment="I think this is very good and the features used are very satisfying, you should try this platform"/>
                <CommentsCards image={kristin} name='Kristin Watson' role='President of Sales' comment="With the existence of a music website platform, of course many are helped, from musicians and music lovers"/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Comments;