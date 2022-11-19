import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Input, Pagination, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../../../App';
import ArticleBox from '../../../../Global/ArticleBox/ArticleBox';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import GetArticlesByType from '../../API/GetArticlesByType';
import moment from 'moment';


function CategoryPage() {
  const { category } = useParams();
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [textSearch, setTextSearch] = useState("");

  const pageSize = 25;
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const FetchData = async () => {
    const response = await GetArticlesByType(category?.split(","));
    if(response) {
      setData(response);
      setMinIndex(0);
      setMaxIndex(pageSize);
    }
    setLoading(false);
  }
  useEffect(() => {
    if(category) {
      FetchData();
    }
  }, []);


  const filtered_data = data.filter(row => row.Title?.toLowerCase().includes(textSearch?.toLowerCase()));


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-center')}>Research Library</a>
        <p>{category.replace(',', ', ')} Research</p>
      </HistoryNavigation>

      {
        !loading
        ? (
            <div className='standard-page'>
              <Row justify="space-between" align="middle" wrap={true}>
                <Col flex={8}>
                  <Typography.Title level={2} style={{lineHeight: 2.5}}>{category.replace(',', ', ')} Research</Typography.Title>
                </Col>
                <Col flex={1}>
                  <Input placeholder="Type To Search" style={{width: '100%'}} value={textSearch} onChange={e => setTextSearch(e.target.value)} prefix={<SearchOutlined />} />
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                {
                  filtered_data.map((article, i) => {
                    let _CardImg = '';
                    article.AttachmentFiles?.forEach(file => {
                      if(["jpeg", "jpg", "png", "gif", "tiff", "raw", "webp", "avif", "bpg", "flif"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                        _CardImg = file?.ServerRelativePath?.DecodedUrl;
                      }
                      });
                    return (
                      i >= minIndex &&
                      i < maxIndex &&
                      <Col xs={24} sm={12} md={8} lg={6}>
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
              {
                filtered_data.length > pageSize
                ? (
                    <Row justify="center">
                      <Pagination
                        pageSize={pageSize}
                        current={current}
                        total={filtered_data.length}
                        onChange={(page) => {
                          setCurrent(page),
                          setMinIndex((page - 1) * pageSize),
                          setMaxIndex(page * pageSize)
                        }}
                        style={{ margin: "15px auto" }}
                      />
                    </Row>
                  )
                : null
              }
              
            </div>
          )
        : <div style={{display: 'flex', justifyContent: 'center', margin: '100px 25px 25px 25px'}}>
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
      }
      
    </>
  )
}

export default CategoryPage