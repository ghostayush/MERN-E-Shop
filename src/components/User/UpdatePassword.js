import React,{ Fragment, useState, useEffect }from 'react'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Loader from '../layout/Loader';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate= useNavigate();
  
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(updatePassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        navigate("/account");
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert,navigate, isUpdated]);
  
  return (
    <Fragment>
    {loading ? (
      <Loader/>
    ) : (
      <Fragment>
        <div className="updatePasswordContainer bg-[#C2EFD4] h-screen flex items-center justify-center">
          <div className="updatePasswordBox bg-white w-4/5 sm:w-2/4 lg:w-1/4 h-auto min-h-2/4 flex flex-col items-center gap-2">
            <h2 className=" text-2xl text-[#224F34] text-center font-medium pt-5">Update Password</h2>

            <form
              className="updatePasswordForm flex flex-col items-center  p-4 gap-4"
              onSubmit={updatePasswordSubmit}
            >
              <div className="loginPassword flex w-full items-center">
                <VpnKeyIcon />
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword flex w-full items-center">
                <LockOpenIcon />
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword flex w-full items-center">
                <LockIcon />
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Change"
                className="updatePasswordBtn bg-[#224F34] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default UpdatePassword