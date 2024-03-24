import { useNavigate } from "react-router-dom";
import style from './BlogCard.module.css'
import DummyImage from '../../assets/dummy_blog_image.png'
const BlogCard = ({blog}) => {
  const navigate = useNavigate();
  return (
    <div className={style.card} onClick={() => navigate(`/blogpage?blog=${blog._id}`)}>
        <img src={blog.imageurl}  className={style.image} alt="Blog image"/>
        <div className={style.card__info}>
             <a>Games</a>
             <span className={style.card__info_entity}>&#9679;</span>
             <span className={style.card__info_date}>Feb 18, 2020</span>
             </div>
        <p className={style.card__paragraph}>Lorem ipsum dolor sit amet consectetur.</p>
     </div>
  )
}

export default BlogCard