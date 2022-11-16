import * as React from 'react';
import { RoutersProps } from './RoutersProps';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../App/Home/Home.js';
import Communication from '../App/Communication/Communication.js';
import AdminServices from '../App/9Boxs/AdminServices/AdminServices';
import HRSelf from '../App/9Boxs/HRSelf/HRSelf';
import ITServices from '../App/9Boxs/ITServices/ITServices';
import NewITRequest from '../App/9Boxs/ITServices/IT/NewITRequest/NewITRequest';
import RegisterNewAssets from '../App/9Boxs/ITServices/Assets/RegisterNewAssets/RegisterNewAssets';
import MyItServiceRequests from '../App/9Boxs/ITServices/IT/MyRequests/MyItServiceRequests';
import ITRequestsAssignedForMe from '../App/9Boxs/ITServices/IT/AssignedForMe/ITRequestsAssignedForMe';
import PreviewITServiceRequest from '../App/9Boxs/ITServices/IT/PreviewRequest/PreviewITServiceRequest';
import ServiceRequestsDashboard from '../App/9Boxs/ITServices/IT/ServiceRequestDashboard/ServiceRequestsDashboard';

import NotificationCenter from '../App/NotificationCenter/NotificationCenter';
import IssuingVISA from '../App/9Boxs/AdminServices/IssuingVISA/IssuingVISA';
import BusinessGate from '../App/9Boxs/AdminServices/BusinessGate/BusinessGate';
import Maintenance from '../App/9Boxs/AdminServices/Maintenance/Maintenance';
import ShipmentRequest from '../App/9Boxs/AdminServices/ShipmentRequest/ShipmentRequest';
import OfficeSupply from '../App/9Boxs/AdminServices/OfficeSupply/OfficeSupply';
import Transportation from '../App/9Boxs/AdminServices/Transportation/Transportation';
import AssignedRequests from '../App/9Boxs/AdminServices/AssignedRequests/AssignedRequests';
import MyRequests from '../App/9Boxs/AdminServices/MyRequests/MyRequests';

import Visitor from '../App/9Boxs/AdminServices/Visitor/Visitor';
import Attendance from '../App/Attendance/Attendance';
import CommunityNews from '../App/CommunityNews/CommunityNews';
import NewsDetails from '../App/CommunityNews/NewsDetails/NewsDetails';
import FolderExplorerPage from '../App/9Boxs/DMS/FolderExplorer';
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
import PowerBIInteractiveDashboards from '../App/PowerBI/PowerBIInteractiveDashboards';

import HumanCapital from '../App/PowerBI/HumanCapital/HumanCapital';
import HRDashboard from '../App/PowerBI/HumanCapital/HRDashboard/HRDashboard';
import EmployeeAnalyticsDashboard from '../App/PowerBI/HumanCapital/EmployeeAnalyticsDashboard/EmployeeAnalyticsDashboard';


import Research from '../App/PowerBI/Research/Research';
import CountryOutlook from '../App/PowerBI/Research/CountryOutlook/CountryOutlook'
import DelegationVisit from '../App/PowerBI/Research/DelegationVisit/DelegationVisit'
import CrisisPlan from '../App/PowerBI/Research/CrisisPlan/CrisisPlan'
import DemandForecast from '../App/PowerBI/Research/DemandForecast/DemandForecast'
import DomesticPrices from '../App/PowerBI/Research/DomesticPrices/DomesticPrices'
import InternationalPrices from '../App/PowerBI/Research/InternationalPrices/InternationalPrices'
import DailyDashboard from '../App/PowerBI/Research/DailyDashboard/DailyDashboard'


import ContentRequests from '../App/ContentRequests/ContentRequests';
import NewContentRequest from '../App/ContentRequests/NewRequest/NewContentRequest';
import AllContentRequests from '../App/ContentRequests/AllRequests/AllContentRequests';
import MyContentRequests from '../App/ContentRequests/MyRequests/MyContentRequests';
import PreviewContentRequest from '../App/ContentRequests/PreviewRequest/PreviewContentRequest';

import ResearchRequests from '../App/ResearchRequests/ResearchRequests';
import NewResearchRequest from '../App/ResearchRequests/NewResearchRequest/NewResearchRequest';
import MyResearchRequests from '../App/ResearchRequests/MyRequests/MyResearchRequests';
import AllResearchRequests from '../App/ResearchRequests/AllRequests/AllResearchRequests';
import PreviewResearchRequest from '../App/ResearchRequests/PreviewRequest/PreviewResearchRequest';
import ArticlePage from '../App/ResearchCenter/Dashboard/components/ArticlePage/ArticlePage';

import ManageDashboardData from '../App/ResearchCenter/Dashboard/components/ManageDashboardData/ManageDashboardData';
import ResearchArticles from '../App/ResearchCenter/Dashboard/components/ManageDashboardData/Iframes/ResearchArticles';
import ResearchNews from '../App/ResearchCenter/Dashboard/components/ManageDashboardData/Iframes/ResearchNews';
import ResearchCountry from '../App/ResearchCenter/Dashboard/components/ManageDashboardData/Iframes/ResearchCountry';
import ResearchPulse from '../App/ResearchCenter/Dashboard/components/ManageDashboardData/Iframes/ResearchPulse';
import CommodityPrices from '../App/ResearchCenter/Dashboard/components/ManageDashboardData/Iframes/CommodityPrices';


