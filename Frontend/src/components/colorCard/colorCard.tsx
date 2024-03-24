import { useEffect, useState } from "react";
import style from "./colorCard.module.css";

interface ColorCardProps {
  id: number;
  color: string;
  activeId: number;
  setActiveId: (id: number) => void;
  setImageSrc: (src: string) => void;
}

const colorCard: React.FC<ColorCardProps> = ({
  id,
  color,
  activeId,
  setActiveId,
  setImageSrc,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (activeId === id) {
      setIsSelected(true);
      setImageSrc(color);
    } else {
      setIsSelected(false);
    }
  }, [activeId]);

  return (
    <div className={style.container}>
      <img
        src={color}
        className={style.shoes__color}
        onClick={() => {
          setActiveId(id);
        }}
        style={{
          border: isSelected ? "0.5px solid #212121" : "0px",
          borderRadius: "2px",
          outline: "none",
          padding: "5px",
          width: "50px",
          height: "42px"
        }}
      />
    </div>
  );
};

export default colorCard;
