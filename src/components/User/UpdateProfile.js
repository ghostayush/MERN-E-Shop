import React,{useEffect,useState,Fragment} from 'react'
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { updateProfile,clearErrors,loadUser} from '../../actions/userAction';
import {UPDATE_PROFILE_RESET} from '../../constants/userConstants'
import FaceIcon from '@material-ui/icons/Face'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading} = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        dispatch(updateProfile(myForm));
      };

      useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
        }
    
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Profile Updated Successfully");
          dispatch(loadUser());
    
          navigate("/account");
    
          dispatch({
            type: UPDATE_PROFILE_RESET,
          });
        }
      }, [dispatch, error, alert,navigate,user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : ( 
        <Fragment>
          <div className="updateProfileContainer bg-[#C2EFD4] h-screen flex items-center justify-center">
            <div className="updateProfileBox bg-white w-4/5 sm:w-2/4 lg:w-1/4 h-auto min-h-2/4 flex flex-col items-center gap-2">
              <h2 className=" text-2xl text-[#224F34] text-center font-medium pt-5">Update Profile</h2>
              <form
                className="updateProfileForm flex flex-col items-center  p-4 gap-4"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName flex w-full items-center">
                  <FaceIcon/>
                  <input className='w-full box-border h-16 p-4 border-solid border-2'
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail flex w-full items-center">
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
                  value="Update"
                  className="updateProfileBtn bg-[#224F34] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdateProfile