import * as React from 'react';
import './App.css';
import { AppProps } from './AppProps';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import SidebarNav from './SidebarNav/SidebarNav';
import AppRoutes from '../Routers/AppRoutes';
import Header from '../App/Header/Header'
import pnp from 'sp-pnp-js';
import { createContext } from "react";
import axios from 'axios';
import GetAllNews from '../API/News/GetAllNews.js'
import GetAllNotes from '../API/Notes/GetAllNotes'
import GetlAllMediaCenter from '../API/MediaCenter/GetlAllMediaCenter'
import SimpleUserPanel from './Global/SimpleUserPanel/SimpleUserPanel';


interface AppContext { }
export const AppCtx = createContext<AppContext | null>(null);

axios.interceptors.response.use(undefined, function (error) {
  if (error.response.status == 401) {
    window.location.href = "https://login.microsoftonline.com/bea1b417-4237-40b8-b020-57fce9abdb43/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&protectedtoken=true&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=6BD443FD3A8DDFC1738926C0D21F4EB11FFDEA1A6718E580%2DB2662F4DC94D606EAAB74E51C261868A3F44BDCD6D2089E5C223B21A97EEFE73&redirect%5Furi=https%3A%2F%2Fsalic%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=ND1UcnVlJjg9MA&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=c8b362a0%2D301e%2D5000%2D31f4%2Dbb228b002ce0&sso_reload=true";
  }
})

