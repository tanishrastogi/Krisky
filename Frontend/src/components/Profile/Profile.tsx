import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileVisibility } from '../../redux/reducers/authSlice';
import style from './Profile.module.css';
import avatar from './../../assets/avatar.jpg'
import { LogoutBtn } from "..";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state : any) => state.auth?.userData);
  console.log(user);
  const isProfileOpen = useSelector((state) => state.auth.isOpen);
  const authStatus = useSelector((state) => state.auth.status);


  const handleToggleProfileVisibility = () => {
    dispatch(toggleProfileVisibility());
  };

  return (
      <div id="mySidenav" className={`${style.sidenav} ${isProfileOpen&&authStatus ? style.open : ''}`}>
        <div className={style.head}>
        <h2>Profile</h2>
        <a className={style.closebtn} onClick={handleToggleProfileVisibility}>&times;</a>  
        </div>
        <div className={style.detailsection}>
        <div className={style.imagesection}> 
        <div className={style.imagecircle}>
          <img src={avatar} className={style.avatar}/>
        </div>
        <div className={style.detail}>
        <h4 className={style.status} >{user?.status} {user?.role}</h4>
        <span className={style.subheading}>Name : {user?.username}</span>
        <span className={style.subheading}>Email : {user?.email}</span>
        {/* <span className={style.subheading}>Mobile : {mobile}</span> */}
        </div>
        </div>
        </div>
        <div className={style.logoutbutton}>
          <LogoutBtn/>
        </div>
      </div>
  );
};

export default Profile;