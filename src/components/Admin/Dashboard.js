import React,{useEffect} from 'react'
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock","millgya"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        // data: [outOfStock, products.length - outOfStock],
        data:[2,5,6],
      },
    ],
  };

  return (
    <div className='dashboard flex flex-col sm:flex-row  bg-white w-full h-auto'>
        <Sidebar/>

        <div className="dashboardContainer flex flex-col items-center p-8 w-full sm:w-2/3 md:w-9/12 lg:w-4/5 gap-6">
        <h1 className=" text-4xl text-[#224F34] text-center font-medium ">Dashboard</h1>

        <div className="dashboardSummary flex flex-col gap-8 w-full">
          <div className='bg-[#267D49] text-white text-xl text-center h-20 pt-4'>
            <p>
              Total Amount <br />
              ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2 flex flex-row gap-8 items-center justify-center">
            <Link to="/admin/products" className='rounded-full w-40 h-40 box-border flex justify-center items-center bg-green-500 flex-col'>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders" className='rounded-full w-40 h-40 box-border flex justify-center items-center flex-col bg-orange-400'>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users" className='rounded-full w-40 h-40 box-border flex justify-center items-center flex-col bg-pink-500'>
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

     <div className='flex gap-10 flex-col'>
        <div className="lineChart w-full ">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart w-full">
          <Doughnut data={doughnutState} />
        </div> 
      </div>
      </div>
        </div>
  )
}

export default Dashboard