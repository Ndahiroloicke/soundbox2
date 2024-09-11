

const Subscribe = () => {
  return (
    <div className='text-white bg-gradient-to-tr from-slate-700 to-slate-800 bg-opacity-40 rounded-3xl mt-40 mx-40 border-2 border-white py-14'>
        <h1 className='ml-[350px] mb-3 text-5xl font-bold'>SUBSCRIBE US</h1>
        <p className='mx-40 text-2xl font-extralight'>You can upgrade, downgrade, or cancel your subscription anytime.</p>
        <div className='flex mt-10 mx-32 gap-x-3 flex-row'>
            <input type="email" className='w-[80%] h-14 px-7 rounded-xl bg-[#162A47]' placeholder='johndoe@gmail.com'/>
            <button className='w-[20%] bg-[#B6FF52] rounded-xl text-black font-bold'>SUBSCRIBE</button>
        </div>
    </div>
  )
}

export default Subscribe