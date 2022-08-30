import React from "react";
import './Header.css';
import logo from '../../../assets/images/logo.jpg';
import VisionLogo from '../../../assets/images/2030-vision-logo-dark.svg';

const Navbar = (props) => {
  return ( 
    <div className="navbar" style={props.style}>
      <img src={logo} alt="logo" className="logoSALIC" />
      <img src={VisionLogo} alt='2030 Vision Logo' className="logo_2030" />
      {props.children}
    </div>
  )
}

export default Navbar