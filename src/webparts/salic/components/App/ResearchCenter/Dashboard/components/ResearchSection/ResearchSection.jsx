import React, { useContext } from 'react';
import './ResearchSection.css';
import MainArticle from './MainArticle/MainArticle';
import SecondaryArticles from './SecondaryArticles/SecondaryArticles';
import { Row, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import EmptySection from '../EmptySection/EmptySection';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../App';



function ResearchSection({sectionTitle, id, data, IsFeature, type}) {
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  const slideLeft = () => {
    var slider = document.getElementById(`slider-${id}`);
    slider.scrollLeft = slider.scrollLeft - 175
  }
  const slideRight = () => {
    var slider = document.getElementById(`slider-${id}`);
    slider.scrollLeft = slider.scrollLeft + 175
  }

  let _mainCard = [];
  let _secondaryCards = [];

  if(data.length > 0 && IsFeature) {
    _mainCard = data?.filter(row => row.IsFeature != null)[0];
    _secondaryCards = data?.filter(row => row?.Id != _mainCard?.Id);
  } else if(data.length > 0 && !IsFeature) {
    _mainCard = data[0];
    _secondaryCards = data?.filter(row => row?.Id != _mainCard?.Id);
  } 
  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={3} style={{lineHeight: 2.5}}>{sectionTitle}</Typography.Title>
        <Typography.Link onClick={() => {
            if(type) {
              navigate(defualt_route + `/research-library/categories/${type}`);
            } else {
              navigate(defualt_route + `/research-library/categories/all`);
            }
          }
        }>
          See All
        </Typography.Link>
      </Row>
      <div className='research-section-container'>
      {
        data?.length !== 0
        ? (
            <>
              <MainArticle articleId={_mainCard?.Id} imgSrc={_mainCard?.AttachmentFiles[0]?.ServerRelativePath?.DecodedUrl} title={_mainCard?.Title} body={_mainCard?.Body} />
              <div className='secondary-articles-container'>
                { _secondaryCards?.length > 3 && <LeftOutlined onClick={slideLeft} className="prev-icon arrow" /> }
                <div id={`slider-${id}`} className='slider'>
                  {_secondaryCards?.map((article, i) => (
                    <SecondaryArticles articleId={article?.Id} key={i} imgSrc={article.AttachmentFiles[0]?.ServerRelativePath?.DecodedUrl} title={article.Title} />
                  ))}
                </div>
                { _secondaryCards?.length > 3 && <RightOutlined onClick={slideRight} className="next-icon arrow" /> }
              </div>
            </>
          )
        : <EmptySection />
      }
      </div>

    </>
  )
}

export default ResearchSection