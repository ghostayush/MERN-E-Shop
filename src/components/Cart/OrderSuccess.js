import React from "react";
import { Link } from "react-router-dom";
import {AiFillCheckCircle} from 'react-icons/ai'

const OrderSuccess = () => {
  return (
    <div className="orderSuccess h-screen flex justify-center items-center flex-col">
      <AiFillCheckCircle className="text-[#A3F3BE] text-6xl"/>

      <h1 className="text-[#267D49] text-3xl pb-3 text-center">Your Order has been Placed successfully</h1>
      <Link to="/orders" className="bg-[#224F34] text-white h-10 w-40 flex justify-center items-center animate-pulse">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;