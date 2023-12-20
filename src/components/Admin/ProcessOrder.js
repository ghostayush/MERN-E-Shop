import React, { Fragment, useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import SideBar from "./SideBar";
import { getOrderDetails,clearErrors,updateOrder,} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from '../layout/Loader'

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error,id, isUpdated, updateError]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard flex flex-col sm:flex-row  bg-white w-full h-auto">
        <SideBar />
        <div className="newProductContainer w-full sm:w-2/3 md:w-9/12 lg:w-4/5">
          {loading ? (
            <Loader/>
          ) : (
            <div
              className="confirmOrderPage flex flex-col md:flex-row w-full"
            >
              <div className="border-b-2 md:border-r-2 ml-8 pb-10 w-3/4">

                <div className="confirmshippingArea">

                  <div className="text-2xl">Shipping Info:</div>
                  <div className="orderDetailsContainerBox pl-10 flex gap-3 flex-col pt-4 mb-2">
                    <div className="flex flex-row gap-2">
                      <p className="font-bold">Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="font-bold">Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="font-bold">Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, 
                          ${order.shippingInfo.city}, 
                          ${order.shippingInfo.state}, 
                          ${order.shippingInfo.pinCode}, 
                          ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <div className="text-2xl">Payment</div>
                  <div className="orderDetailsContainerBox pl-10 flex gap-3 flex-col pt-4 mb-2">
                    <div className="font-bold">
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-[#267D49]"
                            : "text-red-500"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="flex flex-row gap-2">
                      <p className="font-bold">Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <div className="text-2xl">Order Status</div>
                  <div className="orderDetailsContainerBox pl-10 flex gap-3 flex-col pt-4 mb-2">
                    <div className="font-bold">
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "text-[#267D49]"
                            : "text-red-500"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="confirmCartItems">
                  <div className="text-2xl">Your Cart Items:</div>
                  <div className="confirmCartItemsContainer pl-10 flex gap-3 flex-col pt-4  h-auto">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product} className="flex flex-row justify-between pr-8">
                          <img src={item.image} alt="Product"  className="w-10 h-10"/>
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
              {/*  */}
              <div className="w-full md:w-1/4 flex justify-center items-center p-2">
                <form
                  className="updateOrderForm  mb-10  flex flex-col items-center bg-[#C2EFD4] h-auto w-full gap-4"
                  onSubmit={updateOrderSubmitHandler}
                >
                 
                  <div className="text-2xl text-center">Process Order</div>
                  <div className="">
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <input
                    id="createProductBtn"
                    type="submit"
                    value='Process'
                    className="bg-[#267D49] text-white w-20 rounded-md mb-4"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  />
                  
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProcessOrder