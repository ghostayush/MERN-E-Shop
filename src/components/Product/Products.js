import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productAction'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
import Typography  from '@material-ui/core/Typography'
import {useAlert} from 'react-alert'
import Loader from '../layout/Loader';
import {BiErrorCircle} from 'react-icons/bi'
 
const categories =[
  "Samsung",
  "Apple",
  "oppo",
  "Xiaomi",
  "vivo",
  "Realme",
  "OnePlus",
]

const Products = () => {
  const dispatch = useDispatch();
  const alert =useAlert();

  const [currentPage,setCurrentPage] = useState(1);
  const [price,setPrice] = useState([0,100000]);
  const [category,setCategory]=useState("");
  const [rating,setRating]=useState(0);

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount} = useSelector(
    (state)=> state.products
  );

  const setCurrentPageNO =(e) =>{
     setCurrentPage(e);
  }

  const priceHandler= (e,newPrice)=>{
    setPrice(newPrice);
  }

  const params = useParams();

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(params.keyword,currentPage,price,category,rating));
  },[dispatch,params,currentPage,price,category,rating,alert,error]); 

  let count = filteredProductsCount;

  return (
   <Fragment>
    {loading?<Loader/>:
    <div>{ products.length === 0?
      <div className="PageNotFound h-screen flex justify-center items-center flex-col">
      <BiErrorCircle  className="text-[#A3F3BE] text-6xl"/>
      <h1 className="text-[#267D49] text-3xl pb-3">Product Not Found</h1>
    </div>
    :
      <Fragment>
      <h1 className=" text-4xl text-[#224F34] text-center font-medium pt-5">Products</h1>

      <div className='flex w-full min-h-screen h-auto flex-col md:flex-row-reverse'>

      <div className='flex flex-col w-full md:w-4/5'>
      <div className='w-full  flex flex-wrap justify-center flex-row gap-6 pt-10'>
        {products && products.map((product)=>(
          <Fragment key={product.id} >
          <ProductCard product={product}/>
          </Fragment>
        ))}
      </div>
      <div>
      {resultPerPage <= count && (
        <div className='paginationbox flex justify-center items-center m-6'>
        <Pagination 
          innerClass="flex flex-row gap-1"
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNO}
          nextPageText=">"
          prevPageText="<"
          itemClass='bg-[#224F34] border-2 cursor-pointer w-10 text-xl text-center text-white rounded-2xl'
          activeClass='bg-[#C2EFD4]'
          activeLinkClass='text-black'
          linkClass='page-link'
          hideFirstLastPages='false'
        />
      </div>
      )}
      </div>
      </div>

      <div className='filterBox left-0 pl-10 pr-10 sm:ml-40 sm:w-2/4 md:w-1/5 md:ml-0 md:pr-0'>
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          min={0}
          max={25000}
        />

        <Typography>Categories</Typography>
        <ul className='categoryBox'>
          {categories.map((category)=>(
            <Fragment key={category}>
            <li
            className='category-link text-slate-500 hover:text-red-600 pl-4'
            onClick={()=>setCategory(category)}
            >{category}</li>
            </Fragment>
          ))}
        </ul>

        <div>
          <Typography>Rating Above</Typography>
          <Slider
            value={rating}
            onChange={(e,newRating)=>{
              setRating(newRating);
            }}
            aria-label='Temperature'
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={5}
          />
          </div>
      </div>
      </div> 

    </Fragment>
    }</div>}
   </Fragment>
  )
}

export default Products