import React, { useEffect, useState, useContext } from 'react'
import { Col, Divider, Form, Input, message, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import Card from '../components/Card/Card';
import { SPHttpClient } from '@microsoft/sp-http'
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination'
import pnp from 'sp-pnp-js';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';
import FilterPanel from '../components/FilterPanel/FilterPanel';


function KnowledgeCardsPage() {
  const { defualt_route, sp_context } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const _pageSize = 25;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [isFilterData, setIsFilterData] = useState(false);
  const [form] = Form.useForm();


  const FetchData = async (page, pageSize) => {
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;
    const items = await pnp.sp.web.lists.getByTitle('Knowledge Center')
      .items.orderBy("ID", true).orderBy("Created", false)
      .select('AttachmentFiles,*')
      .expand('AttachmentFiles')
      .skip(skipItems).top(takeItems).getPaged();
    // Get Count of List Items
    const itemsCountResponse = await sp_context.spHttpClient.get(
      `${sp_context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Knowledge Center')/ItemCount`,
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

  const ApplyFilter = async (values) => {
    if(values.Title) {
      console.log(values);
      setLoading(true);
      if(values.Title) values.Title = `Title eq '${values.Title}'`;
      Object.keys(values).forEach(key => (values[key] === undefined || values[key] === null || values[key] === '') && delete values[key])

      const items = await pnp.sp.web.lists.getByTitle("Knowledge Center").items
        .filter(Object.values(values).join(' and '))
        .select('Author/Title,AttachmentFiles,*')
        .expand('Author,AttachmentFiles').get()
      if(items.length > 0) {
        setData(items);
        message.success(`Found: ${items.length} item.`)
        setIsFilterData(true);
      } else {
        message.info("No Data Match!");
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchData(1, _pageSize);
  }, []);

  const pageCount = Math.ceil(itemsCount / _pageSize);


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-center')}>Research Library</a>
        <p>Knowledge Center</p>
      </HistoryNavigation>

      
      <div className='standard-page'>
        <div style={{display: 'flex'}}>
          <Form form={form} onFinish={ApplyFilter}>
            <FilterPanel 
              onResetFilter={() => {FetchData(1, _pageSize); setIsFilterData(false); form.resetFields();}} 
              IsShowRemoveFilter={isFilterData}
            >
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">By Title</Divider>
                <Form.Item name="Title"><Input placeholder="Search by Title" size='middle' /></Form.Item>
              </Col>
            </FilterPanel>
          </Form>
          <div style={{width: '100%'}}>
            <Row justify="space-between" align="middle" wrap={true}>
              <Col flex={8}>
                <Typography.Title level={2} style={{lineHeight: 2.5}}>Knowledge Center</Typography.Title>
              </Col>
            </Row>
            {
              !loading
              ? (
                  <Row gutter={[20, 20]}>
                    {
                      data.map((acknowledge, i) => {
                        let _CardImg = '';
                        let _CardDocument = '';
                        acknowledge.AttachmentFiles?.forEach(file => {
                          if(["jpeg", "jpg", "png", "gif", "tiff", "raw", "webp", "avif", "bpg", "flif"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                            _CardImg = file?.ServerRelativePath?.DecodedUrl;
                          } else if(["pdf", "doc", "docx", "html", "htm","xls", "xlsx", "txt", "ppt", "pptx", "ods"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                            _CardDocument = "https://salic.sharepoint.com" + file?.ServerRelativePath?.DecodedUrl;
                          }
                          if(_CardDocument === '' && acknowledge.AttachmentLink != null) _CardDocument = acknowledge.AttachmentLink
                          });
                        return (
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Card 
                              key={i} 
                              imgSrc={_CardImg} 
                              title={acknowledge.Title} 
                              openFile={() => _CardImg.length > 0 ? window.open(_CardDocument) : null} 
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
                limiter={25}
              />
            </Row>}
          </div>
        </div>
      </div>
    </>
  )
}

export default KnowledgeCardsPage