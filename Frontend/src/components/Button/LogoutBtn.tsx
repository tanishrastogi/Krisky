import React from "react";
import { authLogout } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";

const LogoutBtn = ({wid}) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const data = await authLogout();
    if (data.status === 200) dispatch(logout());
    else console.log("Error in logout");
  };

  return <button className="logoutBtn" style={{backgroundColor: 'black', width: `${wid}`, height:'40px', color: 'white', borderRadius: '10px', border: 'none'}} onClick={handleLogout}>Logout</button>;
};

export default LogoutBtn;