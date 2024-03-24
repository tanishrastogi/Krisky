import React, { useEffect, useState } from "react";
import style from "./CartItem.module.css";
import { getProductById } from "../../api/product.api";

const CartItem = ({ productID, quantity }) => {
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    const payload = {
      productID: productID,
    };
    const response = await getProductById(payload);
    if (response.statusCode === 200) {
      setProduct(response.data);
      console.log(product);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={style.cartItem}>
      <div className={style.productImage}>
        <img src={product.images} alt={product.title} />
      </div>
      <div className={style.productDetails}>
        <h3>{product.title}</h3>
        {/* <p>Price: Rs. {product.price}</p>  */}
        <p>Description: {product.description}</p>
        <p>Size: {product.size}</p>
        <p>Quantity: {quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
