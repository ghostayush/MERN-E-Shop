import React,{ Fragment, useEffect, useRef }  from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from 'react-router-dom';
import {createOrder,clearErrors} from "../../actions/orderAction";


const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
      };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };  

    const submitHandler=async(e)=>{
        e.preventDefault();

        payBtn.current.disabled = true;
        try {
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const { data } = await axios.post(
              "/api/v1/payment/process",
              paymentData,
              config
            );
      
            const client_secret = data.client_secret;
      
            if (!stripe || !elements) return;
      
            const result = await stripe.confirmCardPayment(client_secret, {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: user.name,
                  email: user.email,
                  address: {
                    line1: shippingInfo.address,
                    city: shippingInfo.city,
                    state: shippingInfo.state,
                    postal_code: shippingInfo.pinCode,
                    country: shippingInfo.country,
                  },
                },
              },
            });
      
            if (result.error) {
              payBtn.current.disabled = false;
      
              alert.error(result.error.message);
            } else {
              if (result.paymentIntent.status === "succeeded") {
                order.paymentInfo = {
                  id: result.paymentIntent.id,
                  status: result.paymentIntent.status,
                };
      
                dispatch(createOrder(order));
      
                navigate("/success");
              } else {
                alert.error("There's some issue while processing payment ");
              }
            }
          }catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
          }
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert]);

  return (
    <Fragment>
        <CheckoutSteps activeStep={2}/>
        <div className="paymentContainer flex justify-center items-center">
        <form className="paymentForm w-4/5 sm:w-2/4 lg:w-4/12 flex gap-2 flex-col mb-32 min-h-full" onSubmit={(e) => submitHandler(e)}>
          <div className='text-center text-2xl border-b-2'>Card Info</div>
          <div className='w-full flex items-center'>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput w-full box-border h-16 p-4 border-solid border-2" />
          </div>
          <div  className='w-full flex items-center'>
            <EventIcon />
            <CardExpiryElement className="paymentInput w-full box-border h-16 p-4 border-solid border-2" />
          </div>
          <div  className='w-full flex items-center'>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput w-full box-border h-16 p-4 border-solid border-2" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn bg-[#267D49] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md"
          />
        </form>
      </div>
    </Fragment>
  )
}

export default Payment