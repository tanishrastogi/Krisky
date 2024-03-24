import { useDispatch, useSelector } from "react-redux";
import style from "./DetailProduct.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProductRequestById,
} from "../../../../../api/product.api";
import {
  acceptProductRequest,
  declineProductRequest,
  updateProduct,
} from "../../../../../api/admin.api";
import { ProductDescription } from "../../../../../components";
import { Button } from "@mui/material";
import { selectAdminAction } from "../../../../../redux/reducers/adminDashboardSlice";

const DetailProduct = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.auth.userData.role === "admin"
  );
  let productID;
  isAdmin
    ? (productID = useSelector(
        (state: RootState) => state.adminDashboard.currentProduct
      ))
    : (productID = useSelector(
        (state: RootState) => state.sellerDashboard.currentProduct
      ));

  const productRequestID = useSelector(
    (state: RootState) => state.adminDashboard.currentProductRequest
  );
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]);

  const handleUpdateProduct = (updatedProduct) => {
    try {
      const response = updateProduct(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowEditProduct = () => {
    dispatch(
      selectAdminAction({
        selectedSection: "Product",
        selectedAction: "Edit",
      })
    );
  };

  useEffect(() => {
    (async () => {
      try {
        let response;
        if (productID) {
          response = await getProductById({ productID });
        } else {
          response = await getProductRequestById({
            requestID: productRequestID,
          });
        }
        setProduct(response.data);
        setImageUrls(response.data.images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {product ? (
        <div style={{marginTop: "20px"}}>
          <ProductDescription data={product} />
          {productRequestID ? (
            <div style={{position: "absolute", display: "flex",flexDirection: "column", gap: "20px" , top: "30%", right: " 10%"}}>
              <Button className={style.accept} onClick={() => acceptProductRequest({ requestID: product._id })}>
              <span className={style.accept}>Accept</span>
              </Button>
              <Button className={style.decline} onClick={() =>declineProductRequest({ requestID: product._id })}>
                <span className={style.decline}>Decline</span>
              </Button>
            </div>
          ) : isAdmin ? (
            <div style={{position: "absolute", top: "30%", right: " 10%"}}>
              <Button  onClick={handleShowEditProduct}><span className={style.edit}>Edit</span></Button>
            </div>
          ) : (
            <div style={{position: "absolute", top: "30%", right: " 10%"}}>
              <Button ><span className={style.edit}>Offer</span></Button>
            </div>
          )}
        </div>
      ) : (
        <div>No Product Selected</div>
      )}
    </div>
  );
};

export default DetailProduct;
