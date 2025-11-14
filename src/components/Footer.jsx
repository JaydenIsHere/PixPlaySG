import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className='footer my-5 text-center'>
        <Link to="/privacy-policy" className="text-light" style={{ color: "white" }}>
          Privacy Policy
        </Link>

        <h2 className='createdBy text-center text-light mt-3'>
          Created By <span className='brand-name'>PixPlaySG</span> | All Rights Reserved!
        </h2>
      </section>
    </>
  );
}

export default Footer;
