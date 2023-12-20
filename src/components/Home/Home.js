import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/cg'
import Product from "./ProductCard"
import {getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import { useAlert } from 'react-alert'
import pic from '../../images/landing.png.jpg'
import Loader from '../layout/Loader'

const Home = () => { 
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector(
    (state)=> state.products
  );

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  },[dispatch,error,alert]);

  return(
    <Fragment>
    {loading?<Loader/>: 
    <Fragment>
    <div className="h-auto bg-[#C2EFD4] flex flex-col sm:flex-row sm:h-screen items-center justify-center gap-10 z-40">
    
    <div className='flex flex-col gap-4 h-auto w-4/5 mt-10 sm:w-2/5 sm:ml-10'>
    <h1 className="text-5xl text-[#224F34] text-center drop-shadow-2xl mb-10">Welcome to Eshop</h1>
    <p className="text-xl text-[#267D49] mb-10 text-center">Experience Innovation: Explore our curated phone collection for unbeatable deals on the latest tech. Your dream phone awaits. Shop now</p>
    <p className=" text-[#267D49] text-center">FINd PRODUCTS below</p>
    <a href="#container" className='flex items-center justify-center'>
        <button className="flex flex-row items-center justify-center border-solid border-2 w-20 h-10 animate-pulse bg-[#224F34] text-white">
            Scroll<CgMouse/>
        </button>
        </a>
    </div>

    <div className='w-3/5 h-4/5 box-border flex items-center'>
    <img src={pic} alt='pic here' className='h-11/12 w-11/12'/></div>
    </div>

     <div className='h-auto flex flex-col gap-8 justify-center items-center mb-10'>
    <h2 className=" text-4xl text-[#224F34] text-center font-medium mt-10">Hot Sellers</h2>
    <p className='text-center text-[#224F34]'>Unlock a World of Possibilities: Your Dream Phone Awaits!</p>
    <div id='container' className='flex flex-wrap flex-row justify-center gap-8 h-auto box-border w-4/5'>
      {products && products.map((product)=> <Product key={product._id} product={product}/>)}
    </div>
    </div> 

  </Fragment>}
    </Fragment>
  );
}

export default Home