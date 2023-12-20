import React from 'react'
import { Link } from 'react-router-dom'

const CartItemCard = ({item,deleteFromCart}) => {
  return (
    <div className='cartitemcard flex box-border pl-0 sm:pl-6'>
    <img src={item.image} alt="sssss" className='w-10 h-8 sm:w-40 sm:h-32'/>
    <div className='flex flex-col ml-2 sm:ml-20'>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price:₹${item.price}`}</span>
        <p className='cursor-pointer flex items-center justify-center w-20 h-6 bg-[#267D49] text-white rounded-3xl' onClick={()=>deleteFromCart(item.product)}>Remove</p>
    </div>
    </div>
  )
}

export default CartItemCard