const App: React.FunctionComponent<AppProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = React.useState({});
  const [notificationsCount, setNotificationsCount] = React.useState('');
  const [mailCount, setMailCount] = React.useState('');
  const [latestAttendance, setLatestAttendance] = React.useState([]);
  const [communicationList, setCommunicationList] = React.useState([]);
  const [notificationCenterData, setNotificationCenterData] = React.useState([]);
  const [newsList, setNewsList] = React.useState([]);
  const [globeData, setGlobeData] = React.useState([]);
  const [isGlobeReady, setIsGlobeReady] = React.useState(false);
  const [oracleReports, setOracleReports] = React.useState({})
  const [mediaCenter, setMediaCenter] = React.useState({})
  const [notesList, setNotesList] = React.useState([])
  const [eSignRequests, setESignRequests] = React.useState([])
  const [eSignRequestsYouSignedIt, setESignRequestsYouSignedIt] = React.useState([])
  const [departmentsInfo, setDepartmentsInfo] = React.useState([]);
  const [maintenanceData, setMaintenanceData] = React.useState([]);

  // Requests
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
          url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=${user.Email}`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=abdulmohsen.alaiban@salic.com`,
        })
          .then((response) => {
            setUserData(response.data)
            console.log(response.data)
            return response
          })
          // Get Latest Attendance
          .then((response) => {
            axios({
              method: 'POST', url: `https://salicapi.com/api/attendance/Get`,
              data: {
                Email: response.data.Data.Mail,
                Month: new Date().getMonth() + 1,
                Year: new Date().getUTCFullYear(),
                status: -1
              }
            })
              .then((res) => setLatestAttendance(res.data.Data))
              .catch((error) => { console.log(error) })
            return response
          })
          // GetNotifications Count #1
          .then((response) => {
            axios({ method: 'GET', url: `https://salicapi.com/api/Integration/ERPApprovalCount?PIN=${response.data.Data?.PIN}` })
              .then((res) => { setNotificationsCount(res.data.Data) })
              .catch((error) => { console.log(error) })
            return response
          })
          // Get Notifications Count #2
          .then((response) => {
            axios({ method: 'GET', url: `https://salicapi.com/api/Integration/PendingApprovalCount?PIN=${response.data.Data?.Mail}` })
              .then((res) => { setNotificationsCount(prev => prev + res.data.Data) })
              .catch((error) => { console.log(error) })
            return response
          })
          // Get Mail Count
          .then((response) => {
            axios({ method: 'GET', url: `https://salicapi.com/api/User/GetUnReadMessags?UserId=${response.data.Data?.GraphId}` })
              .then((res) => { setMailCount(res.data.Data) })
              .catch((error) => { console.log(error) })
            return response
          })
          //Get eSign Requests
          .then((response) => {
            axios({
              method: 'GET',
              url: `https://salicapi.com/api/signature/MyRequests?Email=${response.data?.Data?.Mail}`,
            }).then(res => {
              const eSignRequestsData = res.data?.Data?.map((row: any, i: number) => {
                const newRow = {
                  Number: `${i + 1}`,
                  Key: row.Key,
                  Id: row.Id,
                  key: i,
                  id: i,
                  Subject: `${row.EmailSubject}__KEY__${row.Key}`,
                  RequestDate: row.Created.replace('T', ' ').slice(0, -1),
                  Recipients: row.NumOfRecipients,
                  IsParallel: row.IsParallel ? 'True' : 'False',
                  HasReminder: row.RemindUsers ? 'True' : 'False',
                  PendingWith: row.PendingWith !== null ? (Array.isArray(JSON.parse(row.PendingWith)) ? JSON.parse(row.PendingWith).map((e: any) => e.Email).join(' - ') : JSON.parse(row.PendingWith).Email) : ' - ',
                  Status: row.Status === "COMPLETED" ? 'Completed' : row.Status === "Draft" ? 'Pending' : null,
                  SignedDocument: row.Status === "COMPLETED" ? `https://salicapi.com/api/Signature/Download?eDocumentId=${row.Id}` : '',
                  PreviewVersion: row.Status === "Draft" ? `https://salicapi.com/api/Signature/DownloadCurrentVersion?eDocumentId=${row.Id}` : '',
                  IsActive: row.IsActive
                }
                return newRow
              })
              setESignRequests(eSignRequestsData)
            }).catch(err => console.log(err))
            return response
          })
          //Get eSign Requests You Signed it
          .then((response) => {
            axios({
              method: 'GET',
              url: `https://salicapi.com/api/signature/AllRequests?Email=${response.data?.Data?.Mail}`,
            }).then(res => {
              const eSignRequestsYouSignedIt = res.data?.Data?.map((row: any, i: number) => {
                const newRow = {
                  Number: `${i + 1}`,
                  Id: row.Id,
                  Key: row.Key,
                  Action: row.Key,
                  SignedDate: row.Created.replace('T', ' ').slice(0, -1),
                  Invitor: row.Status === "COMPLETED" ? 'Completed' : row.Status,
                  Subject: row.Title
                }
                return newRow
              })
              setESignRequestsYouSignedIt(eSignRequestsYouSignedIt)
            }).catch(err => console.log(err))
            return response
          })
          // Get Departments Information for Daily Attendance
          .then((response) => {
            axios({
              method: 'GET',
              url: `https://salicapi.com/api/leave/GetEmployeeByPINALL?UserId=${response.data?.Data?.GraphId}&PIN=${response.data?.Data?.PIN}`,
            })
            .then((res) => setDepartmentsInfo(res.data.Data))
            .catch((error) => { console.log(error) })
            return response
          })

          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))


    // Get Communication List
      axios({ method: 'GET', url: 'https://salicapi.com/api/User/GetCommunicationList' })
      .then((res) => { setCommunicationList(res.data.Data) })
      .catch((error) => { console.log(error) })

    // Get Globe Data 
      axios({
        method: 'GET',
        url: 'https://vasturiano.github.io/react-globe.gl/example/datasets/ne_110m_admin_0_countries.geojson'
      })
      .then(res => {
        setGlobeData(res.data?.features)
      })
      .catch((error) => { console.log(error) })


    // Get All News
      GetAllNews().then((res: any) => setNewsList(res)).catch((err: any) => { console.log(err) });
    // Get All Notes
      GetAllNotes().then((res: any) => setNotesList(res)).catch((err: any) => { console.log(err) });
    // Get All Images for Media Center
      GetlAllMediaCenter().then((res: any) => setMediaCenter(res)).catch((err: any) => { console.log(err) })
    // Get Oracle Reports Data
      axios({
        method: 'GET',
        url: 'https://salicapi.com/api/reports/get?Email=stsadmin@salic.onmicrosoft.com',
      }).then(res => {
        setOracleReports(JSON.parse(res.data.Data))
      })
    // Disable Loader
      .then((response) => { setIsLoading(false) })
      .catch(err => console.log(err))
  }, [])

  // Context Provider
  const AppContextProviderSample: AppContext = {
    user_data: userData,
    notifications_count: notificationsCount,
    mail_count: mailCount,
    latest_attendance: latestAttendance,
    communicationList: communicationList,
    notification_center_data: notificationCenterData,
    setNotificationCenterData,
    news_list: newsList,
    globe_data: globeData,
    isGlobeReady,
    setIsGlobeReady,
    oracle_reports: oracleReports,
    media_center: mediaCenter,
    notes_list: notesList,
    // defualt_route: '/sites/newSalic/_layouts/15/workbench.aspx',
    defualt_route: '/sites/dev/SitePages/Demo.aspx',
    eSign_requests: eSignRequests,
    setESignRequests,
    eSign_requests_you_signed_it: eSignRequestsYouSignedIt,
    departments_info: departmentsInfo,
    maintenance_data: maintenanceData,
    setMaintenanceData
  };

  // Hide SimpleUserPanel in Home
  const [activeRoute, setActiveRoute] = React.useState(window.location.pathname);
  React.useEffect(() => {
    setActiveRoute(window.location.pathname)
    console.log(window.location.pathname)
  }, [window.location.pathname])

  return (
    <AppCtx.Provider value={AppContextProviderSample}>
      {
        !isLoading
          ? <Router>
              <div className="app-container">
                <SidebarNav />
                <div className="content-container">
                  {activeRoute !== '/sites/dev/SitePages/Demo.aspx/home' && <SimpleUserPanel />}
                  {/* <SimpleUserPanel /> */}

                  <img src={require('../../assets/images/world.svg')} className='img-bg' />
                  <Header />
                  <AppRoutes {...props} />
                </div>
              </div>
            </Router>
          : <div className="loader" style={{ minHeight: '100vh' }}>
            <img src={require('../../assets/images/logo.jpg')} alt="salic logo" style={{ maxWidth: '250px', textAlign: 'center' }} />
            <div></div>
          </div>
      }
    </AppCtx.Provider>
  )
}
export default App;
