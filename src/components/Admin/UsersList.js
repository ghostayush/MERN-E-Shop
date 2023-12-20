import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";


const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate= useNavigate();
  
    const { error, users } = useSelector((state) => state.allUsers);
    const {error: deleteError,isDeleted,message} = useSelector((state) => state.profile);
  
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success(message);
        navigate("/admin/users");
        dispatch({ type: DELETE_USER_RESET });
      }
  
      dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);
 
    const columns = [
        { field: "id", headerName: "User ID",headerClassName: 'bg-[#C2EFD4] text-white', minWidth: 180, flex: 0.6 },
    
        {
          field: "email", 
          headerName: "Email",
          headerClassName: 'bg-[#C2EFD4] text-white',
          minWidth: 150,
          flex: 0.6,
        },
        {
          field: "name",
          headerName: "Name",
          headerClassName: 'bg-[#C2EFD4] text-white',
          minWidth: 150,
          flex: 0.5,
        },
    
        {
          field: "role",
          headerName: "Role",
          headerClassName: 'bg-[#C2EFD4] text-white',
          type: "number",
          minWidth: 100,
          flex: 0.3,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "greenColor"
              : "redColor";
          },
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          headerClassName: 'bg-[#C2EFD4] text-white',
          minWidth: 100,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon className="text-[#267D49]"/>
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon className="text-red-500"/>
                </Button>
              </Fragment>
            );
          },
        },
      ];

      const rows = [];

      users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      }); 

  return (
    <Fragment>
        <div className="flex flex-col sm:flex-row  bg-white w-full h-auto">
        <SideBar />
        <div className="flex flex-col p-10 w-full sm:w-2/3 md:w-9/12 lg:w-4/5 gap-6">
          <h1 className=" text-4xl text-[#224F34] text-center font-medium ">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default UsersList