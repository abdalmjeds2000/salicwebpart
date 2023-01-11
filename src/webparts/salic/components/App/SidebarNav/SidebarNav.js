import React, { useState, useEffect, useContext } from "react";
import "./SidebarNav.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import SimpleUserPanel from "../Global/SimpleUserPanel/SimpleUserPanel";
import { CalendarOutlined, CloseOutlined, MenuOutlined, SearchOutlined, TeamOutlined, WarningOutlined } from "@ant-design/icons";
import { svgIcons } from './icons';
import { AppCtx } from "../App";
import pnp from 'sp-pnp-js';
import { MdOpenInNew } from "react-icons/md";




const activeStyle = {
  borderLeft: "4px solid var(--second-color)",
  padding: "6px 12px 6px 8px",
  fontSize: "0.9rem",
};

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
const capitalize = (s) => s[0]?.toUpperCase() + s.slice(1);



const SidebarNav = ({spWebUrl}) => {
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [isNavBarLarge, setIsNavBarLarge] = useState(false);

  const [communicationAdmins, setCommunicationAdmins] = useState([]);
  const [powerBIAdmins, setPowerBIAdmins] = useState([]);


  // read window size
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  useEffect(() => {
    setActiveRoute(location.pathname);
    // change site title based on current location pathname
    const title = location.pathname.split("/");
    document.title = `.:: SALIC Gate | ${capitalize(
      title[title.length - 1]
    ).replace("-", " ")} ::.`;
  }, [location.pathname]);

  
  const antdIconStyle = {
    minWidth: "35px",
    fontSize: isNavBarLarge ? "2.2rem" : "1.7rem"
  };






  /* fetch Communication Admins & PowerBI Admins */
  const fetchCommunicationAdmins = async () => {
    const groupName = 'Communication_Admin';
    const users = await pnp.sp.web.siteGroups.getByName(groupName).users.get();
    setCommunicationAdmins(users);
  }
  const fetchPowerBIAdmins = async () => {
    const groupName = 'HR_Power_BI';
    const users = await pnp.sp.web.siteGroups.getByName(groupName).users.get();
    setPowerBIAdmins(users);
  }

  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      fetchCommunicationAdmins();
      fetchPowerBIAdmins();
    }
  }, [user_data])

  /* Check is Admins */
  let isAdmin = false;
  communicationAdmins.map(user => {
    if(user?.Email?.toLowerCase() === user_data?.Data?.Mail?.toLowerCase()) {
      isAdmin = true;
    }
  });
  let isPowerBIAdmin = false;
  powerBIAdmins.map(user => { 
    if(user?.Email?.toLowerCase() === user_data?.Data?.Mail?.toLowerCase()) {
      isPowerBIAdmin = true;
    }
  });

  const listItems = [
    { to: "/home", icon: svgIcons.home, text: "Home", link: false },
    {
      to: "/community-news",
      icon: svgIcons.news,
      text: "SALIC News",
      link: false,
    },{
      icon: svgIcons.SALICWebsite,
      text: "SALIC Website",
      link: true,
      to: "https://www.salic.com",
    },{
      icon: svgIcons.OracleERP,
      text: "Oracle ERP",
      link: true,
      to: "https://hen.fa.em2.oraclecloud.com/fscmUI/adfAuthentication?level=FORM&success_url=%2FfscmUI%2FadfAuthentication",
    },{
      to: "/oracle-reports",
      icon: svgIcons.OracleReports,
      text: "Oracle Reports",
      link: false,
    },{
      to: "/power-bi-dashboards",
      icon: svgIcons.PowerBi,
      text: "Power Bi",
      link: false,
    },{
      to: "/manage-news-content",
      icon: svgIcons.ManageNewsContent,
      text: "Manage News Content",
      link: false,
    }/* ,{
      to: "/incidents-center",
      icon: <WarningOutlined style={{ ...antdIconStyle }} />,
      text: "Incidents Center",
      link: false,
    } */,{
      to: "/manage-events",
      icon: (<CalendarOutlined style={{ ...antdIconStyle }} />),
      text: "Manage Events",
      link: false,
    },{
      to: "/communication",
      icon: (<TeamOutlined style={{ ...antdIconStyle }} />),
      text: "Communication",
      link: false,
    },{
      icon: svgIcons.SignOut,
      text: "Sign Out",
      link: true,
      to: "https://salic.sharepoint.com/sites/newsalic/_layouts/closeConnection.aspx?loginasanotheruser=true&Source=https://salic.sharepoint.com/sites/newsalic",
    },
  ];

  /* is not admin ? filter sidebar items : return all items */
  let protectedListItems = listItems;
  if(!isAdmin) {
    protectedListItems = protectedListItems.filter(item => !["/manage-events", "/manage-news-content"].includes(item.to))
  }
  if(!isPowerBIAdmin) {
    protectedListItems = protectedListItems.filter(item => !["/power-bi-dashboards"].includes(item.to))
  }




  return (
    <>
      {activeRoute !== `${spWebUrl}/home` && (<SimpleUserPanel />)}
      <nav
        className={ isNavBarLarge ? "nav-container nav-container-large" : "nav-container nav-container-small" }
        style={
          windowSize.innerWidth < 800 && !isNavBarLarge ? { padding: 0 } : {}
        }
      >
        <div className="nav-open" onClick={() => setIsNavBarLarge(!isNavBarLarge)} >
          {isNavBarLarge ? <CloseOutlined /> : <MenuOutlined />}
        </div>

        <ul style={ windowSize.innerWidth < 800 && !isNavBarLarge ? { display: "none" } : {} } >
          {
            protectedListItems
            .map((item, i) => {
              return (
                <li key={i}>
                  <Tooltip placement="right" title={item?.link ? <>{item?.text} <MdOpenInNew /></> : item?.text}>
                    <a
                      onClick={() => {
                        isNavBarLarge ? setIsNavBarLarge(false) : null;
                        if (item?.link) {
                          if (item?.text !== "Sign Out") {
                            window.open(item?.to, "_blank");
                          } else {
                            window.location.href = item?.to;
                          }
                        } else {
                          setActiveRoute(defualt_route + item?.to);
                          navigate(defualt_route + item?.to);
                        }
                      }}
                      style={
                        activeRoute.includes(defualt_route + item?.to)
                          ? activeStyle
                          : { opacity: "0.3" }
                      }
                      className={
                        !isNavBarLarge
                          ? "centered-icons-mobile"
                          : "centered-icons-disktop"
                      }
                    >
                      {item?.icon}
                      {isNavBarLarge && item?.text}
                    </a>
                  </Tooltip>
                </li>
              );
            })
          }
        </ul>
      </nav>
    </>
  );
};

export default SidebarNav;
