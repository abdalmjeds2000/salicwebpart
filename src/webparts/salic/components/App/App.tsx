import * as React from 'react';
import './App.css';
import { AppProps } from './AppProps';
import { BrowserRouter as Router } from 'react-router-dom';
import SidebarNav from './SidebarNav/SidebarNav';
import AppRoutes from '../Routers/AppRoutes';
import Header from '../App/Header/Header'
import pnp from 'sp-pnp-js';
import { createContext } from "react";
import axios from 'axios';
import GetPerformance from './Home/First/Left/NumbersAttendance/API/GetPerformance';
import ScrollToTop from './Global/ScrollToTop/ScrollToTop';



interface AppContext {}
export const AppCtx = createContext<AppContext | {}>(null);


axios.interceptors.response.use(undefined, function (error) {
  if (error.response.status == 401) {
    window.location.href = "https://login.microsoftonline.com/bea1b417-4237-40b8-b020-57fce9abdb43/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&protectedtoken=true&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=6BD443FD3A8DDFC1738926C0D21F4EB11FFDEA1A6718E580%2DB2662F4DC94D606EAAB74E51C261868A3F44BDCD6D2089E5C223B21A97EEFE73&redirect%5Furi=https%3A%2F%2Fsalic%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=ND1UcnVlJjg9MA&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=c8b362a0%2D301e%2D5000%2D31f4%2Dbb228b002ce0&sso_reload=true";
  }
})

const App: React.FunctionComponent<AppProps> = (props: any) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData]: any = React.useState({});
  const [notificationsCount, setNotificationsCount]: any = React.useState(0);
  const [notificationsData, setNotificationsData] = React.useState([]);
  const [mailCount, setMailCount] = React.useState('');
  const [latestAttendance, setLatestAttendance] = React.useState([]);
  const [communicationList, setCommunicationList] = React.useState([]);
  const [newsList, setNewsList] = React.useState([]);
  const [globeData, setGlobeData] = React.useState([]);
  const [isGlobeReady, setIsGlobeReady] = React.useState(false);
  const [mediaCenter, setMediaCenter] = React.useState({})
  const [oracleReports, setOracleReports] = React.useState({})
  const [notesList, setNotesList] = React.useState([])
  const [eSignRequests, setESignRequests] = React.useState([])
  const [eSignRequestsYouSignedIt, setESignRequestsYouSignedIt] = React.useState([])
  const [departmentsInfo, setDepartmentsInfo] = React.useState([]);
  const [maintenanceData, setMaintenanceData] = React.useState([]);
  const [performance, setPerformance] = React.useState({});
  const [allEvents, setAllEvents] = React.useState([]);
  const [contentRequestsData, setContentRequestsData] = React.useState([]);
  const [researchRequestsData, setResearchRequestsData] = React.useState([]);
  const [adminAssignedRequests, setAdminAssignedRequests] = React.useState([]);
  const [adminMyRequests, setAdminMyRequests] = React.useState([]);
  const [oracleFormData, setOracleFormData] = React.useState([]);
  const [salicDepartments, setSalicDepartments] = React.useState([]);
  const [myItRequestsData, setMyItRequestsData] = React.useState([]);
  const [itRequestsAssignedForMeData, setItRequestsAssignedForMeData] = React.useState([]);
  const [itCancelledRequests, setitCancelledRequests] = React.useState([]);

  // IT SERVICE REQUEST PAGE DATA
  const [summaryByStatus, setSummaryByStatus] = React.useState([]);
  const [summaryByPriority, setSummaryByPriority] = React.useState([]);
  const [summaryByDepartment, setSummaryByDepartment] = React.useState([]);
  const [summaryByRequestType, setSummaryByRequestType] = React.useState([]);
  const [ITRequests, setITRequests] = React.useState([]);

  const [showSearchResult, setShowSearchResult] = React.useState(false);
  const [researchArticlesData, setResearchArticlesData] = React.useState([]);
  const [researchNewsData, setResearchNewsData] = React.useState([]);
  const [researchPulseData, setResearchPulseData] = React.useState([]);
  const [researchCountriesData, setResearchCountriesData] = React.useState([]);
  const [knowledgeData, setKnowledgeData] = React.useState([]);
  const [gateNewsData, setGateNewsData] = React.useState([]);
  const [allResearchArticlesData, setAllResearchArticlesData] = React.useState([]);
  const [allPulseData, setAllPulseData] = React.useState({});
  const [allKnowledgeData, setAllKnowledgeData] = React.useState([]);
  const [allCountryData, setAllCountryData] = React.useState([]);
  const [salicAssetsData, setSalicAssetsData] = React.useState({});
  const [deliveryLettersData, setDeliveryLettersData] = React.useState({});
  const [myIncidentReports, setMyIncidentReports] = React.useState([]);
  const [assignedIncidentReports, setAssignedIncidentReports] = React.useState([]);
  const [incidentReportsForReview, setIncidentReportsForReview] = React.useState([]);

  const [showWelcomeMessage, setShowWelcomeMessage] = React.useState(true);

  

  React.useEffect(() => {

    if(userData.Data?.Mail !== null) {
      if(userData.Data?.Mail !== "stsadmin@salic.onmicrosoft.com") {
        let element = document.getElementById("spCommandBar");
        if(element) {
          element.style.display = "none";
        }
      }
    }
  }, [userData])



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
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=${user.Email}`,
          url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=abdulmohsen.alaiban@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=Abdullah.Alsuheem@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=Akmal.Eldahdouh@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=Sulaiman.AlRumaih@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=fawaz.aladhyani@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=abdulaziz.alhaqbani@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=Sultan.Bintayyash@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=Fawaz.Aladhyani@salic.com`,
          // url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=sultan.aldawood@salic.com`,
        })
          .then((response) => {
            setUserData(response.data)
            console.log(response.data)
            console.log('CONTEXT =======> ', props)
            return response
          })
          // Get Latest Attendance
          .then((response) => {
            axios({
              method: 'POST', url: `https://salicapi.com/api/attendance/Get`,
              data: {
                Email: response.data?.Data.Mail,
                Month: new Date().getMonth() + 1,
                Year: new Date().getUTCFullYear(),
                status: -1
              }
            })
              .then((res) => setLatestAttendance(res.data?.Data))
              .catch((error) => { console.log(error) })
            return response
          })
          // Get Performance KPI's
          .then(response => {
            GetPerformance(response.data?.Data?.PIN).then((res: any) => setPerformance(res?.data)).catch((err: any) => console.log(err))
            return response
          })
          // Disable Loader
          .then((response) => {setIsLoading(false); return response})




          // GetNotifications Count #1
          // .then((response) => {
          //   axios({ method: 'GET', url: `https://salicapi.com/api/Integration/ERPApprovalCount?PIN=${response.data.Data?.PIN}` })
          //     .then((res) => { setNotificationsCount(res.data?.Data) })
          //     .catch((error) => { console.log(error) })
          //   return response
          // })
          // Get Notifications Count #2
          // .then((response) => {
          //   axios({ method: 'GET', url: `https://salicapi.com/api/Integration/PendingApprovalCount?PIN=${response.data.Data?.Mail}` })
          //     .then((res) => { setNotificationsCount(prev => prev + res.data?.Data) })
          //     .catch((error) => { console.log(error) })
          //   return response
          // })
          // (NEW) Get Notifications Count
          .then((response) => {
            axios({ method: 'GET', url: `https://salicapi.com/api/NotificationCenter/Summary?Email=${response.data.Data?.Mail}` })
              .then((res) => { 
                const sumNotiTypes: any = Object.values(res.data?.Data).reduce((partialSum: any, a: any) => partialSum + a, 0);
                setNotificationsCount(sumNotiTypes); 
              })
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
      .then(res => setGlobeData(res.data?.features))
      .catch((error) => { console.log(error) })


    // Get All News
    pnp.sp.web.lists.getByTitle('News').items.select('Author/Title,Author/EMail,Author/JobTitle,Subject,Photos,Id,ID,IsDraft,Description,CreatedOn,Created,IsPerson,AttachmentFiles').expand('Author,AttachmentFiles').top(500).orderBy("CreatedOn", false).get()
    .then((res: any) => setNewsList(res)).catch((err: any) => { console.log(err) });
    // Get All Notes
    pnp.sp.web.lists.getByTitle('Sticky Notes').items.orderBy("CreateAt", false).top(10).get()
    .then((res: any) => setNotesList(res)).catch((err: any) => { console.log(err) });
    // Get All Images for Media Center
    pnp.sp.web.lists.getByTitle('MediaCenter').renderListDataAsStream({
      ViewXml: `<View Scope="RecursiveAll"><Query><Where><And><In><FieldRef Name="DocIcon"/><Values><Value Type="Computed">jpg</Value><Value Type="Computed">mp4</Value><Value Type="Computed">avi</Value><Value Type="Computed">png</Value><Value Type="Computed">gif</Value><Value Type="Computed">bmp</Value></Values></In><Eq><FieldRef Name="ContentType" /><Value Type="ContentType">Document</Value></Eq></And></Where></Query></View>`
    }).then((res: any) => setMediaCenter(res)).catch((err: any) => { console.log(err) })
    // Get All Events
    pnp.sp.web.lists.getByTitle('Saudi Arabia Events').items.orderBy("Date", false).get()
    .then((res: any) => setAllEvents(res)).catch((err: any) => { console.log(err) })
    // Get Oracle Form Data
    axios({method: "GET", url: "https://salicapi.com/api/Tracking/GetOracleFormData"})
    .then(response => setOracleFormData(response.data.Data))
    .catch(null)

    // Get Gate Departments
    axios({method: "GET", url: "https://salicapi.com/api/user/departments"})
    .then(response => setSalicDepartments(response.data.Data))
    .catch(null)
    
  }, []);







  // Context Provider
  const AppContextProviderSample: AppContext = {
    user_data: userData,
    notifications_count: notificationsCount,
    notifications_data: notificationsData, setNotificationsData,
    mail_count: mailCount,
    latest_attendance: latestAttendance,
    communicationList: communicationList,
    news_list: newsList,
    setNewsList,
    globe_data: globeData,
    isGlobeReady,
    setIsGlobeReady,
    media_center: mediaCenter,
    notes_list: notesList,
    setNotesList,
    defualt_route: props.spWebUrl,
    eSign_requests: eSignRequests,
    setESignRequests,
    eSign_requests_you_signed_it: eSignRequestsYouSignedIt,
    setESignRequestsYouSignedIt,
    departments_info: departmentsInfo,
    maintenance_data: maintenanceData,
    setMaintenanceData,
    performance: performance,
    setPerformance,
    all_events: allEvents,
    content_requests_data: contentRequestsData,
    setContentRequestsData,
    research_requests_data: researchRequestsData,
    setResearchRequestsData,
    admin_assigned_requests: adminAssignedRequests, 
    setAdminAssignedRequests,
    admin_my_requests: adminMyRequests,
    setAdminMyRequests,
    oracle_form_data: oracleFormData,
    salic_departments: salicDepartments,
    my_it_requests_data: myItRequestsData, 
    setMyItRequestsData,
    it_requests_assigned_for_me_data: itRequestsAssignedForMeData,
    setItRequestsAssignedForMeData,
    summaryByStatus: summaryByStatus, 
    setSummaryByStatus, 
    summaryByPriority: summaryByPriority, 
    setSummaryByPriority, 
    summaryByDepartment: summaryByDepartment, 
    setSummaryByDepartment,
    summaryByRequestType: summaryByRequestType, 
    setSummaryByRequestType,
    ITRequests: ITRequests, 
    setITRequests,
    sp_context: props.context,
    it_cancelled_requests: itCancelledRequests, 
    setitCancelledRequests,
    showSearchResult, 
    setShowSearchResult,
    oracleReports, setOracleReports,
    researchArticlesData, setResearchArticlesData,
    researchNewsData, setResearchNewsData,
    researchPulseData, setResearchPulseData,
    researchCountriesData, setResearchCountriesData,
    knowledgeData, setKnowledgeData,
    gateNewsData, setGateNewsData,
    allResearchArticlesData, setAllResearchArticlesData,
    allPulseData, setAllPulseData,
    allKnowledgeData, setAllKnowledgeData,
    allCountryData, setAllCountryData,
    salicAssetsData, setSalicAssetsData,
    deliveryLettersData, setDeliveryLettersData,
    myIncidentReports, setMyIncidentReports,
    assignedIncidentReports, setAssignedIncidentReports,
    incidentReportsForReview, setIncidentReportsForReview,
    showWelcomeMessage, setShowWelcomeMessage,
  };






  let link: any = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = 'https://salicapi.com/File/9244ecd5-d273-4ee9-bffe-2a8fcb140860.png';


  return (
    <React.StrictMode>
      <AppCtx.Provider value={AppContextProviderSample}>
        <div style={{display: isLoading ? 'none' : ''}}>
          <Router>
            <div className="app-container" style={{}}>
              <SidebarNav spWebUrl={props.spWebUrl} />
              <div className="content-container">
                <img src={require('../../assets/images/world.svg')} className='img-bg' />
                <Header />
                <AppRoutes {...props} />

                <ScrollToTop /> {/* Component for scroll to top every change in route */}
              </div>
            </div>
          </Router>
        </div>
        <div className="loader" style={{height: !isLoading ? 0 : null}}>
          <img src={require('../../assets/images/logo.jpg')} alt="salic logo" style={{ maxWidth: '250px', textAlign: 'center' }} />
          <div></div>
        </div>
      </AppCtx.Provider>
    </React.StrictMode>
  )
}
export default App;