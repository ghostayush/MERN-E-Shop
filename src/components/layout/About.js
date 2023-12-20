import React, { Fragment } from 'react'
import pic from '../../images/mypic2.png'
import {BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

const About = () => {
  return (
    <Fragment>
         <div className="h-auto min-h-screen w-full flex flex-col md:flex-row  bg-[#C2EFD4] ">
            <div className='w-4/5 md:w-2/4 md:mr-0 m-10 md:border-2 flex justify-center items-center'>
                <img src={pic} alt='mypic' className='md:m-10 rounded-full w-60 h-60 sm:w-96 sm:h-96'/>
            </div>
            <div className='11/12 md:w-2/4 md:border-2 m-10 md:ml-0 flex flex-col justify-center items-center gap-10'>
                <h1 className='text-4xl text-[#224F34]'>About Me</h1>
                <ul className='flex flex-row gap-5'>
                <li><a className="text-4xl hover:text-[#267D49] " href='https://www.instagram.com/ayush.0004/'><BsInstagram/></a></li>
                <li><a className="text-4xl hover:text-[#267D49] " href='https://github.com/ghostayush'><BsGithub/></a></li>
                <li><a className="text-4xl hover:text-[#267D49] " href='https://linkedin.com/in/ayushsb'><BsLinkedin/></a></li>
                </ul> 
                <button className='w-40 h-10 bg-[#267D49] text-white rounded-3xl hover:text-xl'><a href='https://ghostayush.github.io/My-Portfolio/'>Portfolio</a></button>
            </div>
        </div>
    </Fragment>
  )
}

export default About