import style from "./ProductCard.module.css";
import ColorCard from "../colorCard/colorCard";
import Fire from "../../assets/images/fire.png";
import Add from "../../assets/images/add.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, wid }) => {
  const navigate = useNavigate();
  const [shoesColorData, setShoesColorData] = useState(product.images);

  const [activeColor, setActiveColor] = useState("");
  const [activeColorId, setActiveColorId] = useState<number | null>(null);

  const handleImageSrcChange = (src: string) => {
    setActiveColor(src);
  };

  return (
    <div className={style.container} style={{width: wid}}>
      <div className={style.container__header}>
        <div className={style.container__hotitem}>
          <img src={Fire} alt="error" />
        </div>
        <img src={Add} className={style.container__addcard} alt="error" />
      </div>
      <div className={style.shoes__bestseller}>
        <div className={style.shoes__bestseller_text}>BestSeller</div>
      </div>
      <img
        src={activeColor}
        className={style.shoes__image}
        onClick={() => navigate(`/product/${product._id}`)}
      />
      <div className={style.shoes__color}>
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
      <div
        className={style.shoes__info}
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className={style.shoes__data}>
          <div className={style.shoes__name}>{product.title}</div>
          <div className={style.shoes__price}>{product.price}</div>
        </div>
        <p className={style.shoes__tags}>{product.category}</p>
        <div className={style.mobile__shoes_price}>INR {product.price}</div>
        <div className={style.mobile__expected_price}>{product.price}</div>
        <p className={style.shoes__tagline}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
