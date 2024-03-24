import { useParams } from "react-router-dom";
import style from "./ProductDesc.module.css";
import { useEffect, useState } from "react";
import { getRecentProducts, addToCart } from "../../api/user.api";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Button, PaymentButton } from "../../components/index";
import { useSelector } from "react-redux";
import ColorCard from "../../components/colorCard/colorCard";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/reducers/cartSlice";
import { getProductById } from "../../api/product.api";

const ProductDesc = () => {
  const dispatch = useDispatch();
  const { id: productID } = useParams<{ id: string }>();
  const [products, setProducts] = useState([]);
  const [curProduct, setCurProduct] = useState([]);
  const [shoesColorData, setShoesColorData] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const [activeColorId, setActiveColorId] = useState<number | null>(null);
  const [size, setSize] = useState();
  const userID = useSelector((state: any) => state.auth?.userData?._id);

  const handleImageSrcChange = (src: string) => {
    setActiveColor(src);
  };

  const getProducts = async () => {
    const response = await getRecentProducts();
    if (response.statusCode === 200) setProducts(response.data);
  };
  const getCurrentProduct = async () => {
    const payload = {
      productID,
    };
    const response = await getProductById(payload);
    if (response.statusCode === 200) {
      console.log(response);
      setCurProduct(response.data);
      setShoesColorData(response.data.images);
    }
  };
  useEffect(() => {
    getProducts();
    getCurrentProduct();
  }, []);

  const sizes = [
    { label: "Select Size" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
  ];

  const handleChange = (event: any) => {
    setSize(event.target.value);
  };

  const handleAddToCart = async () => {
    const payload = {
      userID,
      productID,
    };
    try {
      const result = await addToCart(payload);
      console.log(result.data.items);
      dispatch(addItem(result.data.items));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div style={{ margin: "25px" }}>
        <div className={style.product}>
          <img
            src={activeColor}
            className={style.imagebox}
            alt="product-image"
          />
          <div className={style.action}>
            <h4 className={style.SampleBrand}>{curProduct.brand}</h4>
            <h2 className={style.SampleProduct}>{curProduct.title}</h2>
            {curProduct.category === "bestseller" && (
              <a className={style.bestseller}>BEST SELLER</a>
            )}
            {/* <h2>Rs. {curProduct.price.originalPrice}</h2> */}
            <div>
              <select
                className={style.size}
                value={size}
                onChange={handleChange}
              >
                {sizes.map((size: any) => (
                  <option value={size.value}>{size.label}</option>
                ))}
              </select>
            </div>
            <Button
              className={style.addtocart}
              style={{ backgroundColor: "#131313", color: "white" }}
              onClick={handleAddToCart}
              type="submit"
            >
              Add to Cart
            </Button>
            <PaymentButton amount="10" />
          </div>
        </div>
        <div className={style.cards}>
          {shoesColorData.map((color, index) => (
            <ColorCard
              key={index}
              id={index}
              color={color}
              activeId={activeColorId || 0}
              setActiveId={(id) => setActiveColorId(id)}
              setImageSrc={handleImageSrcChange}
            />
          ))}
        </div>

        <div className={style.description}>
          <h1 className={style.productDescTitle}>Product Detail</h1>
          <h3 className={style.productDesc}>{curProduct.description}</h3>
          <a>Read More</a>
        </div>

        <div className={style.table}>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>MANUFACTURED SKU</h5>
            <p></p>
            <h5 style={{ color: "#656565" }}>COLORWAY</h5>
            <p></p>
          </div>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>BRAND</h5>
            <p></p>
            <h5 style={{ color: "#656565" }}>GENDER</h5>
            <p></p>
          </div>
          <div className={style.column}>
            <h5 style={{ color: "#656565" }}>NICKNAME</h5>
            <p></p>
            <h5 style={{ color: "#656565" }}>RELEASE DATE</h5>
            <p></p>
          </div>
        </div>
      </div>
      <div className={style.AlsoLikeSlider}>
        <h1 className={style.AlsoLikeSliderTitle}>You may also like</h1>
        <div className={style.cards}>
          {products.map((product: any, index: number) => {
            return (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
        <div className={style.NewArrivalsSlider}></div>
        <h1 className={style.NewArrivalsSliderTitle}>New Arrivals</h1>
        <div className={style.cards}>
          {products.map((product: any, index: number) => {
            return (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
