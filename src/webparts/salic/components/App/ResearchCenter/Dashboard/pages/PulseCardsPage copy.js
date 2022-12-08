import React, { useEffect, useState, useContext } from 'react'
import { Button, Col, Input, message, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import Card from '../components/Card/Card';
import { SPHttpClient } from '@microsoft/sp-http'
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination'
import pnp from 'sp-pnp-js';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';


function PulseCardsPage() {
  const { defualt_route, sp_context, allPulseData, setAllPulseData } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const _pageSize = 24;
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsCount, setItemsCount] = useState(0);
  const [isFilterData, setIsFilterData] = useState(false);

  const [data, setData] = useState(true);

  const FetchData = async (page, pageSize) => {
    // const skipItems = pageSize * (page - 1);
    // const takeItems = pageSize;
    
    axios({
      method: 'GET',
      url: `https://salic.sharepoint.com/sites/dev/_api/web/lists/GetByTitle('Research Pulse')/items?$top=${_pageSize}`,
      headers: {"Accept": "application/json; odata=verbose"}
    }).then((response) => {
      console.log(response);
      setData(response.data?.d);
    }).catch(err => console.log(err));




    // const items = await pnp.sp.web.lists.getByTitle('Research Pulse')
    //   .items/* .orderBy("ID", true).orderBy("Created", false) */
    //   .select('AttachmentFiles,*')
    //   .expand('AttachmentFiles')
    //   .skip(skipItems)
    //   .top(takeItems)
    //   .get().then(res => {
    //     console.log(res);
    //     if(res?.length > 0) {
    //       setAllPulseData(res);
    //     }
    //   })
    // Get Count of List Items
    // const itemsCountResponse = await sp_context.spHttpClient.get(
    //   `${sp_context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Research Pulse')/ItemCount`,
    //   SPHttpClient.configurations.v1 
    // );
    // const itemsCountValue = (await itemsCountResponse.json()).value;
    // setItemsCount(itemsCountValue);

    setLoading(false);
  }
  useEffect(() => { FetchData(1, _pageSize); }, []);



  const FetchNextData = (url) => {
    axios({
      method: 'GET',
      url: url,
      headers: {"Accept": "application/json; odata=verbose"}
    }).then((response) => {
      console.log(response);
      setData(response.data?.d);
    }).catch(err => console.log(err));
  }
  // const pageCount = Math.ceil(itemsCount / _pageSize);

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-library')}>Research Library</a>
        <p>Pulse</p>
      </HistoryNavigation>

      
      <div className='standard-page'>
        <div style={{display: 'flex'}}>
          <div style={{width: '100%'}}>
            <Row justify="space-between" align="middle" wrap={true}>
              <Col span={24}>
                <Typography.Title level={2} style={{lineHeight: 2.5}}>Pulse</Typography.Title>
              </Col>
            </Row>
            {
              !loading
              ? (
                <Row gutter={[20, 20]}>
                  {/* {
                    allPulseData.map((pulse, i) => {
                      let _CardImg = '';
                      let _CardDocument = '';
                      pulse.AttachmentFiles?.forEach(file => {
                        if(["jpeg", "jpg", "png", "gif", "tiff", "raw", "webp", "avif", "bpg", "flif"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                          _CardImg = file?.ServerRelativePath?.DecodedUrl;
                        } else if(["pdf", "doc", "docx", "html", "htm","xls", "xlsx", "txt", "ppt", "pptx", "ods"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                          _CardDocument = "https://salic.sharepoint.com" + file?.ServerRelativePath?.DecodedUrl;
                        }
                        if(_CardDocument === '' && pulse.AttachmentLink != null) _CardDocument = pulse.AttachmentLink
                      });
                      return (
                        <Col xs={24} sm={12} md={8} lg={6}>
                          <Card 
                            key={i} 
                            imgSrc={_CardImg} 
                            title={pulse.Title} 
                            openFile={() => _CardImg.length > 0 ? window.open(_CardDocument) : null} 
                            contentStyle={{background: 'linear-gradient(0deg,rgba(0,0,0,.80),transparent 80%)'}}
                          />
                        </Col>
                      )
                    })
                  } */}
                </Row>
              )
              : <AntdLoader />
            }


            <Row justify="center">
              <Col span={24}>
                <Button onClick={() => FetchNextData(data?.__next)}><PlusSquareOutlined /> Next</Button>
              </Col>
            </Row>
            {/* {!isFilterData && !loading && <Row justify="center" style={{marginTop: 35}}>
              <Pagination
                currentPage={currentPage}
                totalPages={pageCount}
                onChange={(page) => FetchData(page, _pageSize)}
                limiter={3}
              />
            </Row>} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PulseCardsPage