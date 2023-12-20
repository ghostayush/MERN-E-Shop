import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const [keyword,setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate('/products');
        }
    };

  return (
    <Fragment>
        <form onSubmit={searchSubmitHandler} className='w-full h-screen flex justify-center items-center bg-[#A3F3BE] '>
            <input className='w-2/4 h-12 border-none p-4 outline-none border-r-2 box-border rounded-3xl' type='text' placeholder='search a product ...' onChange={(e)=>setKeyword(e.target.value)}/>
            <input className='h-12 bg-[#267D49] text-white border-none p-2 w-1-6 cursor-pointer rounded-3xl' type='submit' value='Search'/>
        </form>
    </Fragment>
  )
}

export default Search