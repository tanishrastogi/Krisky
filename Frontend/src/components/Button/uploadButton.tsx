import { useState } from "react";
import Button from "./Button.js";
import {
  uploadBlogToAws,
  fetchBlog,
} from "./aws-button-functions/uploadBlog.js";

const BlogUploadButton = (props) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  // useEffect(()=>{
  //   const fetchImage = async()=>{
  //     const img  = await fetchBlog("65c76d69f2365cc1cd1fee3d");
  //     setUrl(img.data.data.url);
  //   };
  //   fetchImage();
  // } , [])

  return (
    <div>
      <input type="text"></input>
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <Button
        onClick={async () => {
          console.log("123");
          // uploadBlogToAws({blogTitle:"blog-testing" , content:" blog test content "} , image);
          // setUrl(url.data.data.url);
        }}
      >
        upload image to aws
      </Button>
      {/* <img src={url} alt="blog image" style={{width:"200px"}}></img> */}
    </div>
  );
};

export default BlogUploadButton;
