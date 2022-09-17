import React, { useState, useEffect, useContext } from "react";
import * as ReactDom from 'react-dom';
import './Home.css';
import Header from "../Header/Header";
import UserPanel from '../Global/UserPanel/UserPanel.js';
import HistoryNavigation from "../Global/HistoryNavigation/HistoryNavigation";
import PersonInfo from "../Home/First/Left/PersonInfo/PersonInfo";
import PersonInfoMobile from "../Home/First/Left/PersonInfoMobile/PersonInfoMobile";
import NumbersAttendance from './First/Left/NumbersAttendance/NumbersAttendance';
import NineBoxs from './First/Left/NineBoxs/NineBoxs';
import SalicGlobe from "../Home/First/Right/Globe/Globe";
import ThreeDivisions from './Second/ThreeDivisions';
import TranslateConverterNotes from './Third/TranslateConverterNotes';
import AntdLoader from '../Global/AntdLoader/AntdLoader';

import { AppCtx } from '../App';

function getScrollY() {
  const isScroll = typeof window !== "undefined" && window.scrollY > 0 ? true : false;
  return isScroll;
}


function Home() {

  const { user_data, notifications_count, mail_count, isGlobeReady, setIsGlobeReady } = useContext(AppCtx);
  const [scrollSize, setScrollSize] = useState(getScrollY());
  useEffect(() => {
    window.scrollTo({top: 0, left: 0});
    function handleScrollY() {setScrollSize(getScrollY())}
    window.addEventListener('scroll', handleScrollY);
  }, []);

  // useEffect(() => {
  //   setIsGlobeReady(false)
  // }, [])

  return (
    <>
      { !isGlobeReady && <AntdLoader /> }
      <div className="home-container" style={{display: !isGlobeReady ? 'none' : ''}}>
        <Header style={{width: '100%', position: 'fixed', zIndex: '4', display: !scrollSize ? 'none' : ''}}>
          <UserPanel 
            mobile={user_data.Data?.Mobile}
            mailTo='https://outlook.office.com/owa/'
            mailCount={mail_count}
            notificationsCount={notifications_count}
            userName={user_data.Data?.DisplayName}
            userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
          />
        </Header>
        <div style={{display: !scrollSize ? 'none' : ''}}>
          <HistoryNavigation>
            <p>Home Page</p>
          </HistoryNavigation>
        </div>

        <div className="container">
          <PersonInfo />
          <PersonInfoMobile />
          <div className="home-division">
            <div className="home-info">
              <NumbersAttendance />
              <NineBoxs />
            </div>
            <div className="home-world-graph">
              <SalicGlobe />
            </div>
          </div>
          <ThreeDivisions />
          <TranslateConverterNotes />
        </div>
      </div>
    </>
  )
}

export default Home