import * as React from 'react';
import { RoutersProps } from './RoutersProps';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import ESignatureTool from '../App/9Boxs/ESignatureTool/ESignatureTool';

import Investment from '../App/6Boxs/Investment/Investment';
import Finance from '../App/6Boxs/Finance/Finance';
import CorporateServices from '../App/6Boxs/CorporateServices/CorporateServices';
import Legal from '../App/6Boxs/Legal/Legal';
import RiskStrategy from '../App/6Boxs/RiskStrategy/RiskStrategy';
import CorporateCommunication from '../App/6Boxs/CorporateCommunication/CorporateCommunication';



const AppRoutes: React.FunctionComponent<RoutersProps> = (props) => {
  const defualtRoute: string = '/sites/newSalic/_layouts/15/workbench.aspx';
  return (
    <Routes>
      <Route path={`${defualtRoute}/home`} element={<Home />} />
      <Route path={`${defualtRoute}`} element={<Navigate replace to={`${defualtRoute}/home`}/>} />
      <Route path={`${defualtRoute}/communication`} element={<Communication />} />
      <Route path={`${defualtRoute}/dms`} element={<FolderExplorerPage {...props}/>} />
      <Route path={`${defualtRoute}/almira-magazine`} element={<AlMiraMagazine />} />
      <Route path={`${defualtRoute}/oracle-reports`} element={<OracleReports />} />
      <Route path={`${defualtRoute}/attendance`} element={<Attendance />} />
      <Route path={`${defualtRoute}/community-news`} element={<CommunityNews />} />
      <Route path={`${defualtRoute}/admin-services`}>
        <Route index element={<AdminServices />} />
        <Route path={`${defualtRoute}/admin-services/issuing-VISA`} element={<IssuingVISA />} />
        <Route path={`${defualtRoute}/admin-services/shipment`} element={<ShipmentRequest />} />
        <Route path={`${defualtRoute}/admin-services/maintenance`} element={<Maintenance />} />
        <Route path={`${defualtRoute}/admin-services/visitor`} element={<Visitor />} />
        <Route path={`${defualtRoute}/admin-services/transportation`} element={<Transportation />} />
        <Route path={`${defualtRoute}/admin-services/business-gate`} element={<BusinessGate />} />
        <Route path={`${defualtRoute}/admin-services/office-supply`} element={<OfficeSupply />} />
      </Route>
      <Route path={`${defualtRoute}/it-services`}>
        <Route index element={<ITServices />} />
        <Route path={`${defualtRoute}/it-services/services-request`} element={<NewITRequest />} />
        <Route path={`${defualtRoute}/it-services/new-asset`} element={<RegisterNewAssets />} />
      </Route>
      <Route path={`${defualtRoute}/e-invoicing`}>
        <Route index element={<EInvoicing />} />
      </Route>
      <Route path={`${defualtRoute}/performance-managment`}>
        <Route index element={<Performance />} />
      </Route>
      <Route path={`${defualtRoute}/hr-self-services`} element={<HRSelf />} />
      <Route path={`${defualtRoute}/notification-center`} element={<NotificationCenter />} />
      <Route path={`${defualtRoute}/book-meeting-room`}>
        <Route index element={<MeetingCenter />} />
        <Route path={`${defualtRoute}/book-meeting-room/new-meeting`} element={<NewMeeting />} />
        <Route path={`${defualtRoute}/book-meeting-room/my-meetings`} element={<MyMeetings />} />
        <Route path={`${defualtRoute}/book-meeting-room/rooms-calender`} element={<RoomsCalender />} />
      </Route>
      <Route path={`${defualtRoute}/eSignature-document`} element={<ESignatureTool />} />

      <Route path={`${defualtRoute}/org-doc-investment`} element={<Investment />} />
      <Route path={`${defualtRoute}/org-doc-finance`} element={<Finance />} />
      <Route path={`${defualtRoute}/org-doc-corporate-services`} element={<CorporateServices />} />
      <Route path={`${defualtRoute}/org-doc-legal`} element={<Legal />} />
      <Route path={`${defualtRoute}/org-doc-risk-strategy`} element={<RiskStrategy />} />
      <Route path={`${defualtRoute}/org-doc-corporate-communication`} element={<CorporateCommunication />} />

    </Routes>
  );
}
export default AppRoutes