import React from "react";
import {BiErrorCircle} from 'react-icons/bi'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound h-screen flex justify-center items-center flex-col">
      <BiErrorCircle  className="text-[#A3F3BE] text-6xl"/>
      <h1 className="text-[#267D49] text-3xl pb-3">Page Not Found</h1>
      <Link to="/" className="bg-[#224F34] text-white h-10 w-20 flex justify-center items-center animate-pulse">Home</Link>
    </div>
  );
};

export default NotFound;