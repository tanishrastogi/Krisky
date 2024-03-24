import {Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Profile from "./components/Profile/Profile";
import Footer2 from "./components/Footer2/Footer2";

const Layout = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header />
          <Outlet />
          <Cart />
          <Wishlist />
          <Profile />
          <Footer2/>
        </div>
      )}
    </>
  );
};

export default Layout;
