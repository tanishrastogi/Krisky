import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminAction,
  selectAdminProduct,
  selectAdminProductRequest,
} from "../../redux/reducers/adminDashboardSlice";
import {
  selectSellerAction,
  selectSellerProduct,
} from "../../redux/reducers/sellerDashboardSlice";
import style from "./ProductDashboardCard.module.css";
import { RootState } from "../../redux/store/store";

const ProductDashboardCard = ({ data, type }) => {
  const { _id, title, createdAt, stock, images, price, brand, skuID } = data;
  const createdDate = createdAt.split("T")[0];
  const createdTime = createdAt.split("T")[1].split(".")[0];
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.auth.userData.role);

  const handleShowProduct = () => {
    userRole === "admin"
      ? (type === "request"
          ? dispatch(selectAdminProductRequest(_id))
          : dispatch(selectAdminProduct(_id)),
        dispatch(
          selectAdminAction({
            selectedSection: "Product",
            selectedAction: "Details",
          })
        ))
      : dispatch(selectSellerProduct(_id)),
      dispatch(
        selectSellerAction({
          selectedSection: "Product",
          selectedAction: "Details",
        })
      );
  };

  return (
    <div onClick={handleShowProduct}>
      {userRole === "admin" ? (
        <div className={style.cardContainer}>
          <div className={style.nameImage}>
            <img src={images[0]} alt="" className={style.image} />
            <div className={style.title}>{title}</div>
          </div>
          <div className={style.createdAt}>
            <div className={style.date}>{createdDate}</div>
            <div className={style.time}>{createdTime}</div>
          </div>
          <div className={style.stock}>{stock}</div>
          <div className={style.priceDelete}>
            <div>₹{price}</div>
          </div>
        </div>
      ) : (
        <div className={style.cardContainer}>
          <div className={style.nameImage}>
            <img src={images[0]} alt="" className={style.image} />
            <div className={style.title}>{title}</div>
          </div>
          <div className={style.skuid}>{skuID}</div>
          <div className={style.brand}>{brand}</div>
          <div className={style.priceDelete}>
            <div>₹{price}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDashboardCard;
