import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link,useParams  } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from '../layout/Loader';

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();
    const {id}= useParams();
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <div className="orderDetailsPage flex flex-col gap-4 p-6">
            <div className="orderDetailsContainer border-b-2">

            <h1 className="text-2xl sm:text-4xl pb-6 text-[#267D49] font-medium">Order #{order && order._id}</h1>
              
              <h1 className="text-2xl">Shipping Info</h1>
              <div className="orderDetailsContainerBox pl-10 flex gap-3 flex-col pt-4 pb-6">
                <div className="flex flex-row gap-2">
                  <p className="font-bold">Name:</p>
                  <span>{order && order.user && order.user.name}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="font-bold">Phone:</p>
                  <span>
                    {order && order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="font-bold">Address:</p>
                  <span>
                    {order &&order.shippingInfo &&
                      `${order.shippingInfo.address}, 
                      ${order.shippingInfo.city}, 
                      ${order.shippingInfo.state},
                       ${order.shippingInfo.pinCode},
                        ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl">Payment</h1>
              <div className="orderDetailsContainerBox pl-10 flex gap-3 flex-col pt-4 pb-6">
                <div>
                  <p
                    className={`${order && order.paymentInfo &&order.paymentInfo.status === "succeeded"
                        ? "text-emerald-900"
                        : "text-red-700"} font-bold
                    `}
                  >
                    {order && order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div className="flex flex-row gap-2">
                  <p className="font-bold">Amount:</p>
                  <span>{order &&order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <h1 className="text-2xl">Order Status</h1>
              <div className="orderDetailsContainerBox pl-10 pt-4 pb-6">
                <div>
                  <p
                    className={`${order && order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-emerald-900"
                        : "text-red-700"} font-bold
                    `}
                  >
                    {order &&order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h1 className="text-2xl">Order Items:</h1>
              <div className="orderDetailsCartItemsContainer flex gap-3 flex-col sm:pl-10 pt-4 pb-4 h-auto">
                {order &&order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="flex flex-col sm:flex-row justify-between sm:pr-8">
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
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderDetails