import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import "./styles/Contact.css";
const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:work.prateek07@gmail.com" data-cursor="disable">
                work.prateek07@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>Btech in Computer Science and Engineering</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/theprateeksingh07"
              target="_blank"
              data-cursor="disable"
              className="contact-social github-link"
            >
              <div className="glass-logo"><FaGithub /></div>
              <span className="social-text">Github</span>
              <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/prateek-singh-714567261/"
              target="_blank"
              data-cursor="disable"
              className="contact-social linkedin-link"
            >
              <div className="glass-logo"><FaLinkedinIn /></div>
              <span className="social-text">Linkedin</span>
              <MdArrowOutward />
            </a>
            {/* <a
              href="https://x.com/raxx21_official"
              target="_blank"
              data-cursor="disable"
              className="contact-social twitter-link"
            >
              <div className="glass-logo"><FaXTwitter /></div>
              <span className="social-text">Twitter</span>
              <MdArrowOutward />
            </a> */}
            <a
              href="https://www.instagram.com/buildwith_prateek/"
              target="_blank"
              data-cursor="disable"
              className="contact-social instagram-link"
            >
              <div className="glass-logo"><FaInstagram /></div>
              <span className="social-text">Instagram</span>
              <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Prateek Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


