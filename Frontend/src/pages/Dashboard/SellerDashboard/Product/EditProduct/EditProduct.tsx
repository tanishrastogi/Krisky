import { useSelector } from "react-redux";
import style from "./EditProduct.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProductRequestById,
} from "../../../../../api/product.api";
import { updateProduct } from "../../../../../api/admin.api";
import { Button, Container, ImageSlider } from "../../../../../components";

const EditProduct = () => {
  const productID = useSelector(
    (state: RootState) => state.adminDashboard.currentProduct
  );
  const productRequestID = useSelector(
    (state: RootState) => state.adminDashboard.currentProductRequest
  );
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]);

  const handleUpdateProduct = (updatedProduct) => {
    try {
      const response = updateProduct(updatedProduct);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
        console.log(response.data);
        setProduct(response.data);
        setImageUrls(response.data.images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCreateOffer = () => {
    handleUpdateProduct(product);
  };

  return (
    <div>
      {product ? (
        <Container
          sx={{
            flexDirection: "row",
            padding: "20px",
            gap: "2rem",
          }}
        >
          <ImageSlider imageUrls={imageUrls} />
          <div className={style.productDetails}>
            <span className={style.heading}>Product Details</span>
            <div className={style.form}>
              <label className={style.label}>Title</label>
              <div className={style.outerdiv}>
                <input
                  className={style.input}
                  type="text"
                  name="title"
                  value={product.title || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={style.label}>Description</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    style={{ height: "130px" }}
                    type="text"
                    name="description"
                    value={product.description || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Brand</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="brand"
                    value={product.brand || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Color</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="color"
                    value={product.color || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Sizes</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="size"
                    value={product.size || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Gender</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="gender"
                    value={product.gender || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className={style.label}>Category</label>
                <div className={style.outerdiv}>
                  <input
                    className={style.input}
                    type="text"
                    name="category"
                    value={product.category || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={style.buttoncontainer}>
                <Button onClick={handleCreateOffer}>Create Offer</Button>
              </div>
            </div>
          </div>
          <div>{/* <Button  */}</div>
        </Container>
      ) : (
        <div>No Product Selected</div>
      )}
    </div>
  );
};

export default EditProduct;
