import React, { Fragment, useState } from 'react'
import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
// import pic from '../../images/Profile.png'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import {logout} from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

const UserOptions = ({user}) => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {cartItems} = useSelector((state)=>state.cart);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];

      if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }  

      function dashboard(){
        navigate('/admin/dashboard');
      }
      function orders(){
        navigate('/orders');
      }
      function account(){
        navigate('/account');
      }
      function cart(){
        navigate('/cart');
      }
      function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
      }

   const [open,setOpen]=useState(false); 
  return (
    <Fragment>
        <SpeedDial
        className='fixed right-4 top-2'
        ariaLabel='SpeedDial toolytip example'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction='down'
        icon={
        <img
            className='speedDialIcon rounded-full bg-white'
            src={(user.avatar.url)?(user.avatar.url) :'../../images/Profile.png'}
            alt='Proile'
        />}
        >
        {options.map((item)=>(
            <SpeedDialAction
                 key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth<=600?true:false}
            />
        ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions