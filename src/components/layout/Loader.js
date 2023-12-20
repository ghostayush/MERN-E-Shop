import React from 'react'
import {AiOutlineArrowDown} from 'react-icons/ai'

const Loader = () => {
  return (
    <div className='h-screen bg-white flex justify-center items-center'>
        <div className='flex justify-center items-center flex-col'>
              <AiOutlineArrowDown className='animate-bounce text-[#224F34] text-5xl bg-[#C2EFD4] rounded-full'/>
              <h1 className='text-[#267D49] text-3xl'>LOADING</h1>
        </div>
    </div>
  )
}

export default Loader