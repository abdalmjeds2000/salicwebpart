import React, { useContext, useEffect } from 'react';
import './Dashboard.css';
import DashboardHeader from './components/Header/DashboardHeader';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { Col, Row } from 'antd';
import ResearchSection from './components/ResearchSection/ResearchSection';
import NewsSection from './components/NewsSection/NewsSection';
import PulseSection from './components/PulseSection/PulseSection';
import CountrySection from './components/CountrySection/CountrySection';
import CommodityPrices from './components/CommodityPrices/CommodityPrices';
import KnowledgeSection from './components/KnowledgeSection/KnowledgeSection';
import pnp from 'sp-pnp-js';
import { AppCtx } from '../../App';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';



function ResearchDashboard() {
  const { user_data } = useContext(AppCtx)
  const [loading, setLoading] = React.useState(true);
  const [researchArticlesData, setResearchArticlesData] = React.useState([]);
  const [researchNewsData, setResearchNewsData] = React.useState([]);
  const [researchPulseData, setResearchPulseData] = React.useState([]);
  const [researchCountriesData, setResearchCountriesData] = React.useState([]);
  const [knowledgeData, setKnowledgeData] = React.useState([]);
  

  const FetchData = async () => {
    const responseArticles = await pnp.sp.web.lists.getByTitle('Research Articles').items.orderBy("Created_x0020_Date", false).select('AttachmentFiles,*').top(50).expand('AttachmentFiles').get();
    setResearchArticlesData(responseArticles);
    const responseNews = await pnp.sp.web.lists.getByTitle('Research News').items.orderBy("Created_x0020_Date", false).top(25).get();
    setResearchNewsData(responseNews);
    const responsePulse = await pnp.sp.web.lists.getByTitle('Research Pulse').items.orderBy("Created_x0020_Date", false).select('AttachmentFiles,*').expand('AttachmentFiles').top(25).get();
    setResearchPulseData(responsePulse);
    const responseCountries = await pnp.sp.web.lists.getByTitle('Research Country Outlook').items.orderBy("Created_x0020_Date", false).select('AttachmentFiles,*').expand('AttachmentFiles').top(25).get();
    setResearchCountriesData(responseCountries);
    const responseKnowledge = await pnp.sp.web.lists.getByTitle('Knowledge Center').items.orderBy("Created_x0020_Date", false).select('AttachmentFiles,*').expand('AttachmentFiles').top(25).get();
    setKnowledgeData(responseKnowledge);
    
    setLoading(false);
  }
  useEffect(() => {
    if(Object.keys(user_data).length > 0 && researchArticlesData.length === 0) {
      FetchData();
    }
  }, [user_data]);


  return (
    <>
      <HistoryNavigation>
        <p>Research Library</p>
      </HistoryNavigation>
      <DashboardHeader />

      <div className='research-center_dashboard-container'>
        {
          !loading
          ? (
              <div>
                <Row gutter={[30, 30]}>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <ResearchSection 
                      data={researchArticlesData} 
                      sectionTitle="Latest Research" 
                      id="2" 
                      IsFeature={false}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <ResearchSection 
                      data={researchArticlesData.filter(r => r.ResearchType === "Commodity")}
                      sectionTitle="Commodity Research" 
                      id="3" 
                      IsFeature={true}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <ResearchSection 
                      data={researchArticlesData.filter(r => r.ResearchType === "AdHoc")} 
                      sectionTitle="Ad Hoc Research" 
                      id="1"
                      IsFeature={true}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={14}>
                    <NewsSection data={researchNewsData} sectionTitle="Weekly News" />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={5}>
                    <PulseSection data={researchPulseData} sectionTitle="Pulse" />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={5}>
                    <CountrySection data={researchCountriesData} sectionTitle="Country Outlook" />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <KnowledgeSection 
                      data={knowledgeData} 
                      sectionTitle="Knowledge Center" 
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <CommodityPrices />
                  </Col>
                </Row>
              </div>
            )
            : <AntdLoader />
        }
        
      </div>
    </>
  )
}

export default ResearchDashboard