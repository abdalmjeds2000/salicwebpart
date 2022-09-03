import * as React from 'react';
import './App.css';
import { AppProps } from './AppProps';
import { BrowserRouter as Router } from 'react-router-dom';
import SidebarNav from './Sidebar Nav/SidebarNav';
import AppRoutes from '../Routers/AppRoutes';
import Header from '../App/Header/Header'
import pnp from 'sp-pnp-js';
import { createContext } from "react";
import axios from 'axios';
import GetAllNews from '../API/News/GetAllNews.js'
import GetlAllMediaCenter from '../API/MediaCenter/GetlAllMediaCenter'


interface AppContext {} 
export const AppCtx = createContext<AppContext | null>(null);


const App: React.FunctionComponent<AppProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true); 
  const [userData, setUserData] = React.useState({});
  const [notificationsCount, setNotificationsCount] = React.useState('');
  const [mailCount, setMailCount] = React.useState('');
  const [latestAttendance, setLatestAttendance] = React.useState([]);
  const [communicationList, setCommunicationList] = React.useState([]);
  const [notificationCenterData, setNotificationCenterData] = React.useState([]);
  const [newsList, setNewsList] = React.useState([]);
  const [globeData, setGlobeData] = React.useState({});
  const [isGlobeReady, setIsGlobeReady] = React.useState(false);
  const [oracleReports, setOracleReports] = React.useState({})
  const [mediaCenter, setMediaCenter] = React.useState({})
  

  React.useEffect(() => {
    // Get Current Login User
      pnp.sp.web.currentUser.get()
      .then(user => {
        return user
      })
    // Get Current User Data
      .then((user) => {
        axios({
          method: 'GET',
          url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=abdulmohsen.alaiban@salic.com`,
        })
        .then((response) => {
          setUserData(response.data)
          return response
        })
        // Get Globe Data 
        .then((response) => {
          axios({
            method: 'GET',
            url: 'https://vasturiano.github.io/react-globe.gl/example/datasets/ne_110m_admin_0_countries.geojson'
          })
          .then(res => setGlobeData(res.data))
          .catch((error) => { console.log(error) })
          return response
        })
        // Disable Loader
        .then((response) => {setIsLoading(false); return response})
        // Get Latest Attendance
        .then((response) => {
          axios({ method: 'POST', url: `https://salicapi.com/api/attendance/Get`, 
            data: {
              Email: response.data.Data.Mail,
              Month: new Date().getMonth()+1,
              Year: new Date().getUTCFullYear(),
              status: -1
            }})
          .then((res) => setLatestAttendance(res.data.Data))
          .catch((error) => { console.log(error) })
          return response
        })
        // GetNotifications Count #1
        .then((response) => {
          axios({ method: 'GET', url: `https://salicapi.com/api/Integration/ERPApprovalCount?PIN=${response.data.Data?.PIN}`})
          .then((res) => { setNotificationsCount(res.data.Data) })
          .catch((error) => { console.log(error) })
          return response
        })
        // Get Notifications Count #2
        .then((response) => {
          axios({ method: 'GET', url: `https://salicapi.com/api/Integration/PendingApprovalCount?PIN=${response.data.Data?.Mail}`})
          .then((res) => { setNotificationsCount(prev => prev + res.data.Data) })
          .catch((error) => { console.log(error) })
          return response
        })
        // Get Mail Count
        .then((response) => {
          axios({ method: 'GET', url: `https://salicapi.com/api/User/GetUnReadMessags?UserId=${response.data.Data?.GraphId}`})
          .then((res) => { setMailCount(res.data.Data) })
          .catch((error) => { console.log(error) })
          return response
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))


    // Get Communication List
      axios({ method: 'GET', url: 'https://salicapi.com/api/User/GetCommunicationList'})
      .then((res) => { setCommunicationList(res.data.Data) })
      .catch((error) => { console.log(error) })
    
    //Get Notification Center Data
      axios({ 
        method: 'GET', 
        url: 'https://salicapi.com/api/notificationcenter/Get?Email=stsadmin@salic.onmicrosoft.com&draw=86&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&search%5Bvalue%5D=&search%5Bregex%5D=false&%24orderby=Created+desc&%24top=1&Type=eSign&Status=Pending%2CApproved%2CRejected&_=1660747052191'
      }).then((res) => { 
        const notifi_data = res.data?.Data?.map((n: any, i: any) => {
          const newRow = {
            key: i,
            id: `${i+1}`,
            subject: <><h3>{n.Title}</h3>{n.BodyPreview}</>,
            dateTime: n.Created.slice(0, -3).replace('T', ' '),
            status: n.Status,
            From: n.From,
            action: <a href="/">View Document</a>
          }
          return newRow
        })
        setNotificationCenterData(notifi_data);
      }).catch(err => console.log(err))
    // Get All News
      GetAllNews().then((res: any) => setNewsList(res)).catch((err: any) => {console.log(err)});
    // Get All Images for Media Center
      GetlAllMediaCenter().then((res: any) => setMediaCenter(res)).catch((err: any) => {console.log(err)})
    // Get Oracle Reports Data
      axios({
        method: 'GET',
        url: 'https://salicapi.com/api/reports/get?Email=stsadmin@salic.onmicrosoft.com',
      }).then(res => {
        setOracleReports(JSON.parse(res.data.Data))
      }).catch(err => console.log(err))
  }, [])


  const toggleGlobeReady = (v: boolean) => {setIsGlobeReady(v)}
  const AppContextProviderSample: AppContext = {
    user_data: userData,
    notifications_count: notificationsCount,
    mail_count: mailCount,
    latest_attendance: latestAttendance,
    communicationList: communicationList,
    notification_center_data: notificationCenterData,
    news_list: newsList,
    globe_data: globeData,
    isGlobeReady,
    toggleGlobeReady,
    oracle_reports: oracleReports,
    media_center: mediaCenter
  };


  return (
    <AppCtx.Provider value={AppContextProviderSample}>
      {
        !isLoading
        ? <Router>
            <div className="app-container">
              <SidebarNav />
              <div className="content-container">
                <Header />
                <AppRoutes {...props} />
              </div>
            </div>
          </Router>
        : <div className="loader">  
            <img src={require('../../assets/images/logo.jpg')} alt="salic logo" style={{maxWidth: '250px', textAlign: 'center'}} />
            <div></div>
          </div>
      }
    </AppCtx.Provider>
  )
}
export default App;
