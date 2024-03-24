import { useState, useEffect } from 'react';
import style from './Blogs.module.css'
import BlogCard from '../../components/BlogCard/BlogCard';
import PostCard from '../../components/PostCard/PostCard';
import { getAllBlogs } from '../../api/user.api';


const Blog = () => {
  const [bloglist, setBloglist] = useState([]);

  const getBlogs = async () => {
    const response = await getAllBlogs();
    if (response.statusCode === 200) setBloglist(response.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  
  return (
<div className={style.container}>
      <div className={style.topbar}>
   <span className={style.topbar__heading}>Blog</span>
   <span className={style.topbar__subheading}>Home - <span >All Posts</span></span>
      </div>
      <div className={style.bloglist}>
         {bloglist.map((blog)=>(
          <BlogCard blog={blog}/>
         ))}
      </div>
      <div className={style.recent_blogs}>
        <div className={style.recent_blogs_title} style={{
          fontSize: "1rem",
        
        }}>Stay-up-to-date</div>
        <h2 style = {{
          marginTop: "0.7rem",
          fontSize: "2.5rem",
        }}>RECENT POSTS</h2>
     <div className={style.recent__blogs_container}>
       <PostCard/>
      </div>

    </div>
    </div>
  )
}

export default Blog