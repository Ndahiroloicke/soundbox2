import React from 'react'
import diannne from '../assets/Dianne.png'

interface CommentsCardsProps{
    image:string,
    name:string,
    role:string,
    comment:String
}

const CommentsCards: React.FC<CommentsCardsProps> = ({image,name,role,comment}) => {
    return (
        <div className='border-2 flex z-10 flex-col rounded-3xl bg-gradient-to-br from-gray-600 to-gray-800 border-white w-fit p-10'>
            <div className='flex flex-row gap-x-5'>
                <div>
                    <div><img src={image} alt="" /></div>
                </div>
                <div>
                    <h1 className='text-2xl font-bold'>{name}</h1>
                    <p className='font-extralight'>{role}</p>
                </div>
            </div>
            <div className='w-80 mt-8'>
                <p className='font-extralight'>{comment}</p>
            </div>
        </div>
    )
}

export default CommentsCards