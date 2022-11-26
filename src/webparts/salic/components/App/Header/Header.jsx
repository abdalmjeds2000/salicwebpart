import React, { useContext } from "react";
import './Header.css';
import logo from '../../../assets/images/logo.jpg';
import VisionLogo from '../../../assets/images/2030-vision-logo-dark.svg';
import { useNavigate } from "react-router-dom";
import { AppCtx } from "../App";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { defualt_route } = useContext(AppCtx)

  return ( 
    <div className="navbar" style={props.style}>
      <div className="sp-search-input">
        <Input.Search
          prefix={<SearchOutlined />} 
          enterButton={false}
          placeholder="Search" 
          style={{borderRadius: '7px', overflow: 'hidden', width: '100%'}} 
        />
      </div>
      
      <img src={logo} alt="logo" className="logoSALIC" onClick={() => navigate(defualt_route+'/home')} />
      <img src={VisionLogo} alt='2030 Vision Logo' className="logo_2030" />
      {props.children}
    </div>
  )
}

export default Navbar