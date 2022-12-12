import researchCenterSearch from './searchQueries/researchCenterSearch';
import newsSearch from './searchQueries/newsSearch';
import news from './searchQueries/news';
import itRequestsSearch from './searchQueries/itRequestsSearch';
import itRequests from './searchQueries/itRequests';
import researchArticlesSearch from './searchQueries/researchArticlesSearch';
import researchArticles from './searchQueries/researchArticles';
import researchCommoditySearch from './searchQueries/researchCommoditySearch';
import researchCommodity from './searchQueries/researchCommodity';
import researchAdHocSearch from './searchQueries/researchAdHocSearch';
import researchAdHoc from './searchQueries/researchAdHoc';
import researchPulseSearch from './searchQueries/researchPulseSearch';
import researchPulse from './searchQueries/researchPulse';
import researchCountrySearch from './searchQueries/researchCountrySearch';
import researchCountry from './searchQueries/researchCountry';
import researchKnowledgeSearch from './searchQueries/researchKnowledgeSearch';
import researchKnowledge from './searchQueries/researchKnowledge';
import researchRequestsSearch from './searchQueries/researchRequestsSearch';
import researchRequests from './searchQueries/researchRequests';
import salicAsstesSearch from './searchQueries/salicAsstesSearch';
import salicAsstes from './searchQueries/salicAsstes';
import deliveryLettersSearch from './searchQueries/deliveryLettersSearch';
import deliveryLetters from './searchQueries/deliveryLetters';



export var searchLocations = [
  /* START Research Routes */
  {
    route: "/research-library",
    path: [],
    fetchData: (query) => researchCenterSearch(query),
    fetchOriginalData: null
  },{
    route: "/research-library/categories/all",
    path: [],
    fetchData: (query) => researchArticlesSearch(query),
    fetchOriginalData: () => researchArticles()
  },{
    route: "/research-library/categories/Commodity",
    path: [],
    fetchData: (query) => researchCommoditySearch(query),
    fetchOriginalData: () =>  researchCommodity()
  },{
    route: "/research-library/categories/AdHoc",
    path: [],
    fetchData: (query) => researchAdHocSearch(query),
    fetchOriginalData: () => researchAdHoc()
  },{
    route: "/research-library/pulse",
    path: [],
    fetchData: (query) => researchPulseSearch(query),
    fetchOriginalData: () => researchPulse()
  },{
    route: "/research-library/country",
    path: [],
    fetchData: (query) => researchCountrySearch(query),
    fetchOriginalData: () => researchCountry()
  },{
    route: "/research-library/knowledge",
    path: [],
    fetchData: (query) => researchKnowledgeSearch(query),
    fetchOriginalData: () => researchKnowledge()
  },{
    route: "/manage-research-library",
    path: [
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research Articles"',
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research News"',
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research Pulse"',
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research Country Outlook"',
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Commodity Prices"',
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Knowledge"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-articles",
    path: [
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research Articles"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-news",
    path: [
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research News"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-pulse",
    path: [
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research Pulse"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-country",
    path: [
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Research Country Outlook"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/commodity-prices",
    path: [
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Commodity Prices"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/knowledge-center",
    path: [
      'path:"https://salic.sharepoint.com/sites/Portal/Lists/Knowledge"',
    ],
    fetchData: null,
  },
  /* END Research Routes */
  


  /* START DMS Routes */
  {
    route: "/dms",
    path: [
      'path:"https://salic.sharepoint.com/sites/newsalic/KSA"',
    ],
    fetchData: null,
  },
  /* END DMS Routes */
  
  {
    route: "/community-news",
    path: [],
    fetchData: (query) => newsSearch(query),
    fetchOriginalData: () => news()
  },{
    route: "/services-requests/service-requests-dashboard#2",
    path: [],
    fetchData: (query) => itRequestsSearch(query),
    fetchOriginalData: () => itRequests()
  },

  {
    route: "/research-requests/all-research-requests",
    path: [],
    fetchData: (query) => researchRequestsSearch(query),
    fetchOriginalData: () => researchRequests()
  },

  {
    route: "/asset/all#2",
    path: [],
    fetchData: (query) => salicAsstesSearch(query),
    fetchOriginalData: () => salicAsstes()
  },{
    route: "/asset/all#3",
    path: [],
    fetchData: (query) => deliveryLettersSearch(query),
    fetchOriginalData: () => deliveryLetters()
  },
];