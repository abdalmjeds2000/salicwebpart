import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../../../App';
import ArticleBox from '../../../../Global/ArticleBox/ArticleBox';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import GetArticlesByType from '../../API/GetArticlesByType';


function CategoryPage() {
  const { category } = useParams();
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  
  const FetchData = async () => {
    const response = await GetArticlesByType(category);
    if(response) {
      setData(response)
    }
    setLoading(false);
  }
  useEffect(() => {
    if(category) {
      FetchData();
    }
  }, []);

  const filtered_data = data.filter(row => row.Title?.toLowerCase().includes(textSearch?.toLowerCase()))

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-center')}>Research Library</a>
        <p>{category} Research</p>
      </HistoryNavigation>

      {
        !loading
        ? (
            <div className='standard-page'>
              <Row justify="space-between" align="middle" wrap={true}>
                <Col flex={8}>
                  <Typography.Title level={2} style={{lineHeight: 2.5}}>{category} Research</Typography.Title>
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
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <ArticleBox 
                          key={i}
                          Title={article.Title}
                          Description ={article.Body}
                          Poster={_CardImg}
                          To={`/research-center/${article.Id}`}
                          date={article.Created}
                          customImgStyle={{backgroundSize: 'cover'}}
                        />
                      </Col>
                    )
                  })
                }
              </Row>
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