import React, { useState } from 'react'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'

const Navbar = () => {
  const[open,setOpen] = useState(false);

  return (
    <div className="fixed w-screen z-[2000]">

        <div className={`${open? "block":"hidden"} bg-[#224F34] h-auto sm:h-16 flex flex-row justify-between items-center p-2 sm:p-4`}>
        <div>
            <h1 className='text-3xl text-white'>ESHOP</h1>
        </div>

        <div>
            <ul className="flex flex-wrap gap-4 text-xl text-white pl-6">
                <li><Link to="/" className='hover:text-[#A3F3BE]'>Home</Link></li>
                <li><Link to="/products" className='hover:text-[#A3F3BE]'>Product</Link></li>
                <li><Link to="/about" className='hover:text-[#A3F3BE]'>ABOUT</Link></li>
            </ul>
        </div>

        <div>
            <ul className="flex flex-row justify-between gap-2 text-3xl text-white sm:pr-6">
                <li><Link to="/search" className='hover:text-[#A3F3BE]'><AiOutlineSearch/></Link></li>
                <li><Link to="/cart" className='hover:text-[#A3F3BE]'><AiOutlineShoppingCart/></Link></li>
                <li><Link to="/login" className='hover:text-[#A3F3BE]'><AiOutlineUser/></Link></li>
            </ul>
        </div>
        
    </div>

    <div className="p-2 text-3xl w-8" onClick={()=>setOpen(!open)}>{open? <AiOutlineClose/>:<AiOutlineMenu/>}</div>
    </div>
  )
}

export default Navbar
