import style from './footer.module.css'
import clsx from 'clsx';
import facebook from './SupportedImage/facebook_logo.png'
import insta from './SupportedImage/insta_logo.png'
import tiktok from './SupportedImage/tiktok_logo.png'
import youtube from './SupportedImage/youtube.png'
function Footer(){

    return(
      <div className={style.container}>
        <div className={clsx(style.Policy, style.item)}>
            <div className={style.label}>Policy</div>
            <div className={style.content}>
              <div></div>
            </div>
        </div>

        <div className={clsx(style.CustomerService, style.item)}>
          <div className={style.label}>Service</div>
          <div className={style.content}>
            <div>Hotline: 0123456789<br></br>Email: abc@gmail.com</div>
          </div>
        </div>

        <div className={clsx(style.Contact, style.item)}>
          <div className={style.label}>Contact</div>
          <div className={style.content}>
            <div>
              <img src={facebook} alt=''></img>
              <img src={insta} alt=''></img>
              <img src={tiktok} alt=''></img>
              <img src={youtube} alt=''></img>
            </div>
          </div>
        </div>

        <div className={clsx(style.AboutUs, style.item)}>
          <div className={style.label}>About us</div>
          <div className={style.content}>
            <div></div>
          </div>
        </div>
      </div>
    )
}
export default Footer;