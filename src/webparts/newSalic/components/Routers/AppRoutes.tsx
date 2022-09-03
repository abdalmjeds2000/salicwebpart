import * as React from 'react';
import { RoutersProps } from './RoutersProps';
import { Routes, Route } from 'react-router-dom';
import Home from '../App/Home/Home.js';
import Communication from '../App/Communication/Communication.js';
import AdminServices from '../App/9Boxs/AdminServices/AdminServices';
import ITServices from '../App/9Boxs/ITServices/ITServices';
import HRSelf from '../App/9Boxs/HRSelf/HRSelf';
import NewITRequest from '../App/9Boxs/ITServices/NewITRequest/NewITRequest';
import RegisterNewAssets from '../App/9Boxs/ITServices/RegisterNewAssets/RegisterNewAssets';
import NotificationCenter from '../App/NotificationCenter/NotificationCenter';
import IssuingVISA from '../App/9Boxs/AdminServices/IssuingVISA/IssuingVISA';
import BusinessGate from '../App/9Boxs/AdminServices/BusinessGate/BusinessGate';
import Maintenance from '../App/9Boxs/AdminServices/Maintenance/Maintenance';
import ShipmentRequest from '../App/9Boxs/AdminServices/ShipmentRequest/ShipmentRequest';
import OfficeSupply from '../App/9Boxs/AdminServices/OfficeSupply/OfficeSupply';
import Transportation from '../App/9Boxs/AdminServices/Transportation/Transportation';
import Visitor from '../App/9Boxs/AdminServices/Visitor/Visitor';
import Attendance from '../App/Attendance/Attendance';
import CommunityNews from '../App/CommunityNews/CommunityNews';
import FolderExplorerPage from '../App/FolderExplorer/FolderExplorer';
import EInvoicing from '../App/9Boxs/EInvoicing/EInvoicing';
import Performance from '../App/9Boxs/Performance/Performance';
import AlMiraMagazine from '../App/AlMiraMagazine/AlMiraMagazine';
import MeetingCenter from '../App/MeetingCenter/MeetingCenter';
import NewMeeting from '../App/MeetingCenter/NewMeeting/NewMeeting';
import MyMeetings from '../App/MeetingCenter/MyMeetings/MyMeetings';
import RoomsCalender from '../App/MeetingCenter/RoomsCalender/RoomsCalender';
import OracleReports from '../App/OracleReports/OracleReports';



const AppRoutes: React.FunctionComponent<RoutersProps> = (props) => {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/dms" element={<FolderExplorerPage {...props}/>} />
      <Route path="/almira-magazine" element={<AlMiraMagazine />} />
      <Route path="/oracle-reports" element={<OracleReports />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/community-news" element={<CommunityNews />} />
      <Route path="/admin-services">
        <Route index element={<AdminServices />} />
        <Route path='/admin-services/issuing-VISA' element={<IssuingVISA />} />
        <Route path='/admin-services/shipment' element={<ShipmentRequest />} />
        <Route path='/admin-services/maintenance' element={<Maintenance />} />
        <Route path='/admin-services/visitor' element={<Visitor />} />
        <Route path='/admin-services/transportation' element={<Transportation />} />
        <Route path='/admin-services/business-gate' element={<BusinessGate />} />
        <Route path='/admin-services/office-supply' element={<OfficeSupply />} />
      </Route>
      <Route path="/it-services">
        <Route index element={<ITServices />} />
        <Route path="/it-services/services-request" element={<NewITRequest />} />
        <Route path="/it-services/new-asset" element={<RegisterNewAssets />} />
      </Route>
      <Route path="/e-invoicing">
        <Route index element={<EInvoicing />} />
      </Route>
      <Route path="/performance-managment">
        <Route index element={<Performance />} />
      </Route>
      <Route path="/hr-self-services" element={<HRSelf />} />
      <Route path="/notification-center" element={<NotificationCenter />} />
      <Route path="/book-meeting-room">
        <Route index element={<MeetingCenter />} />
        <Route path="/book-meeting-room/new-meeting" element={<NewMeeting />} />
        <Route path="/book-meeting-room/my-meetings" element={<MyMeetings />} />
        <Route path="/book-meeting-room/rooms-calender" element={<RoomsCalender />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes