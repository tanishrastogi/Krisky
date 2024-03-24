import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  toggleWishlistVisibility,
  setInitialWishlistItems,
} from "../../redux/reducers/wishlistSlice";
import style from "./Wishlist.module.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlistOpen = useSelector((state) => state.wishlist.isOpen);

  const handleToggleWishlistVisibility = () => {
    dispatch(toggleWishlistVisibility());
  };

  return (
    <div
      id="mySidenav"
      className={`${style.sidenav} ${isWishlistOpen ? style.open : ""}`}
    >
      <div className={style.head}>
        <h2>Wishlist</h2>
        <a className={style.closebtn} onClick={handleToggleWishlistVisibility}>
          &times;
        </a>
      </div>
    </div>
  );
};

export default Wishlist;
