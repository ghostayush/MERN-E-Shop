import React from 'react';
import {BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="p-4 bg-[#224F34] text-white flex items-center justify-between flex-col">
     
      <div className="flex items-center flex-col gap-4 ">
        <h1 className="text-6xl text-[#A3F3BE]">ESHOP</h1>
        <p className="text-lg text-center">High Quality is our first priority Copyrights 2023 &copy; Ayush Singh Bhadauria</p>
      </div>

      <div className="flex items-center flex-col gap-4 mt-10 ">
        <h4 className="text-3xl">Follow ME</h4>
        <div className='flex flex-row gap-4'>
        <a className="text-2xl hover:text-[#A3F3BE]" href='https://www.instagram.com/ayush.0004/'><BsInstagram/></a>
        <a className="text-2xl hover:text-[#A3F3BE]" href='https://github.com/ghostayush'><BsGithub/></a>
        <a className="text-2xl hover:text-[#A3F3BE]" href='https://linkedin.com/in/ayushsb'><BsLinkedin/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer