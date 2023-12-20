import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrder } from "../../actions/orderAction";
import { Link} from "react-router-dom";
import { useAlert } from "react-alert";
import LaunchIcon from "@material-ui/icons/Launch";
import Loader from '../layout/Loader';

const MyOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const rows = [];
  const columns =[
    { field: "id", headerName: "Order ID",headerClassName: 'bg-[#C2EFD4] text-white', minWidth: 400, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      headerClassName: 'bg-[#C2EFD4] text-white',
      minWidth: 250,
      flex: 0.8,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      headerClassName: 'bg-[#C2EFD4] text-white',
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "amount",
      headerName: "Amount",
      headerClassName: 'bg-[#C2EFD4] text-white',
      type: "number",
      minWidth: 250,
      flex: 0.5,
    },

    {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        headerClassName: 'bg-[#C2EFD4] text-white',
        minWidth: 183,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/order/${params.getValue(params.id, "id")}`}>
              <LaunchIcon />
            </Link>
          );
        },
      },
  ];

  orders &&
  orders.forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(myOrder());
      }, [dispatch, alert, error]);
    
  return (
    <Fragment>
      {loading ? (
       <Loader/>
      ) : (
        <div className="myOrdersPage w-full box-border p-10 flex flex-col h-screen">
        <h1 className="text-center capitalize text-2xl mb-5">{user.name}'s Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  )
}

export default MyOrder