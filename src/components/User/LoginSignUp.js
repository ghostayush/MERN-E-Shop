import React, { Fragment,useEffect,useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import MailoutlineIcon from '@material-ui/icons/MailOutline'
import LockOperIcon from '@material-ui/icons/LockOpen'
import pic from '../../images/Profile.png'
import FaceIcon from "@material-ui/icons/Face"
import {useDispatch,useSelector}from "react-redux";
import { clearErrors,login,register } from '../../actions/userAction'
import {useAlert} from 'react-alert'
import { useNavigate,useLocation  } from 'react-router-dom';
import Loader from '../layout/Loader';

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert= useAlert();
    const navigate = useNavigate();
    const location =useLocation();

    const {error,loading,isAuthenticated}=useSelector((state)=>state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState(pic);
    const [currTab,setCurrTab]=useState("login");
    const [user,setUser]=useState({
      name:"",
      email:"",
      password:"",
    });

    const{name,email,password}=user;

    const loginSubmit = (e) =>{
      e.preventDefault();
      dispatch(login(loginEmail,loginPassword));
    }

    const registerSubmit = (e) =>{
      e.preventDefault();
      const myForm = new FormData();

      myForm.set("name",name);
      myForm.set("email",email);
      myForm.set("password",password);
      myForm.set("avatar",avatar);
      dispatch(register(myForm));
    }
    
    const registerDataChange = (e) =>{
      if(e.target.name === "avatar"){
         const reader = new FileReader();
         
         reader.onload =()=>{
            if(reader.readyState===2){
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
         };
         reader.readAsDataURL(e.target.files[0]);
      }
      else{
        setUser({...user,[e.target.name]:e.target.value});
      }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if(isAuthenticated){
        navigate(redirect)
      }
    },[dispatch,error,alert,navigate,redirect,isAuthenticated]);
    
    const switchTabs=(e,tab)=>{
    setCurrTab(tab);
    }

  return (
    <Fragment>
      {loading?<Loader/>:(
        <Fragment>
      <div className='LoginSignUpContainer h-screen flex justify-center items-center bg-[#A3F3BE] top-0 left-0 '>
        <div className='LoginSignUpBox w-96 h-96 box-border overflow-hidden bg-slate-50'>
          <div>
            <div className='login_signup_toggle flex h-12'>
                <p onClick={(e)=>switchTabs(e,"login")} className={`loginwala text-[#224F34] cursor-pointer grid place-items-center w-full hover:text-xl ${currTab=== "login" ? 'bg-[#224F34] text-white' : ''}`}>Login</p>
                <p onClick={(e)=>switchTabs(e,"register")} className={`registerwala text-[#224F34] cursor-pointer grid place-items-center w-full hover:text-xl ${currTab=== "register" ? 'bg-[#224F34] text-white' : ''} `}>REGISTER</p>
            </div>
          </div>
           
          <form className={`loginForm flex flex-col items-center m-auto p-4 justify-evenly gap-4 ${currTab=== "login" ? 'block' : 'hidden'}`} ref={loginTab} onSubmit={loginSubmit}>
            <div className='loginEmail flex w-full items-center'>
                <MailoutlineIcon/>
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                    type='email' 
                    placeholder='Email'
                    required
                    value={loginEmail}
                    onChange={(e)=>setLoginEmail(e.target.value)}
                />
            </div>
            <div className='loginPassword flex w-full items-center'>
                <LockOperIcon/>
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                    type='password'
                    placeholder='Password'
                    required
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}
                />
            </div>
            <Link to='/password/forget' className='self-end text-[#267D49] font-medium hover:text-xl'>Forget Password?</Link>
            <input type='submit' value='Login' className='loginBtn bg-[#224F34] text-white w-full p-3 cursor-pointer rounded-2xl shadow-md'/>
          </form>

          <form
          className={`signUpForm flex flex-col items-center m-auto p-4 justify-evenly gap-2 ${currTab=== "register" ? 'block' : 'hidden'}`}
          ref={registerTab}
          encType='multipart/form-data'
          onSubmit={registerSubmit}>
            <div className='signUpName flex w-full items-center'>
                <FaceIcon/>
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                    type='text'
                    placeholder='Name'
                    required
                    name='name'
                    value={name}
                    onChange={registerDataChange}
                />
            </div>
            <div className='signUpEmail flex w-full items-center'>
               <MailoutlineIcon/>
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email} 
                    onChange={registerDataChange}
                />
            </div>
            <div className='signUpPassword flex w-full items-center'>
               <LockOperIcon/>
                <input className='w-full box-border h-16 p-4 border-solid border-2'
                    type='password'
                    placeholder='Password'
                    required
                    name='password'
                    value={password}
                    onChange={registerDataChange}
                />
            </div>
            <div id='registerImage' className='flex w-full items-center'>
              <img src={avatarPreview} alt='Avatar Preview' className='w-10 '/>
              <input className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 
               file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
             file:bg-[#267D49] file:text-white hover:file:bg-[#224F34]s'
                type='file'
                name='avatar'
                required
                accept='image/*'
                onChange={registerDataChange}
              />
            </div>
            <input
                type='submit'
                value='Register'
                className='bg-[#224F34] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md'
            />
          </form>
        </div>
      </div>
    </Fragment>
      )}
    </Fragment>
  )
}

export default LoginSignUp