import React,{Fragment, useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails,newReview } from '../../actions/productAction'
import ReviewCard from './ReviewCard'
import {useAlert} from 'react-alert'
import {addItemsToCart} from '../../actions/cartAction' 
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Loader from '../layout/Loader';


const ProductDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

  const {product,loading,error}= useSelector(
    (state)=>state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  
  const [quantity,setQuantity]=useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const incresequantity=()=>{
    if(product.Stock<=quantity)
    return alert.error("out of stock");;
    const qty=quantity+1;
    setQuantity(qty);
  }

  const decresequantity=()=>{
    if(quantity<=1)
    return alert.error("Quantity can't be less then 1");;
    const qty=quantity-1;
    setQuantity(qty);
  }

  const addToCartHandler=()=>{
    dispatch(addItemsToCart(id,quantity));
    alert.success("ADD TO CART");
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
      } 
    if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
    if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }

    dispatch(getProductDetails(id));

  },[dispatch,id,error,alert, reviewError, success]);

  const options = {
    size: "medium",
    value:product && product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
 <Fragment>
  {loading?<Loader/>:(      
      <Fragment>
     <div className='flex bg-[#C2EFD4] justify-center items-center gap-10 flex-col h-auto sm:flex-row sm:h-screen'>
     
        <div className='productDetails w-80 h-3/4 pt-10'>
            <Carousel className='h-full w-full flex justify-center flex-col'>
               { product && product.images?.map((item,i)=>(
                    <img 
                      className="CarouselImage w-80 h-96"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
               ))}
            </Carousel>
        </div>

        <div className='flex flex-col gap-6 '>
          <div className='detailsBlock-1 border-b-2 pb-4'>
            <h2 className='text-2xl sm:text-4xl text-[#224F34]'>{product && product.name}</h2>
            <p className='text-[#267D49]'>Product # {product && product._id}</p>
          </div>
          <div className='detailsBlock-2 border-b-2 flex flex-row pb-4'>
               <Rating {...options} />
             <span>({product && product.numOfReviews} Reviews)</span>
          </div>
          <div className='detailsBlock-3'>
             <h1 className='text-4xl pb-4 font-bold text-[#224F34]'>₹{product && product.price}</h1>
             <div className='detailsBlock-3-1 flex flex-row gap-2 pb-6'>
               <div className='detailsBlock-3-1-1'>
                <button onClick={decresequantity} className='bg-[#267D49] h-10 w-10 text-4xl text-white'>-</button>
                <input readOnly value={quantity} type='number' className='h-10 w-12 text-3xl'/>
                <button onClick={incresequantity} className='bg-[#267D49] h-10 w-10 text-4xl text-white'>+</button>
               </div>
               <button 
               onClick={addToCartHandler}
               disabled={product && product.Stock<1?true:false}
               className='w-40 h-10 bg-[#267D49] text-white rounded-3xl'
               >
                Add to Cart
               </button>
             </div>

             <p className='border-t-2 pt-4 pb-4 text-xl border-b-2 text-[#267D49]'>
              Status:
              <b className={`${product && product.Stock<1?"text-red-700":"text-emerald-900"} pl-2`}>
                {product &&  product.Stock<1?"OutofStock":"InStock"}
              </b>
             </p>
          </div>

          <div className='detailsBlock-4'>
           <h1 className='text-2xl text-[#224F34]'>Description:</h1>
            <p className='text-[#267D49]'>{product && product.description}</p>
          </div>

          <button onClick={submitReviewToggle} 
          className='mb-10 bg-[#267D49] w-40 text-white h-10 rounded-2xl'>
            Submit Review
          </button>
        </div>
     </div>

     <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle className='text-center'>Submit Review</DialogTitle>
            <DialogContent className="submitDialog flex flex-col items-center">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea border-2"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

     <div className='h-auto flex flex-col gap-8 justify-center items-center mb-10'>
     <h3 className='text-2xl text-[#224F34] text-center font-medium mt-5'>REVIEWS</h3>
     <div className='flex flex-wrap flex-row justify-center gap-8 h-auto box-border w-4/5'>
     {product && product.reviews && product.reviews[0]?
     (<div className='flex flex-row overflow-x-scroll ml-4 gap-10 w-11/12'>
     {product && product.reviews.map((review)=>
     <div key={review}>
     <ReviewCard review={review}/>
     </div>)}
     </div>):
     (<p className='text-center opacity-75 pt-12 pb-16 text-3xl'>NO REVIEWS YET</p>)}
     </div>
     </div>

    </Fragment>)}
 </Fragment>
  )
}

export default ProductDetails;