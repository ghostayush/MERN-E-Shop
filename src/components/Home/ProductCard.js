import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";


const ProductCard = ({product}) => {

const options = {
  size: "small",
  value:product && product.ratings,
  readOnly: true,
  precision: 0.5,
};

  return (
    <Link className="h-80 w-52 mb-6" to={`/product/${product._id}`}>

    <img className="w-60 h-60" src={product.images[0].url} alt={product.name}/>

    <div className='flex flex-col justify-center items-center'>
    <p className='text-center p-2'>{product.name}</p>
    <div className='pl-8 flex flex-row gap-2 items-center'>
    <span className='border-r-2 pr-4'>{`₹${product.price}`}</span>
    <Rating {...options}/>
    </div>
    </div>  

    </Link>
  );
};

export default ProductCard