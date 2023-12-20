import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
  
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  
    const shippingCharges = subtotal > 1000 ? 0 : 200;
  
    const tax = subtotal * 0.18;
  
    const totalPrice = subtotal + tax + shippingCharges;
  
    const address = `${shippingInfo.address},
      ${shippingInfo.city},
      ${shippingInfo.state}, 
      ${shippingInfo.pinCode}, 
      ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate("/process/payment");
      };
  
  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage flex flex-col sm:flex-row">

        <div className="border-b-2 sm:border-r-2 ml-8 w-11/12 pb-10">

          <div className="confirmshippingArea mb-10">
            <div className="text-2xl">Shipping Info:</div>
            <div className="confirmshippingAreaBox pl-10 flex gap-3 flex-col pt-4">
              <div className="flex flex-row gap-2">
                <p className="font-bold">Name:</p>
                <span>{user.name}</span>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
          <div className="text-2xl">Your Cart Items:</div>
            <div className="confirmCartItemsContainer flex gap-3 flex-col pl-10 pt-4 h-auto">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="flex flex-row justify-between pr-8">
                    <img src={item.image} alt="Product" className="w-10 h-10"/>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>

        </div>

        <div className="h-96 w-full sm:w-1/2 flex justify-center">
          <div className="orderSummary flex flex-col justify-center items-center w-full gap-4">
            <div className="font-medium text-2xl border-b-2 border-b-slate-700">Order Summery</div>
            <div className="border-b-2 border-b-slate-700 flex gap-2 flex-col pb-4">
              <div className="flex flex-row gap-2">
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex flex-row gap-2">
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div className="flex flex-row gap-2">
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal flex flex-row gap-2 justify-between">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment} className='cursor-pointer flex items-center justify-center w-40 h-12 bg-[#267D49] text-white rounded-3xl'>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder