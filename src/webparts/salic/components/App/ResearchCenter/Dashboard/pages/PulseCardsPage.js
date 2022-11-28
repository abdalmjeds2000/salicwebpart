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
import { SearchOutlined } from '@ant-design/icons';


function PulseCardsPage() {
  const { defualt_route, sp_context } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const _pageSize = 24;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [isFilterData, setIsFilterData] = useState(false);


  const FetchData = async (page, pageSize) => {
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;
    const items = await pnp.sp.web.lists.getByTitle('Research Pulse')
      .items.orderBy("ID", true).orderBy("Created", false)
      .select('AttachmentFiles,*')
      .expand('AttachmentFiles')
      .skip(skipItems).top(takeItems).getPaged();
    // Get Count of List Items
    const itemsCountResponse = await sp_context.spHttpClient.get(
      `${sp_context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Research Pulse')/ItemCount`,
      SPHttpClient.configurations.v1 
    );
    const itemsCountValue = (await itemsCountResponse.json()).value;

    if(items.results?.length > 0) {
      setData(items.results);
      setCurrentPage(page);
      setItemsCount(itemsCountValue);
    }
    setLoading(false);
  }

  useEffect(() => {
      FetchData(1, _pageSize);
  }, []);


  const ApplyFilter = async (values) => {
    setLoading(true);
    if(values.Title || values.Type || values.PublishYear || values.Tags.length > 0) {
      let filterList = [];
      if(values.Title.length > 0) filterList.push(`<Contains><FieldRef Name='Title' /><Value Type='Text'>${values.Title}</Value></Contains>`);
      Object.keys(values).forEach(key => (values[key] === undefined || values[key] === null || values[key] === '') && delete values[key])
      const q = {
        ViewXml: `<View Scope='RecursiveAll'>
          <Query>
            <Where>
              ${filterList.map((_, i) => i != 0 ? '<And>' : '')}
              ${filterList.map((filter, i) => i != 0 ? filter+'</And>' : filter)}
            </Where>
            <OrderBy>
              <FieldRef Name='Created' Ascending='False' />
            </OrderBy>
          </Query>
          <RowLimit>50</RowLimit>
        </View>`
      }
      const items = await pnp.sp.web.lists.getByTitle("Research Pulse")
      .getItemsByCAMLQuery(q, 'AttachmentFiles')
      .then(responseData => {
        if(responseData.length > 0) {
          setData(responseData);
          setIsFilterData(true);
        } else {
          message.info("No Data Match!");
        }
      })
    }
    setLoading(false);
  }


  const pageCount = Math.ceil(itemsCount / _pageSize);

  
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
              <Col span={24} style={{maxWidth: '65%', margin: '0 auto', display: 'flex', alignItems: 'center'}}>
                <Input 
                  placeholder="Search by Title ( Min 3 Character)" 
                  size='large' 
                  addonBefore={<SearchOutlined />} 
                  onChange={e => {
                    e.target.value?.length >= 3 
                    ? (async () => {await ApplyFilter({Title: e.target.value})})() 
                    : null
                  }}
                />
                {isFilterData && <Button type="primary" size='large' danger onClick={() => {setIsFilterData(false); FetchData(1, _pageSize);} }>Remove Filter</Button>}
              </Col>
              <Col span={24}>
                <Typography.Title level={2} style={{lineHeight: 2.5}}>Pulse</Typography.Title>
              </Col>
            </Row>
            {
              !loading
              ? (
                <Row gutter={[20, 20]}>
                  {
                    data.map((pulse, i) => {
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
                  }
                </Row>
              )
              : <AntdLoader />
            }
            {!isFilterData && !loading && <Row justify="center" style={{marginTop: 35}}>
              <Pagination
                currentPage={currentPage}
                totalPages={pageCount}
                onChange={(page) => FetchData(page, _pageSize)}
                limiter={24}
              />
            </Row>}
          </div>
        </div>
      </div>
    </>
  )
}

export default PulseCardsPage