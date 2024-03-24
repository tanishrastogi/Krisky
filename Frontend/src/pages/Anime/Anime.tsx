import { useState, useEffect, useDispatch } from "react";
import ProductDesc from "../ProductDesc/ProductDesc";
import { getAllProducts } from "../../api/user.api";

import style from "./Anime.module.css";
import img from "../../assets/images/AnimePage/bakugoS.png";
import img2 from "../../assets/images/AnimePage/spideyS.png";


import aiz from "../../assets/images/AnimePage/aizawa.png"
import panel from "../../assets/images/AnimePage/picture.png"

/*images*/
import d1 from "../../assets/images/AnimePage/panels/D1.jpg"
import d2 from "../../assets/images/AnimePage/panels/D2.jpg"
import d5 from "../../assets/images/AnimePage/panels/D5.jpg"
import d7 from "../../assets/images/AnimePage/panels/D7.jpg"
import m10 from "../../assets/images/AnimePage/panels/M10.jpg"
import n2 from "../../assets/images/AnimePage/panels/N2.jpg"
import n3 from "../../assets/images/AnimePage/panels/N3.jpg"
import n4 from "../../assets/images/AnimePage/panels/N4.jpg"
import n6 from "../../assets/images/AnimePage/panels/N6.jpg"
import n8 from "../../assets/images/AnimePage/panels/N8.jpg"
import n9 from "../../assets/images/AnimePage/panels/N9.jpg"
import n12 from "../../assets/images/AnimePage/panels/N12.jpg"




import yeah from "../../assets/images/AnimePage/backdrop/Yeah.png"
import bang from "../../assets/images/AnimePage/backdrop/Bang.png"
import bg from "../../assets/images/AnimePage/backdrop/bg.png"
import blastic from "../../assets/images/AnimePage/backdrop/blastic.png"
import Hallo from "../../assets/images/AnimePage/backdrop/Hallo.png"
import Hi from "../../assets/images/AnimePage/backdrop/Hi.png"
import lCorner from "../../assets/images/AnimePage/backdrop/lCorner.png"
import rCorner from "../../assets/images/AnimePage/backdrop/rCorner.png"






const Anime = () => {
  
  return(

    <>

    <div className={style.Body}>
      <div className={style.Col1}>
        <div className={style.Col1row1}><img src={d5} alt="" /></div>
        <div className={style.Col1row2}></div>
        <div className={style.Col1row3}><img src={m10} alt="" /></div>
        <div className={style.Col1row4}><img src={n4} alt="" /></div>
        <div className={style.Col1row5}></div>
      </div>

      <div className={style.Col2}>
        <div className={style.Col2row1}></div>
        <div className={style.Col2row2}><img src={n9} alt="" /></div>
        <div className={style.Col2row3}><img src={d2} alt="" /></div>
        <div className={style.Col2row4}></div>
        <div className={style.Col2row5}><img src={n2} alt="" /></div>
        <div className={style.Col2row6}><img src={n3} alt="" /></div>
      </div>

      <div className={style.Col3}>
      <div className={style.Col3row1}></div>
      <div className={style.Col3row2}></div>
      <div className={style.Col3row3}></div>
      <div className={style.Col3row4}></div>
      <div className={style.Col3row5}></div>
      </div>

      <div className={style.Col4}>
      <div className={style.Col4row1}></div>
      <div className={style.Col4row1}></div>
      <div className={style.Col4row1}></div>
      <div className={style.Col4row1}></div>
      <div className={style.Col4row1}></div>
      <div className={style.Col4row1}></div>
      </div>
    </div>
    
    </>
  )
};

export default Anime;
