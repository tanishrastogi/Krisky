import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { getUserById } from "../../../../../api/admin.api";
import avatar from './../../../../../assets/avatar.jpg';
import style from './DetailUser.module.css'

const DetailUser = () => {
  const userID = useSelector(
    (state: RootState) => state.adminDashboard.currentUser
  );
  const [userData, setUserData] = useState({});
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  useEffect(() => {
    (async () => {
      const response = await getUserById({ userID });
      if (response.statusCode === 200) {
        setUserData(response.data);
        setMobile(response.data.mobile.number);
        setAddress(response.data.address)
      }
    })();
  }, []);

  return (
    <div>
    <div className={style.container}>
      <div className={style.imagesection}> 
        <div className={style.imagecircle}>
          <img src={avatar} className={style.avatar}/>
        </div>
        <h4 className={style.status} >{userData?.status} {userData?.role}</h4>
        <button className={style.banbutton}>Ban User</button>
      </div>
      {userData.role === "user" ?(<div className={style.detailsection}> 
      <span className={style.heading}>User Deatils</span>
      <span className={style.subheading}>Name : {userData?.userID?.username}</span>
      <span className={style.subheading}>Email : {userData?.email}</span>
      <span className={style.subheading}>Mobile : {mobile}</span>
      <span className={style.subheading}>Store Address : {address}</span>
      <span className={style.subheading}>Store State : {address}</span>
      <span className={style.subheading}> City : {address}</span>
      <span className={style.subheading}> Zip/Pincode : {address}</span>
      </div>)
      :(<div className={style.detailsection}> 
      <span className={style.heading}>Seller Deatils</span>
      <span className={style.subheading}>Store Name : {userData?.username}</span>
      <span className={style.subheading}>Email : {userData?.email}</span>
      <span className={style.subheading}>Mobile : {mobile}</span>
      <span className={style.subheading}> Address : {address}</span>
      <span className={style.subheading}> State : {address}</span>
      <span className={style.subheading}> City : {address}</span>
      <span className={style.subheading}> Zip/Pincode : {address}</span>
      </div>)}
    </div>
    {userData.role === "user" ?(<div className={style.orderhistory}>
      <span className={style.heading}>Order history</span>
    </div>) :
   (<div className={style.orderhistory}>
      <span className={style.heading}>Sale history</span>
    </div>)}
    </div>
  );
};

export default DetailUser;
