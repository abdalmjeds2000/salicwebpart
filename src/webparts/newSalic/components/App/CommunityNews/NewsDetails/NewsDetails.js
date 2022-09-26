import React, { useContext, useEffect, useState } from 'react';
import './NewsDetails.css';
import { AppCtx } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'



function NewsDetails() {
  let { id } = useParams();
  const { news_list, defualt_route } = useContext(AppCtx);
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNewsData(news_list.filter(n => id == n.Id));
    document.title = news_list.filter(n => id == n.Id)[0]?.Subject;
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
                <img className='news-img' src={newsData[0]?.AttachmentFiles[0]?.ServerRelativeUrl} alt='' />
              </div>
              <div className='content'>
                <h1 className='news-title'>{newsData[0]?.Subject}</h1>
                <time>
                  <FontAwesomeIcon icon={faCalendarDays} /> &nbsp;
                  {newsData[0]?.CreatedOn.replace('T', ' ').slice(0, -1)}
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