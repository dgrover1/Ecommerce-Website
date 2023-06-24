import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import axios from "axios";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs'
const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env.REACT_APP_API);
      const res = await axios.post(
        `http://localhost:8080/api/v1/subscriber/sub`,
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <Link to="/policy">Privacy Policy</Link>
              </li>
              <li>
                <a href="#">affiliate program</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">shipping</a>
              </li>
              <li>
                <a href="#">returns</a>
              </li>
              <li>
                <a href="#">order status</a>
              </li>
              <li>
                <a href="#">payment options</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Subscribe to get updates</h4>
            <form onClick={handleSubmit}>
              <input
                type="email"
                required
                autoComplete="off"
                placeholder="Email"
                style={{ backgroundColor: 'white', margin: '5px', width: '50%', borderRadius: '5px', fontWeight: '500', padding: '0.5px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              <input type="submit" style={{ backgroundColor: 'cyan', margin: '5px', width: '40%', borderRadius: '15px', fontWeight: '500' }} value="Subscribe" />
            </form>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#">
                <BsFacebook />
              </a>
              <a href="#">
                <BsTwitter />
              </a>
              <a href="#">
                <BsInstagram />
              </a>
              <a href="#">
                <BsLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}
export default Footer;
