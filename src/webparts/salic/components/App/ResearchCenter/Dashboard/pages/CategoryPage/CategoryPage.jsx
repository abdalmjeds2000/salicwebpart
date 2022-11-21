import React, { useEffect, useState } from 'react'
import './CategoryPage.css';
import { Col, DatePicker, Divider, Form, Input, message, Row, Select, Typography } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../App';
import ArticleBox from '../../../../Global/ArticleBox/ArticleBox';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import moment from 'moment';
import pnp from 'sp-pnp-js';
import { SPHttpClient } from '@microsoft/sp-http'
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination'
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import AntdLoader from '../../../../Global/AntdLoader/AntdLoader';

function CategoryPage() {
  const { defualt_route, sp_context } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const _pageSize = 25;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterData, setIsFilterData] = useState(false);
  const [form] = Form.useForm();


  const FetchChoices = async () => {
      await pnp.sp.web.lists
      .getByTitle("Research Articles")
      .fields.getByInternalNameOrTitle('Tags')
      .select('Choices')
      .get()
      .then((data) => {
        console.log('data', data)
        setTags(data.Choices?.length > 0 ? data.Choices : [])
      })
  }

  const FetchData = async (page, pageSize) => {
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;
    // Get Items
    const items = await pnp.sp.web.lists.getByTitle('Research Articles')
      .items.orderBy("ID", true).orderBy("Created", false)
      .select('Author/Title,AttachmentFiles,*')
      .expand('Author,AttachmentFiles')
      .skip(skipItems).top(takeItems).getPaged();
    // Get Count of List Items
    const itemsCountResponse = await sp_context.spHttpClient.get(
      `${sp_context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Research Articles')/ItemCount`,
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
    FetchChoices();
  }, []);

  const pageCount = Math.ceil(itemsCount / _pageSize);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };


  const ApplyFilter = async (values) => {
    values.Tags = selectedTags;
    if(values.PublishYear) values.PublishYear = new Date(values.PublishYear).toLocaleDateString();
    if(values.Title || values.Type || values.PublishYear || values.Tags.length > 0) {
      const startDate = new Date(new Date(values.PublishYear).getYear()+1900, 0, 1);
      const endDate = new Date(new Date(values.PublishYear).getYear()+1901, 0, 1);
      console.log(values);
      setLoading(true);
      if(values.Title) values.Title = `substringof('${values.Title}',Title)`;
      if(values.Type) values.Type = `ResearchType eq '${values.Type}'`;
      if(values.PublishYear) values.PublishYear = `PublishedDate ge '${startDate.toISOString()}' and PublishedDate le '${endDate.toISOString()}'`;
      // if(values.Tags.length === 0) values.Tags = undefined;
      values.Tags = undefined;

      Object.keys(values).forEach(key => (values[key] === undefined || values[key] === null || values[key] === '') && delete values[key])

      const items = await pnp.sp.web.lists.getByTitle("Research Articles").items
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


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-center')}>Research Library</a>
        <p>Research Articles</p>
      </HistoryNavigation>

      <div className='standard-page'>
        <div style={{display: 'flex'}}>
          <Form form={form} onFinish={ApplyFilter}>
            <FilterPanel 
              onResetFilter={() => {FetchData(1, _pageSize); setIsFilterData(false); form.resetFields(); setSelectedTags([]);}} 
              IsShowRemoveFilter={isFilterData}
            >
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">By Title</Divider>
                <Form.Item name="Title"><Input placeholder="Search by Title" size='middle' /></Form.Item>
              </Col>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">By Type</Divider>
                <Form.Item name="Type">
                  <Select
                    size="middle"
                    allowClear
                    placeholder="Search by Type"
                    style={{width: '100%'}}
                    options={[{value: 'Commodity', label: 'Commodity Research'},{value: 'AdHoc', label: 'Ad Hoc Research'}]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">Select Publish Year</Divider>
                <Form.Item name="PublishYear">
                  <DatePicker size='middle' placeholder='Pick Publish Year' style={{width: '100%'}} picker="year" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">By Tags</Divider>
                {tags?.map((tag) => (
                  <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={(checked) => handleChange(tag, checked)}
                  >
                    {tag}
                  </CheckableTag>
                ))}
              </Col>
            </FilterPanel>
          </Form>
          <div style={{width: '100%'}}>
            <Row justify="space-between" align="middle" wrap={true}>
              <Col flex={8}>
                <Typography.Title level={2} style={{lineHeight: 2.5}}>Research Articles</Typography.Title>
              </Col>
            </Row>
            {
              !loading
              ? (
                  <Row gutter={[20, 20]}>
                    {
                      data?.map((article, i) => {
                        let _CardImg = '';
                        article.AttachmentFiles?.forEach(file => {
                          if(["jpeg", "jpg", "png", "gif", "tiff", "raw", "webp", "avif", "bpg", "flif"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                            _CardImg = file?.ServerRelativePath?.DecodedUrl;
                          }
                          });
                        return (
                          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
                            <ArticleBox 
                              key={i}
                              Title={article.Title}
                              Description ={article.Body}
                              Poster={_CardImg}
                              To={`/research-center/${article.Id}`}
                              date={article.PublishedDate ? moment(article.PublishedDate).format('MM/DD/YYYY') : null}
                              customImgStyle={{backgroundSize: 'cover'}}
                              Tags={article.Tags ? article.Tags : []}
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

export default CategoryPage