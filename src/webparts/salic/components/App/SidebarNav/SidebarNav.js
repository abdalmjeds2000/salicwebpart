import React, { useState, useEffect } from "react";
import "./SidebarNav.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import SimpleUserPanel from "../Global/SimpleUserPanel/SimpleUserPanel";
import { CalendarOutlined, CloseOutlined, MenuOutlined, SearchOutlined, WarningOutlined } from "@ant-design/icons";
import { svgIcons } from './icons';
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
  const [isNavBarLarge, setIsNavBarLarge] = useState(false);
  const defualt_route = spWebUrl;
  const navigate = useNavigate();

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


    // remove side bar and change links to old website 
    if(location.pathname.includes("/content-requests")) {
      let sidebar_nav = document.getElementsByClassName("nav-container");
      let salic_logo = document.getElementsByClassName("logoSALIC");
      let notifications_icon = document.getElementById("Iconly_Light_Notification");
      let history_navigation = document.getElementsByClassName("history-navigation");
      let history_home_btn = document.getElementsByClassName("links");
      sidebar_nav[0]?.style.display = "none";
      salic_logo[0]?.addEventListener("click", () => window.location.href = "https://salic.sharepoint.com");
      notifications_icon?.addEventListener("click", () => window.location.href = "https://salic.sharepoint.com/sites/newsalic/SitePages/notifications.aspx");
      history_navigation[0]?.style.width = "100vw";
      history_home_btn[0]?.childNodes[0].style.display = "none";
    }

    // // when page not home setIsGlobeReady true
    // if(location.pathname !== defualt_route+'/home') setIsGlobeReady(true)
  }, [location.pathname]);

  const antdIconStyle = {
    minWidth: "35px",
    fontSize: isNavBarLarge ? "2.2rem" : "1.7rem"
  };



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
    }, /* {
      to: "/performance-managment",
      icon: svgIcons.performance,
      text: "Performance Managment",
      link: false,
    }, */ /* {
      to: "/almira-magazine",
      icon: svgIcons.almira,
      text: "Almira Magazine",
      link: false,
    }, */{
      to: "/incidents-center",
      icon: <WarningOutlined style={{ ...antdIconStyle }} />,
      text: "Incidents Center",
      link: false,
    },/* {
      to: "/content-requests",
      icon: svgIcons.Content,
      text: "New Content",
      link: false,
    }, */{
      to: "/manage-events",
      icon: (
        <CalendarOutlined style={{ ...antdIconStyle }} />
      ),
      text: "Manage Events",
      link: false,
    },/* {
      to: "/sp-search",
      icon: (
        <SearchOutlined
          style={{ ...antdIconStyle }} />
      ),
      text: "Sharepoint Search",
      link: false,
    }, */{
      icon: svgIcons.SignOut,
      text: "Sign Out",
      link: true,
      to: "https://salic.sharepoint.com/sites/newsalic/_layouts/closeConnection.aspx?loginasanotheruser=true&Source=https://salic.sharepoint.com/sites/newsalic",
    },
  ];

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
          {listItems.map((item, i) => {
            return (
              <li key={i}>
                <Tooltip placement="right" title={item.text}>
                  <a
                    onClick={() => {
                      if (item.link) {
                        if (item.text !== "Sign Out") {
                          window.open(item.to, "_blank");
                        } else {
                          window.location.href = item.to;
                        }
                      } else {
                        setActiveRoute(defualt_route + item.to);
                        navigate(defualt_route + item.to);
                      }
                    }}
                    style={
                      activeRoute.includes(defualt_route + item.to)
                        ? activeStyle
                        : { opacity: "0.3" }
                    }
                    className={
                      !isNavBarLarge
                        ? "centered-icons-mobile"
                        : "centered-icons-disktop"
                    }
                  >
                    {item.icon}
                    {isNavBarLarge && item.text}
                  </a>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SidebarNav;
