import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../App';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import './NewsDetails.css';



function NewsDetails() {
  let { id } = useParams();
  const { news_list, defualt_route } = useContext(AppCtx);
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNewsData(news_list.filter(n => id == n.Id));
    document.title = `.:: SALIC Gate | ${news_list.filter(n => id == n.Id)[0]?.Subject} ::.`;
  }, [id, news_list])


  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/community-news`)}>Community News</a>
        <p>News Details</p>
      </HistoryNavigation>

      {
        news_list.length > 0
        ? <div className='news-details-page-container'>
            {/* <div className='news-header'>
              <h1>SALIC Community News</h1>
            </div> */}

            <div className='news-details'>
              <div className='image'>
                <img className='news-img' src={newsData[0]?.AttachmentFiles.length > 0 ? newsData[0]?.AttachmentFiles[0]?.ServerRelativeUrl : newsData[0]?.Photos} alt='' />
              </div>
              <div className='content'>
                <h1 className='news-title'>{newsData[0]?.Subject}</h1>
                <time>
                  <FontAwesomeIcon icon={faCalendarDays} /> &nbsp;
                  {new Date(newsData[0]?.CreatedOn).toLocaleString()}
                </time>
                <div className='news-description' dangerouslySetInnerHTML={{__html: newsData[0]?.Description}}></div>
              </div>
            </div>
          </div>
        : <AntdLoader />
      }
    </>
  )
}

export default NewsDetails