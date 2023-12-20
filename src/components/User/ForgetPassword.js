import React ,{Fragment,useState,useEffect}from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from '../layout/Loader';

const ForgetPassword = () => {
    const alert= useAlert();
    const dispatch = useDispatch();

    const {loading,error,message}=useSelector((state)=>state.forgetPassword);
    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgetPassword(myForm));
      };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
        }
      }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <div className=" bg-[#A3F3BE] h-screen flex items-center justify-center">
            <div className=" bg-white w-4/5 sm:w-2/4 lg:w-1/4 flex flex-col items-center gap-2">
              <h2 className=" text-2xl text-[#224F34] text-center font-medium pt-5">Update Profile</h2>
              <form
                className="flex flex-col items-center  p-4 gap-4"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="flex w-full items-center">
                  <MailOutlineIcon />
                  <input className='w-full box-border h-16 p-4 border-solid border-2'
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="SEND"
                  className="bg-[#224F34] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md"
                />

              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ForgetPassword