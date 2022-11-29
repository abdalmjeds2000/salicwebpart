import React, { useContext, useState } from "react";
import './Header.css';
import logo from '../../../assets/images/logo.jpg';
import VisionLogo from '../../../assets/images/2030-vision-logo-dark.svg';
import { useNavigate } from "react-router-dom";
import { AppCtx } from "../App";
import SpSearch from "./Search/SpSearch";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { defualt_route } = useContext(AppCtx)
  const [value, setValue] = useState('');
  const onchangeQuery = (value) => {
    setValue(value);
  }
  return ( 
    <div className="navbar" style={props.style}>

      {/* Header Search INPUT */}
      <div className="sp-search-input">
        <Input.Search
          suffix={<SearchOutlined />} 
          enterButton={false}
          placeholder="Search" 
          style={{borderRadius: '7px', overflow: 'hidden', width: '100%'}}
          onChange={e => {
            (async () => {await onchangeQuery(e.target.value)})() 
          }}
        />
      </div>
      {/* Search Result */}
      <SpSearch query={value} />
      
      {/* SALIC Logo */}
      <img src={logo} alt="logo" className="logoSALIC" onClick={() => navigate(defualt_route+'/home')} />

      {/* 2030 Logo */}
      <img src={VisionLogo} alt='2030 Vision Logo' className="logo_2030" />

      {/* To Put User Panel in header right */}
      {props.children}
      
    </div>
  )
}

export default Navbar