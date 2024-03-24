import React from 'react'
import style from "./Contact.module.css"

import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Contact = () => {
    return (
        <>
            <div className={style.Body}>
                <h1 className={style.Heading}>Contact Us</h1>
                <div className={style.UpperBody}>
                    <div className={style.Content1}>We’re here to help you</div>
                    <div className={style.Content2}>Lorem ipsum dolor sit amet consectetur. Fringilla eget est purus in.</div>
                </div>

                <div className={style.LowerBody}>
                    <div className={style.Heading2}>Contact Us</div>
                    <ul>
                        <li><span><MailOutlineIcon /></span><a href="">info@Krisksy.com</a></li>
                        <li>+91-83482 28342</li>
                        <li><a href="">@krisksy</a></li>
                        <li><a href="">@krisksy</a></li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Contact