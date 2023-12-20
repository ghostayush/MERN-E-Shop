import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, alert,navigate, success]);

  return (
    <Fragment>
    {loading ? (
      <Loader/>
    ) : (
      <Fragment>
        <div className="resetPasswordContainer bg-[#C2EFD4] h-screen flex items-center justify-center">

          <div className="resetPasswordBox bg-white w-4/5 sm:w-2/4 lg:w-1/4 h-auto min-h-2/4 flex flex-col items-center gap-2">
            <h2 className=" text-2xl text-[#224F34] text-center font-medium pt-5">Update Profile</h2>

            <form
              className="resetPasswordForm flex flex-col items-center  p-4 gap-4"
              onSubmit={resetPasswordSubmit}
            >
              <div className="flex w-full items-center">
                <LockOpenIcon />
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                value="Update"
                className="resetPasswordBtn bg-[#224F34] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword