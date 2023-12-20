import React, { Fragment ,useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfileImage,clearErrors,loadUser} from '../../actions/userAction';
import { UPDATE_PROFILE_IMAGE_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader';

const ImageUpdate = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading} = useSelector((state) => state.profile);
  
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileImageSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();

        myForm.set("avatar", avatar);
        dispatch(updateProfileImage(myForm));
      };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        }; 
        reader.readAsDataURL(e.target.files[0]);
      };
      useEffect(() => {
        if (user) {
          setAvatarPreview(user.avatar.url);
        }
    
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
   
        if (isUpdated) {
          alert.success("Image Updated Successfully");
          dispatch(loadUser());
    
          navigate("/account");
    
          dispatch({
            type: UPDATE_PROFILE_IMAGE_RESET,
          });
        }
      }, [dispatch, error, alert,navigate,user, isUpdated]);

  return (
<Fragment>
    {loading?<Loader/>:(

        <div className='w-screen h-screen flex items-center justify-center'>

        <form    
        className="updateProfileForm flex flex-col bg-[#A3F3BE] p-4 gap-10"
        encType="multipart/form-data"
        onSubmit={updateProfileImageSubmit}>

        <div id="updateProfileImage" className='flex w-full items-center gap-4'>
      <img src={avatarPreview} alt="Avatar" className='w-10 ' />
      <input className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 
      file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
      file:bg-[#267D49] file:text-white hover:file:bg-[#224F34]'
        type="file"
        name="avatar"
        accept="image/*"
        onChange={updateProfileDataChange}
      />
        </div>

        <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn bg-[#224F34] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md"
                />
        </form>
    </div> 

    )}
</Fragment>
  )
}

export default ImageUpdate