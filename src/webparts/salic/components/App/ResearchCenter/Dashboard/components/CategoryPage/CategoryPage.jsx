import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin, Typography } from 'antd';
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



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-center')}>Research Center</a>
        <p>{category} Research</p>
      </HistoryNavigation>

      {
        !loading
        ? (
            <div className='standard-page'>
              <Typography.Title level={2} style={{lineHeight: 2.5}}>{category} Research</Typography.Title>
              <Row gutter={[20, 20]}>
                {
                  data.map((article, i) => {
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
        : <div style={{display: 'flex', justifyContent: 'center', margin: 25}}>
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
      }
      
    </>
  )
}

export default CategoryPage