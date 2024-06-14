import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { ImYoutube2 } from "react-icons/im";
import style from "./Footer.module.css";



function Footer() {
    return (
      <div className={style.container}>
        <div className={style.footer}>
          <div>
            <img
              src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
              alt="Evangadi Logo"
            />
            <br />
            <div className={style.icons}>
              <div className={style.facebook}>
                <CiFacebook size={40} />
              </div>
              <div className={style.instagram}>
                <FaInstagram size={40} />
              </div>
              <div className={style.youtube}>
                <ImYoutube2 size={40} />
              </div>
            </div>
          </div>
          <div className={style.h3}>
            <h3>Useful Link</h3>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
          <div  className={style.h3}>
            <h3>Contact info</h3>
            <p>suport@evangadi.com</p>
            <p>+1-202-386-2702</p>
          </div>
        </div>
      </div>
    );
}

export default Footer