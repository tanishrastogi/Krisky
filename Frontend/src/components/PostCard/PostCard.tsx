import React from "react";
import style from "./PostCard.module.css";

import Poster from "../../assets/post_heading.jpg";
import BlockImage from "../../assets/block_image.jpg";
const PostCard = (props) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <img src={Poster} className={style.container__header_image} />
        <div className={style.header__info}>
          <div className={style.header__date}> <div>18</div> <div className={style.header__month}>Mar</div> </div>
          <div className={style.header__container}>
          <div className={style.header__content}>
            Lorem ipsum dolor sit amet consectetur.
          </div>
          <div className={style.header__paragraph}>
            Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed
            eget viverra egestas nisi in consequat. Fusce…
          </div>
          <div className={style.header__likes}>0 Likes . 0 Comments</div>
          </div>
        </div>
      </div>
      <div className={style.container__block}>
        <BlockCard />
        <BlockCard />
        <BlockCard />
      </div>
    </div>
  );
};

const BlockCard = (props) => {
  return (
    <div className={style.block}>
      <img src={BlockImage} alt="error" className={style.block__image} />
      <div className={style.block__info}>
        <div className={style.block__info_heading}>
          Adaptation <span className={style.block__info_circle}>&#9679;</span>{" "}
          <span className={style.block__info_date}>Mar 18, 2020</span>
        </div>
        <div className={style.block__info_content}>
          Lorem ipsum dolor sit amet consectetur.
        </div>
      </div>
    </div>
  );
};
export default PostCard;
