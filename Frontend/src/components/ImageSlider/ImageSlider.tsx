import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type ImageSliderProps = {
  imageUrls: string[];
};

const ImageSlider = ({ imageUrls }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
        borderColor: "#DADADA",
        borderStyle: "solid",
        borderRadius: "25px",
      }}
    >
      {imageUrls && (
        <img
          key={imageIndex}
          src={imageUrls[imageIndex]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            verticalAlign: "bottom",
          }}
          alt=""
        />
      )}

      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      >
        <div
          onClick={() => {
            setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageUrls.length - 1);
          }}
        >
          <ArrowBackIosNewIcon />
        </div>
        <div
          onClick={() => {
            setImageIndex(imageIndex < imageUrls.length - 1 ? imageIndex + 1 : 0);
          }}
        >
          {" "}
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
