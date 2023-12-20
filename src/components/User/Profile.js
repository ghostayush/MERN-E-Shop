import React,{ Fragment, useEffect }  from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';
import {AiOutlineEdit} from 'react-icons/ai'

const Profile = () => {
    const navigate=useNavigate();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    
    useEffect(() => {
        if (isAuthenticated === false) {
          navigate("/login");
        }
      }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
       <Loader/>
      ) : (
        <Fragment>
          <div className="flex bg-[#C2EFD4] justify-center items-center gap-10 sm:gap-20 flex-col h-auto sm:flex-row sm:h-screen">
            
            <div className='w-80 h-3/4 mt-10 sm:mt-0 sm:pt-10 flex flex-col'>
              <h1 className='text-2xl sm:text-4xl text-[#224F34] text-center sm:text-start'>My Profile</h1>
              <div className=''>
              <img className='rounded-full h-64 w-64 ml-12 mt-6 sm:mt-12 bg-white' 
              src={isAuthenticated && user.avatar.url} 
              alt={user.name} />
              <Link to="/me/imageupdate" className='text-4xl text-[#224F34]'><AiOutlineEdit/></Link>
              </div>
              <Link to="/me/update" className='bg-[#267D49] text-white text-center mt-6'>Edit Profile</Link>
            </div>

            <div className='flex flex-col w-full sm:w-96 sm:mt-20 gap-12 mb-10'>
              <div className='text-center sm:text-start'>
                <h4 className='text-2xl text-[#224F34]'>Full Name</h4>
                <p className='text-[#267D49]'>{user.name}</p>
              </div>
              <div className='text-center sm:text-start'>
                <h4 className='text-2xl text-[#224F34]'>Email</h4>
                <p className='text-[#267D49]'>{user.email}</p>
              </div>
              <div className='text-center sm:text-start'>
                <h4 className='text-2xl text-[#224F34]'>Joined On</h4>
                <p className='text-[#267D49]'>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div className='flex flex-col gap-8 items-center'>
                <Link to="/orders" className='bg-[#267D49] text-white text-center w-2/4 sm:w-full'>My Orders</Link>
                <Link to="/password/update" className='bg-[#267D49] text-white text-center w-2/4 sm:w-full'>Change Password</Link>
              </div>
            </div> 

          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile