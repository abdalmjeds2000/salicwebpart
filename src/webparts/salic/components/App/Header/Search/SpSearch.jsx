import React, { useContext, useEffect, useState } from 'react';
import './searchStyle.css';
import { notification, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AppCtx } from '../../App';
import Result from './components/Result';
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';
import { searchLocations } from './searchLocations'



const SpSearch = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { sp_context, showSearchResult, setShowSearchResult } = useContext(AppCtx);
  const [currentPage, setCurrentPage] = useState(1);
  const [textQuery, setTextQuery] = useState('');
  const _pageSize = 24;

  const getRoute = () => {
    let path = document.location.pathname.split(".aspx");
    return path[path.length-1]
  }

  const submitQuery = async (SearhcTerm, page, pageSize) => {
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;
    setLoading(true);
    const currentRoute = getRoute();
    const matchRoute = searchLocations.filter(route => currentRoute === route.route)[0];
    const queryPath = matchRoute ? `& (${matchRoute.path.join(' OR ')})` : '';

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
          SelectProperties: { results: ["Title", "Path", "Size", "IsDocument","DefaultEncodingURL", "FileType", "HitHighlightedSummary", "HitHighlightedProperties", "AuthorOWSUSER", "owstaxidmetadataalltagsinfo", "Created", "UniqueID", "NormSiteID", "NormWebID", "NormListID", "NormUniqueID", "ContentTypeId", "contentclass", "UserName", "JobTitle", "WorkPhone", "SPSiteUrl", "SiteTitle", "CreatedBy", "HtmlFileType", "SiteLogo"] }
        } 
      }),
    });

    const resposeData = response.data.PrimaryQueryResult.RelevantResults;
    notification.destroy();
    if(resposeData.Table.Rows.length > 0) {
      console.log(resposeData);
      setData(resposeData);
      setCurrentPage(page);
      setShowSearchResult(true);
    } else {
      notification.error({message: 'No Data Match!', placement: 'topRight'});
    }
    setLoading(false);
  }
  const pageCount = Math.ceil(data.TotalRows / _pageSize);



  const onchangeQuery = (value) => {
    setTextQuery(value);
    if(value.trim().length === 0) {
      setShowSearchResult(false);
      setData({});
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
                    setData({});
                    setTextQuery('');
                  }}
                >
                  <CloseCircleOutlined />
                </span>
              </Tooltip>
              {
                !loading && data.Table?.Rows?.length > 0 
                  ? <>
                      <Result data={data.Table.Rows} totalItems={data.TotalRowsIncludingDuplicates} query={textQuery} />
                      {pageCount > 1 && <Pagination
                        currentPage={currentPage}
                        totalPages={pageCount}
                        onChange={(page) => submitQuery(textQuery, page, _pageSize)}
                        limiter={5}
                        hideFirstPageJump
                        hideLastPageJump
                      />}
                    </>
                  : loading ? <AntdLoader /> 
                  : null
              }
          </div>
        {/* </div>
      </div> */}
    </>
  )
}

export default SpSearch