import ManageNewsContent from '../App/ManageNewsContent/ManageNewsContent';

import MediaCenter from '../App/MediaCenter/MediaCenter';
import ManageEvents from '../App/ManageEvents/ManageEvents';

import SPSearch from '../App/SearchPage/SPSearch';

import CorporateObjectiveKPIs from '../App/CorporateObjectiveKPIs/CorporateObjectiveKPIs';

import ResearchDashboard from '../App/ResearchCenter/Dashboard/ResearchDashboard';
import CategoryPage from '../App/ResearchCenter/Dashboard/components/CategoryPage/CategoryPage';
import PulseSection from '../App/ResearchCenter/Dashboard/components/CardsPage/PulseCardsPage';
import CountryCardsPage from '../App/ResearchCenter/Dashboard/components/CardsPage/CountryCardsPage';
import KnowledgeCardsPage from '../App/ResearchCenter/Dashboard/components/CardsPage/KnowledgeCardsPage';


const AppRoutes: React.FunctionComponent<RoutersProps> = (props) => {
  const defualtRoute: string = props.spWebUrl;
  return (
    <Routes>
      <Route path={`${defualtRoute}/home`} element={<Home />} />
      <Route path={`${defualtRoute}`} element={<Navigate replace to={`${defualtRoute}/home`}/>} />
      <Route path={"/sites/dev"} element={<Navigate replace to={`${defualtRoute}/home`}/>} />
      <Route path={"/sites/dev/_layouts/15/workbench.aspx"} element={<Navigate to={`${defualtRoute}/home`}/>} />
      <Route path={`${defualtRoute}/communication`} element={<Communication />} />
      <Route path={`${defualtRoute}/dms`} element={<FolderExplorerPage {...props}/>} />
      <Route path={`${defualtRoute}/almira-magazine`} element={<AlMiraMagazine />} />
      <Route path={`${defualtRoute}/oracle-reports`} element={<OracleReports />} />
      <Route path={`${defualtRoute}/attendance`} element={<Attendance />} />

      <Route path={`${defualtRoute}/community-news`}>
        <Route index element={<CommunityNews />} />
        <Route path={`${defualtRoute}/community-news/:id`} element={<NewsDetails />} />
      </Route>

      <Route path={`${defualtRoute}/admin-services`}>
        <Route index element={<AdminServices />} />
        <Route path={`${defualtRoute}/admin-services/issuing-VISA`}>
          <Route index element={<IssuingVISA />} />
          <Route path={`${defualtRoute}/admin-services/issuing-VISA/:id`} element={<IssuingVISA />} />
        </Route>
        <Route path={`${defualtRoute}/admin-services/shipment`}>
          <Route index element={<ShipmentRequest />} />
          <Route path={`${defualtRoute}/admin-services/shipment/:id`} element={<ShipmentRequest />} />
        </Route>
        <Route path={`${defualtRoute}/admin-services/maintenance`}>
          <Route index element={<Maintenance />} />
          <Route path={`${defualtRoute}/admin-services/maintenance/:id`} element={<Maintenance />} />
        </Route>
        <Route path={`${defualtRoute}/admin-services/visitor`}>
          <Route index element={<Visitor />} />
          <Route path={`${defualtRoute}/admin-services/visitor/:id`} element={<Visitor />} />
        </Route>
        <Route path={`${defualtRoute}/admin-services/transportation`}>
          <Route index element={<Transportation />} />
          <Route path={`${defualtRoute}/admin-services/transportation/:id`} element={<Transportation />} />
        </Route>
        <Route path={`${defualtRoute}/admin-services/business-gate`}>
          <Route index element={<BusinessGate />} />
          <Route path={`${defualtRoute}/admin-services/business-gate/:id`} element={<BusinessGate />} />
        </Route>
        <Route path={`${defualtRoute}/admin-services/office-supply`}>
          <Route index element={<OfficeSupply />} />
          <Route path={`${defualtRoute}/admin-services/office-supply/:id`} element={<OfficeSupply />} />
        </Route>
        <Route path={`${defualtRoute}/admin-services/assigned-requests`} element={<AssignedRequests />} />
        <Route path={`${defualtRoute}/admin-services/my-requests`} element={<MyRequests />} />
      </Route>
      
      <Route path={`${defualtRoute}/it-services`}>
        <Route index element={<ITServices />} />
        <Route path={`${defualtRoute}/it-services/services-request`} element={<NewITRequest />} />
        <Route path={`${defualtRoute}/it-services/new-asset`} element={<RegisterNewAssets />} />
        <Route path={`${defualtRoute}/it-services/my-requests`} element={<MyItServiceRequests />} />
        <Route path={`${defualtRoute}/it-services/requests-assigned-for-me`}>
          <Route index element={<ITRequestsAssignedForMe />} />
          <Route path={`${defualtRoute}/it-services/requests-assigned-for-me/:query`} element={<ITRequestsAssignedForMe />} />
        </Route>
        <Route path={`${defualtRoute}/it-services/service-requests-dashboard`} element={<ServiceRequestsDashboard />} />
        <Route path={`${defualtRoute}/it-services/:id`} element={<PreviewITServiceRequest />} />
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
      
      <Route path={`${defualtRoute}/research-center`}>
        <Route index element={<ResearchDashboard />} />
        <Route path={`${defualtRoute}/research-center/country`} element={<CountryCardsPage />} />
        <Route path={`${defualtRoute}/research-center/pulse`} element={<PulseSection />} />
        <Route path={`${defualtRoute}/research-center/knowledge`} element={<KnowledgeCardsPage />} />
        <Route path={`${defualtRoute}/research-center/categories/:category`} element={<CategoryPage />} />
        <Route path={`${defualtRoute}/research-center/:id`} element={<ArticlePage />} />
      </Route>

      <Route path={`${defualtRoute}/org-doc-investment`} element={<Investment />} />
      <Route path={`${defualtRoute}/org-doc-finance`} element={<Finance />} />
      <Route path={`${defualtRoute}/org-doc-corporate-services`} element={<CorporateServices />} />
      <Route path={`${defualtRoute}/org-doc-legal`} element={<Legal />} />
      <Route path={`${defualtRoute}/org-doc-risk-strategy`} element={<RiskStrategy />} />
      <Route path={`${defualtRoute}/org-doc-corporate-communication`} element={<CorporateCommunication />} />


      <Route path={`${defualtRoute}/power-bi-dashboards`}>
        <Route index element={<PowerBIInteractiveDashboards />} />

        <Route path={`${defualtRoute}/power-bi-dashboards/human-capital`}>
          <Route index element={<HumanCapital />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/human-capital/hr-dashboard`} element={<HRDashboard />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/human-capital/employee-analytics-dashboard`} element={<EmployeeAnalyticsDashboard />} />
        </Route>
        <Route path={`${defualtRoute}/power-bi-dashboards/research`}>
          <Route index element={<Research />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/research/country-outlook`} element={<CountryOutlook />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/research/delegation-visit`} element={<DelegationVisit />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/research/crisis-plan`} element={<CrisisPlan />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/research/demand-forecast`} element={<DemandForecast />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/research/domestic-prices`} element={<DomesticPrices />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/research/international-prices`} element={<InternationalPrices />} />
          <Route path={`${defualtRoute}/power-bi-dashboards/research/daily-dashboard`} element={<DailyDashboard />} />
        </Route>
      </Route>

      <Route path={`${defualtRoute}/content-requests`}>
        <Route index element={<ContentRequests />} />
        <Route path={`${defualtRoute}/content-requests/new-request`} element={<NewContentRequest />} />
        <Route path={`${defualtRoute}/content-requests/all-content-requests`} element={<AllContentRequests />} />
        <Route path={`${defualtRoute}/content-requests/my-content-requests`} element={<MyContentRequests />} />
        <Route path={`${defualtRoute}/content-requests/:id`} element={<PreviewContentRequest />} />
      </Route>

      <Route path={`${defualtRoute}/research-requests`}>
        <Route index element={<ResearchRequests />} />
        <Route path={`${defualtRoute}/research-requests/new-request`} element={<NewResearchRequest />} />
        <Route path={`${defualtRoute}/research-requests/all-research-requests`} element={<AllResearchRequests />} />
        <Route path={`${defualtRoute}/research-requests/my-research-requests`} element={<MyResearchRequests />} />
        <Route path={`${defualtRoute}/research-requests/:id`} element={<PreviewResearchRequest />} />
      </Route>

      <Route path={`${defualtRoute}/manage-research-library`}>
        <Route index element={<ManageDashboardData />} />
        <Route path={`${defualtRoute}/manage-research-library/research-articles`} element={<ResearchArticles />} />
        <Route path={`${defualtRoute}/manage-research-library/research-news`} element={<ResearchNews />} />
        <Route path={`${defualtRoute}/manage-research-library/research-pulse`} element={<ResearchPulse />} />
        <Route path={`${defualtRoute}/manage-research-library/research-country`} element={<ResearchCountry />} />
        <Route path={`${defualtRoute}/manage-research-library/commodity-prices`} element={<CommodityPrices />} />
      </Route>
      
      <Route path={`${defualtRoute}/manage-news-content`} element={<ManageNewsContent />} />

      <Route path={`${defualtRoute}/media-center`} element={<MediaCenter />} />
      <Route path={`${defualtRoute}/manage-events`} element={<ManageEvents />} />
      <Route path={`${defualtRoute}/sp-search`} element={<SPSearch />} />
      <Route path={`${defualtRoute}/corporate-objective`} element={<CorporateObjectiveKPIs />} />

      
    </Routes>
  );
}
export default AppRoutes