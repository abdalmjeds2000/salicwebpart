import researchCenterSearch from './searchQueries/researchCenterSearch';
import newsSearch from './searchQueries/newsSearch';
import itRequestsSearch from './searchQueries/itRequestsSearch';

export var searchLocations = [
  /* START Research Routes */
  {
    route: "/research-library",
    path: [],
    fetchData: (query) => researchCenterSearch(query),
  },{
    route: "/research-library/categories/all",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Articles"',
    ],
    fetchData: null,
  },{
    route: "/research-library/categories/Commodity",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Articles"',
    ],
    fetchData: null,
  },{
    route: "/research-library/categories/AdHoc",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Articles"',
    ],
    fetchData: null,
  },{
    route: "/research-library/pulse",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Pulse"',
    ],
    fetchData: null,
  },{
    route: "/research-library/country",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Country Outlook"',
    ],
    fetchData: null,
  },{
    route: "/research-library/knowledge",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Knowledge"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Articles"',
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research News"',
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Pulse"',
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Country Outlook"',
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Commodity Prices"',
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Knowledge"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-articles",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Articles"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-news",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research News"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-pulse",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Pulse"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/research-country",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Research Country Outlook"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/commodity-prices",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Commodity Prices"',
    ],
    fetchData: null,
  },{
    route: "/manage-research-library/knowledge-center",
    path: [
      'path:"https://salic.sharepoint.com/sites/dev/Lists/Knowledge"',
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
  },{
    route: "/services-requests/service-requests-dashboard",
    path: [],
    fetchData: (query) => itRequestsSearch(query),
  },
];