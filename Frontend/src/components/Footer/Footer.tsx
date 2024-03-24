import style from "./Footer.module.css";

import customerSupportIcon from "../../assets/customerSupport-icon.png"
import fbIcon from "../../assets/fb-icon.png"
import igIcon from "../../assets/ig-icon.png"
import ptIcon from "../../assets/pt-icon.png"
import verifiedIcon from "../../assets/verified-icon.png"
import replacementIcon from "../../assets/replacement-icon.png"
import ytIcon from "../../assets/yt-icon.png"


const Footer = () => {
  return (
    <>
    <div className={style.Footer}>
      <div className={style.footerTop}>
        <div className={style.section1}>
          <img className={style.footerTopIcons} src={customerSupportIcon} />
          <p className={style.content}>Prompt & Friendly Customer Support</p>
        </div>
        <div className={style.section2}>
          <img className={style.footerTopIcons} src={verifiedIcon} />
          <p className={style.content}>100% Safe. Shop with Confident</p>
        </div>
        <div className={style.section3}>
          <img className={style.footerTopIcons} src={replacementIcon} />
          <p className={style.content}>Hassle-Free Replacement</p>
        </div>
      </div>
      <div className={style.footerBottom}>
        <div className={style.section4}>
          <p className={style.content2}>
            Lorem ipsum dolor sit amet consectetur. Sed dolor netus sed vitae
            convallis ullamcorper. Sapien quisque vitae fermentum neque eget at.
            Tempor sit nisl nulla amet morbi turpis.
          </p>
          <p className={style.content3}>
            For order related queries & bulk orders, email - support@Krisksy.com
          </p>
        </div>
        <div className={style.section5}>
          <ul>
            <li>Popular Shoes</li>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
            <li>Product 4</li>
            <li>Product 5</li>
            <li>Product 6</li>
            <li>Product 7</li>
          </ul>
        </div>
        <div className={style.section6}>
          <ul>
            <li>SUPPORT</li>
            <li>Track Your Order</li>
            <li>Shipping & Return Policy</li>
            <li>FAQs</li>
            <li>About Us</li>
            <li>Contact Support</li>
          </ul>
        </div>
        <div className={style.section7}>
          <p>CONNECT WITH US</p>
          <div>
            <img className={style.section7icons} src={igIcon} />
            <img className={style.section7icons} src={ytIcon} />
            <img className={style.section7icons} src={fbIcon} />
            <img className={style.section7icons} src={ptIcon} />
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Footer;
