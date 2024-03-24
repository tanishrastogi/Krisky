import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { getProductById } from "../../../../../api/product.api";
import { useForm } from "react-hook-form";
import style from "./EditProduct.module.css";
import {
  Button,
  Container,
  ImageSlider,
  Input,
  Select,
} from "../../../../../components";
import { updateProduct } from "../../../../../api/admin.api";

const EditProduct = () => {
  const productID = useSelector(
    (state: RootState) => state.adminDashboard.currentProduct
  );
  const [product, setProduct] = useState({});
  const [productPrice, setProductPrice] = useState();
  const [imageUrls, setImageUrls] = useState();

  const handleUpdateProduct = async (product) => {
    try {
      product = { ...product };
      const response = await updateProduct(product);
      if (response.statusCode === 200) alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductById({ productID });
        setProduct(response.data);
        setImageUrls(response.data.images);
        setProductPrice(response.data.price.originalPrice);
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
          <ImageSlider imageUrls={product.images} />
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
                  <textarea
                    className={style.input}
                    style={{
                      height: "130px",
                      padding: "16.5px 0px 0px 14px",
                      fontWeight: "400",
                    }}
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
                <Button
                  onClick={() => handleUpdateProduct(product)}
                  className={style.savebutton}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <h1>"No product selected"</h1>
      )}
    </div>
  );
};

export default EditProduct;
