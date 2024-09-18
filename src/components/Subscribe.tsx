import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

const Subscribe = () => {
  const form = useRef<HTMLFormElement | null>(null); // Specify the form element type
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm('service_g1o5w74', 'template_c5tdvbk', form.current, 'tYERxc3E74QY3wSPT')
        .then(
          () => {
            console.log('SUCCESS!');
            setIsModalOpen(true); // Open the modal on success
          },
          (error) => {
            console.log('FAILED.....', error.text);
          }
        );
    } else {
      console.error('Form reference is undefined.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className='text-white bg-gradient-to-tr from-slate-700 to-slate-800 bg-opacity-40 rounded-3xl mt-20 md:mt-32 lg:mt-40 mx-5 md:mx-20 lg:mx-40 border-2 border-white py-10 md:py-14'>
      <h1 className='text-center md:text-left md:ml-[100px] lg:ml-[150px] mb-5 md:mb-3 text-3xl md:text-4xl lg:text-5xl font-bold'>
        SUBSCRIBE US
      </h1>
      <p className='text-center md:text-left mx-5 md:mx-20 lg:mx-40 text-base md:text-xl lg:text-2xl font-extralight'>
        You can upgrade, downgrade, or cancel your subscription anytime.
      </p>
      
        <form ref={form} onSubmit={sendEmail} className='flex flex-col md:flex-row mt-8 md:mt-10 mx-5 md:mx-20 lg:mx-32 gap-y-4 md:gap-y-0 md:gap-x-3'>
          <input
            type='email'
            name='user_email'
            className='w-full md:w-[70%] outline-none lg:w-[100%] h-12 md:h-14 px-5 md:px-7 rounded-xl bg-[#162A47]'
            placeholder='johndoe@gmail.com'
            required
          />
          <button type='submit' className='w-full md:w-[30%] lg:w-[20%] bg-[#B6FF52] h-12 md:h-14 rounded-xl text-black font-bold'>
            SUBSCRIBE
          </button>
        </form>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-8 text-center'>
            <h2 className='text-xl font-bold mb-4'>Invitation Sent!</h2>
            <p className='mb-4'>Please check your email for the invitation and use it to log in to our application.</p>
            <button onClick={closeModal} className='bg-[#1db954] text-white px-4 py-2 rounded'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
