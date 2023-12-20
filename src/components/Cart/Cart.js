import React, { Fragment } from 'react'
import CartItemCard from './CartItemCard'
import {useDispatch,useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import {addItemsToCart,removeItemsFromCart} from '../../actions/cartAction'
import { useNavigate,Link } from 'react-router-dom'
import {BiErrorCircle} from 'react-icons/bi'

const Cart = () => {
    const alert =useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems} = useSelector((state)=>state.cart);

    const increaseQuantity=(id,quantity,stock)=>{
      const newQty = quantity+1;
      if(stock<=quantity)
      return alert.error("Limited stock");

      dispatch(addItemsToCart(id,newQty));
    }

    const decreaseQuantity=(id,quantity)=>{
      const newQty = quantity-1;
      if(quantity<=1)
      return;

      dispatch(addItemsToCart(id,newQty));
    }

    const deleteFromCart=(id)=>{
      dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler=()=>{
      navigate("/login?redirect=shipping");
    }

  return (
    <Fragment>
      {cartItems.length === 0 ?(
        <div className="PageNotFound h-screen flex justify-center items-center flex-col">
        <BiErrorCircle  className="text-[#A3F3BE] text-6xl"/>
        <h1 className="text-[#267D49] text-3xl pb-3">NO ITEMS ADDED YET</h1>
        <Link to="/products" className="bg-[#224F34] text-white h-10 w-40 flex justify-center items-center animate-pulse">PRODUCTS</Link>
        </div>
      ):(
        <Fragment>
        <div className='cartPage h-auto min-h-screen pt-10 w-full'>
           <div className='cartHeader bg-[#267D49] w-full sm:w-11/12 box-border sm:m-auto text-white flex flex-row justify-between'>
           <div><p className='m-1 sm:m-2'>Product</p></div>
           <div className='flex flex-row justify-between pr-0 w-2/4 sm:w-1/4'>
           <p className='m-1 sm:m-2'>Quantity</p>
            <p className='m-1 sm:m-2'>Subtotal</p>
           </div>
           </div>

           <div className='cartContainer box-border w-11/12 flex flex-col m-auto h-auto'>
             {cartItems && cartItems.map((item)=>(
            <div className='flex flex-row justify-between items-center h-40' key={item.product}>
            
            <CartItemCard item={item} deleteFromCart={deleteFromCart}/>
            <div className='flex flex-row justify-between items-center w-2/4 sm:w-1/4'>
             <div className='CartInput'>
                <button className='pointer bg-stone-700 text-white w-6' onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                <input type='number' readOnly value={item.quantity} className='w-8 border-none text-center'/>
                <button className='pointer bg-stone-700 text-white w-6' onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
             </div>
             <p className='mr-1 sm:mr-4'>{`₹${item.price*item.quantity}`}</p>
             </div>

             </div>
             ))}
           </div>

           <div className='carttotal w-11/12 box-border m-auto flex justify-between h-14 mb-10 sm:mb-5'>
            <div></div>
            <div className='border-t-4 border-[#C2EFD4]  flex justify-between w-2/4 sm:w-1/4 pt-4'>
                <p>GROSS TOTAL</p>
                <p className='mr-1 sm:mr-5'>{`₹${cartItems.reduce(
                  (acc,item)=>acc + item.quantity*item.price,
                  0
                )}`}</p>
            </div>
           </div>

           <div className='checkoutbtn m-auto w-11/12 box-border flex flex-row-reverse'>
                <button onClick={checkoutHandler} className='pr-4 w-40 h-10 bg-[#267D49] text-white'>Check Out</button>
            </div>
        </div>
    </Fragment>
      )}
    </Fragment>
  )
}

export default Cart