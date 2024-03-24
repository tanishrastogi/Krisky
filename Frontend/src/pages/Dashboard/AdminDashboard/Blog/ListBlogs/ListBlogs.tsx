import { useState, useEffect } from "react";
import style from "./ListBlogs.module.css";
import BlogCard from "../../../../../components/BlogCard/BlogCard";
import { getAllBlogs } from "../../../../../api/admin.api";

const ListBlogs = () => {
  const [bloglist, setBloglist] = useState([]);
  const getBlogs = async () => {
    const response = await getAllBlogs();
    if (response.statusCode === 200) setBloglist(response.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className={style.list}>
      {bloglist.map((blog) => {
        return <BlogCard blog={blog} />;
      })}
    </div>
  );
};

export default ListBlogs;
