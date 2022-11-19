import React, { useContext, useEffect } from 'react';
import './Dashboard.css';
import DashboardHeader from './components/Header/DashboardHeader';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { Col, Row, Spin } from 'antd';
import ResearchSection from './components/ResearchSection/ResearchSection';
import NewsSection from './components/NewsSection/NewsSection';
import PulseSection from './components/PulseSection/PulseSection';
import CountrySection from './components/CountrySection/CountrySection';
import CommodityPrices from './components/CommodityPrices/CommodityPrices';
import KnowledgeSection from './components/KnowledgeSection/KnowledgeSection';
import pnp from 'sp-pnp-js';
import GetResearchArticles from './API/GetResearchArticles';
import GetResearchNews from './API/GetResearchNews';
import GetResearchPulse from './API/GetResearchPulse';
import GetResearchCountries from './API/GetResearchCountries';
import GetResearchKnowledge from './API/GetResearchKnowledge';

import { AppCtx } from '../../App';
import { LoadingOutlined } from '@ant-design/icons';



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
    const responseNews = await GetResearchNews();
    setResearchNewsData(responseNews);
    const responsePulse = await GetResearchPulse();
    setResearchPulseData(responsePulse);
    const responseCountries = await GetResearchCountries();
    setResearchCountriesData(responseCountries);
    const responseKnowledge = await GetResearchKnowledge();
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
                      // category={["Latest"]}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <ResearchSection 
                      data={researchArticlesData.filter(r => r.ResearchType === "Primary" || r.ResearchType === "Secondary")}
                      sectionTitle="Commodity Research" 
                      id="3" 
                      category={["Primary", "Secondary"]}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <ResearchSection 
                      data={researchArticlesData.filter(r => r.ResearchType === "AdHoc")} 
                      sectionTitle="Ad Hoc Research" 
                      id="1"
                      category={["AdHoc"]}
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
            : <div style={{display: 'flex', justifyContent: 'center', margin: 25}}>
                <Spin indicator={<LoadingOutlined spin />} />
              </div>
        }
        
      </div>
    </>
  )
}

export default ResearchDashboard