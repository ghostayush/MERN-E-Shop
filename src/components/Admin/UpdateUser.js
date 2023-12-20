import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams,useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./SideBar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {getUserDetails,updateUser,clearErrors,} from "../../actions/userAction";
import Loader from '../layout/Loader'


const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params=useParams();
    const navigate=useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {error: updateError,isUpdated} = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;
  
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard flex flex-col sm:flex-row  bg-white w-full h-auto">
        <SideBar />
        <div className="newProductContainer w-full sm:w-2/3 md:w-9/12 lg:w-4/5 flex justify-center items-center">
          {loading ? (
            <Loader/>
          ) : (
            <form
              className="createProductForm bg-[#C2EFD4] w-4/5 sm:w-2/4 flex flex-col items-center gap-2 h-auto mb-4 mt-4 p-8"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className=" text-2xl text-[#224F34] text-center font-medium ">Update User</h1>

              <div className="flex w-full items-center">
                <PersonIcon />
                <input className='w-full box-border h-10 p-4 border-solid border-2'
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex w-full items-center">
                <MailOutlineIcon />
                <input className='w-full box-border h-10 p-4 border-solid border-2'
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-full items-center">
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}
                className='w-full box-border h-10 border-solid border-2'>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <input
                id="createProductBtn"
                type="submit"
                value='Update'
                className="bg-[#224F34] text-white w-full p-3 cursor-pointer rounded-2xl "
              />
            </form>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser