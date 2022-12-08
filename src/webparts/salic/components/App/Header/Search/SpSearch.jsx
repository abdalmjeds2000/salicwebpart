import React, { useContext, useEffect, useState } from 'react';
import './searchStyle.css';
import { Col, notification, Row, Tooltip, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AppCtx } from '../../App';
import Result from './components/Result';
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';
import { searchLocations } from './searchLocations'
import FileCardRow from '../../Global/FileCard/FileCardRow';
import FileIcon from '../../Global/RequestsComponents/FileIcon';



const SpSearch = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [researchResultData, setResearchResultData] = useState([]);
  const [inAllSp, setInAllSp] = useState(false);
  const { 
    sp_context, 
    showSearchResult, setShowSearchResult,
    setGateNewsData,
    setITRequests,
    setAllResearchArticlesData,
    setAllPulseData,
    setAllCountryData,
    setAllKnowledgeData,
    setResearchRequestsData,
    setSalicAssetsData,
    setDeliveryLettersData
  } = useContext(AppCtx)
  const [currentPage, setCurrentPage] = useState(1);
  const [textQuery, setTextQuery] = useState('');
  const _pageSize = 24;

  const getRoute = () => {
    // let path = document.location.pathname.split(".aspx");
    let path = document.location.href.split(".aspx");
    return path[path.length-1]
  }



  // SEARCH FUNCTION
  const submitQuery = async (SearhcTerm, page, pageSize) => {
    const currentRoute = getRoute();
    const matchRoute = searchLocations.filter(route => currentRoute === route.route)[0];
    // console.log(matchRoute?.path);
    if(matchRoute && matchRoute.path?.length === 0) {
      matchRoute?.fetchData(SearhcTerm)
      .then((response) => {
        console.log('newww seaech response =====> ', response);
        if(matchRoute.route == "/research-library") {
          setResearchResultData(response);
          setShowSearchResult(true);
          setInAllSp(false);
        } else if(matchRoute.route == "/community-news") {
          setGateNewsData(response);
        } else if(matchRoute.route == "/services-requests/service-requests-dashboard#2") {
          const withkeys = response.data?.data?.map(row => {
            row.key = row.Status.replace(/[ ]/g, '_');
            return row;
          });
          setITRequests({data: withkeys, recordsTotal: response.data.recordsTotal});
        } else if(matchRoute.route == "/research-library/categories/all") {
          setAllResearchArticlesData(response);
        } else if(matchRoute.route == "/research-library/categories/Commodity") {
          setAllResearchArticlesData(response);
        } else if(matchRoute.route == "/research-library/categories/AdHoc") {
          setAllResearchArticlesData(response);
        } else if(matchRoute.route == "/research-library/pulse") {
          setAllPulseData(response);
        } else if(matchRoute.route == "/research-library/country") {
          setAllCountryData(response);
        } else if(matchRoute.route == "/research-library/knowledge") {
          setAllKnowledgeData(response);
        } else if(matchRoute.route == "/research-requests/all-research-requests") {
          setResearchRequestsData(response)
        } else if(matchRoute.route == "/asset/all#2") {
          setSalicAssetsData(response);
        } else if(matchRoute.route == "/asset/all#3") {
          setDeliveryLettersData(response);
        }
      })

      
    } else {
      const queryPath = matchRoute ? `& (${matchRoute.path.join(' OR ')})` : '';
      const skipItems = pageSize * (page - 1);
      const takeItems = pageSize;
      setLoading(true);

      const cntxtX = await axios.post(`${sp_context.pageContext.web.absoluteUrl}/_api/contextinfo`);
      const response = await axios({
        method: 'POST',
        url: `${sp_context.pageContext.web.absoluteUrl}/_api/search/postquery`,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": cntxtX.data.FormDigestValue,
        },
        data: JSON.stringify({ 
          'request': { 
            '__metadata': { 'type': 'Microsoft.Office.Server.Search.REST.SearchRequest' },
            //your query text, change values here
            // 'Querytext': SearhcTerm + "& (path:\"https://salic.sharepoint.com/sites/dev/Lists/Research Articles\" OR path:\"https://salic.sharepoint.com/sites/dev/Lists/Knowledge\")",
            'Querytext': SearhcTerm + queryPath,
            RowLimit: takeItems, 
            StartRow: skipItems, 
            SelectProperties: { results: ["Tags", "Body", "Title", "Path", "Size", "IsDocument","DefaultEncodingURL", "FileType", "HitHighlightedSummary", "HitHighlightedProperties", "AuthorOWSUSER", "owstaxidmetadataalltagsinfo", "Created", "UniqueID", "NormSiteID", "NormWebID", "NormListID", "NormUniqueID", "ContentTypeId", "contentclass", "UserName", "JobTitle", "WorkPhone", "SPSiteUrl", "SiteTitle", "CreatedBy", "HtmlFileType", "SiteLogo"] },          
            HitHighlightedProperties:  {
              results: ['Title']
            }
          } 
        }),
      });

      const resposeData = {
        title: '',
        TotalRows: response.data.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates,
        data: response.data.PrimaryQueryResult.RelevantResults.Table.Rows,
      };
      notification.destroy();
      if(resposeData?.data?.length > 0) {
        console.log(resposeData);
        setData([resposeData]);
        setCurrentPage(page);
        setShowSearchResult(true);
        setInAllSp(true);
      } else {
        notification.destroy();
        notification.error({message: 'No Data Match!', placement: 'topRight'});
      }
    }
    
    setLoading(false);
  }

  // REMOVE SEARCH RESULTS
  const returnDefualt = () => {
    const currentRoute = getRoute();
    const matchRoute = searchLocations.filter(route => currentRoute === route.route)[0];
    if(matchRoute && matchRoute.path?.length === 0 && matchRoute?.fetchOriginalData) {
      if(matchRoute.route == "/research-library") {
        setResearchResultData([]);
        setShowSearchResult(false);
      } 
      matchRoute?.fetchOriginalData()
      .then((response) => {
        console.log('OoOoOOoOoOoOoOoOoOOooOOo =====> ', response);
        if(matchRoute.route == "/community-news") {
          setGateNewsData(response);
        } else if(matchRoute.route == "/services-requests/service-requests-dashboard") {
          const withkeys = response.data?.data?.map(row => {
            row.key = row.Status.replace(/[ ]/g, '_');
            return row;
          });
          setITRequests({data: withkeys, recordsTotal: response.data.recordsTotal});
        } else if(matchRoute.route == "/research-library/categories/all") {
          setAllResearchArticlesData(response);
        } else if(matchRoute.route == "/research-library/categories/Commodity") {
          setAllResearchArticlesData(response);
        } else if(matchRoute.route == "/research-library/categories/AdHoc") {
          setAllResearchArticlesData(response);
        } else if(matchRoute.route == "/research-library/pulse") {
          setAllPulseData(response);
        } else if(matchRoute.route == "/research-library/country") {
          setAllCountryData(response);
        } else if(matchRoute.route == "/research-library/knowledge") {
          setAllKnowledgeData(response);
        } else if(matchRoute.route == "/research-requests/all-research-requests") {
          setResearchRequestsData(response)
        } else if(matchRoute.route == "/asset/all#2") {
          setSalicAssetsData(response);
        } else if(matchRoute.route == "/asset/all#3") {
          setDeliveryLettersData(response);
        }
      })
    } else {
      setShowSearchResult(false);
      setData([]);
    }

  }



  const pageCount = Math.ceil(data[0]?.TotalRows / _pageSize);



  const onchangeQuery = (value) => {
    setTextQuery(value);
    if(value.trim().length === 0) {
      returnDefualt();
    } else if(value.trim().length >= 3) { 
      submitQuery(value, 1, _pageSize);
    } else { null }
  }
  useEffect(() => {onchangeQuery(query)}, [query])
  return (
    <>
      
      {/* <div className='sp-search-container' style={{visibility: showSearchResult ? "visible" : "hidden"}}>
        <div> */}
          
          <div className='result-container' style={{width: 'calc(100vw - 50px)', visibility: showSearchResult ? "visible" : "hidden"}}>
              <Tooltip title="Close Search">
                <span 
                  className='closeBtn' 
                  onClick={() => {
                    setShowSearchResult(false);
                    setData([]);
                    setTextQuery('');
                  }}
                >
                  <CloseCircleOutlined />
                </span>
              </Tooltip>
              {
                !loading && inAllSp
                  ? <>
                      <Result data={data} query={textQuery} showTotalRows={true} />
                      {pageCount > 1 && <Pagination
                        currentPage={currentPage}
                        totalPages={pageCount}
                        onChange={(page) => submitQuery(textQuery, page, _pageSize)}
                        limiter={3}
                        hideFirstPageJump
                        hideLastPageJump
                      />}
                    </>
                  : loading ? <AntdLoader /> 
                  : null
              }


              {
                !loading && !inAllSp
                  ? (
                    <div style={{padding: '40px 0 0 0', height: '100%', position: 'relative', overflowX: 'auto'}}>
                      {
                        researchResultData?.map((section, i) => {
                          return (
                            section.data?.length > 0
                            ? (
                              <Row key={i} gutter={[0, 8]} justify="center" style={{maxHeight: 'calc(100vh - 140px)', overflow: 'auto', padding: '5px', marginBottom: '20px'}}>
                                {section.title && <Col span={24}><Typography.Title level={3}>{section.title}</Typography.Title></Col>}
                                <Col span={24} style={{padding: '5px 10px 5px 62px', minWidth: '650px', display: 'flex', alignItems: 'center'}}>
                                  <Typography.Text type='secondary' style={{width: '43.3%'}}>Name</Typography.Text>
                                  <Typography.Text type='secondary' style={{width: '18.4%'}}>Created At</Typography.Text>
                                </Col>
                                {
                                  section.data?.map((row, i) => {
                                    return (
                                      <Col key={i} span={24}>
                                        <FileCardRow
                                          icon={<FileIcon FileType={null} FileName={row.Title} IconWidth={40} />}
                                          name={row.Title}
                                          createdDate={row.Created}
                                          // filePath={Path}
                                        />
                                      </Col>
                                    )
                                  })
                                }
                              </Row>
                            ) : (
                              null
                            )
                          )
                        })
                      }
                    </div>
                  ) : (
                    null
                  )
              }
          </div>
        {/* </div>
      </div> */}
    </>
  )
}

export default SpSearch