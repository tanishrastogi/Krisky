import style from './footer2.module.css'
import logo from "../../assets/Krisksy.svg";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import klarna from "../../assets/klarna.png"
import visa from "../../assets/visa.png"
import ae from "../../assets/american-express.png"
import masterCard from "../../assets/MC.png"
import paypal from "../../assets/paypal.png"
import RightIcon from "../../assets/RightBox.png"
const Footer2 = () => {
    return (
        <>
            <div className={style.footer2}>
                <div className={style.UpperFooterSection}>
                    <div className={style.UpperFooterSection1}>
                        <div>
                            <h1 className={style.UpperFooterSection1Heading1}>Join our
                            </h1>
                            <h1 className={style.UpperFooterSection1Heading2}>mailing list</h1>
                        </div>
                        <div>
                            <p className={style.UpperFooterSectionContent}>Receive exclusive updates on sales, stories & product launches.</p>
                        </div>
                    </div>
                    <div className={style.UpperFooterSection2}>
                        <div className={style.Email}>
                            <input className={style.inputEmail} type="email" placeholder="Enter your email" />
                        </div>
                        <div className={style.EmailIcon}><img className={style.RightIcon} src={RightIcon} alt="" /></div>
                    </div>
                </div>

                <div className={style.borderContainer}>
                    <div className={style.Border}></div>
                </div>

                <div className={style.MiddleFooterSection}>
                    <div className={style.MiddleFooterSection1}>
                        <div className={style.MiddleFooterSection1content1}>
                            <div className={style.follow}><span>FOLLOW US: X </span><InstagramIcon style={{marginRight:"10px"}}/><FacebookOutlinedIcon/></div>
                            </div>
                        <div className={style.FooterLogo}>
                            <img className={style.Logo} style={{backgroundColor: 'white', padding: '5px'}} src={logo} alt="" />
                        </div>
                    </div>

                    <div className={style.MiddleFooterSection2}>
                        <ul>
                            <li className={style.firstLink}>SHOP</li>
                            <li className={style.Links}>Mens</li>
                            <li className={style.Links}>Womens</li>
                            <li className={style.Links}>Kids</li>
                            <li className={style.Links}>Latest</li>
                        </ul>
                    </div>

                    <div className={style.MiddleFooterSection3}>
                        <ul>
                            <li className={style.firstLink}>HELP</li>
                            <li className={style.Links}>FAQs & Contact</li>
                            <li className={style.Links}>Shipping & Returns</li>
                            <li className={style.Links}>Size Guide</li>
                            <li className={style.Links}>Send Us Your Old Vivos <br />
                                T. +44 (0) 207 048<br />0600</li>
                        </ul>
                    </div>

                    <div className={style.MiddleFooterSection4}>
                        <ul>
                            <li className={style.firstLink}>COMMUNITY</li>
                            <li className={style.Links}>Store Finder</li>
                            <li className={style.Links}>Refer A Friend</li>
                            <li className={style.Links}>Our Repair Service</li>
                        </ul>
                    </div>

                    <div className={style.MiddleFooterSection5}>
                        <ul>
                            <li className={style.firstLink}>COMPANY</li>
                            <li className={style.Links}>Careers</li>
                            <li className={style.Links}>Affiliates</li>
                            <li className={style.Links}>Wholesale</li>
                            <li className={style.Links}>Stakeholder Relations</li>
                            <li className={style.Links}>PR Enquiries</li>
                            <li className={style.Links}>Modern Slavery Statement</li>
                        </ul>
                    </div>
                </div>

                <div className={style.borderContainer}>
                    <div className={style.Border}></div>
                </div>

                <div className={style.LowerFooterSection}>
                    <div className={style.LowerFooterSection1}>
                        <p>© 2023 Vivobarefoot. All rights reserved.</p>
                    </div>

                    <div className={style.LowerFooterSection2}>
                        <ul>
                            <li>Terms of use</li>
                            <li>Privacy policy</li>
                            <li>Cookie settings</li>
                        </ul>
                    </div>

                    <div className={style.LowerFooterSection3}>
                    <img className={style.paymentIcons} src={paypal} alt="" />
                    <img className={style.paymentIcons} src={masterCard} alt="" />
                    <img className={style.paymentIcons} src={visa} alt="" />
                    <img className={style.paymentIcons} src={ae} alt="" />
                    <img className={style.paymentIcons} src={klarna} alt="" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Footer2;