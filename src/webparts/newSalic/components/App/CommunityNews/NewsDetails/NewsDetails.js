import React, { useContext, useEffect, useState } from 'react';
import './NewsDetails.css';
import { AppCtx } from '../../App';
import { NavLink, useParams } from 'react-router-dom';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../../Global/SimpleUserPanel/SimpleUserPanel';
import WorldBG from '../../../../assets/images/world.svg';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'



function NewsDetails() {
  let { id } = useParams();
  const { news_list, user_data, notifications_count, mail_count, defualt_route } = useContext(AppCtx);
  const [newsData, setNewsData] = useState([]);
  
  useEffect(() => {

    setNewsData(news_list.filter(n => id == n.Id))
  }, [id, news_list])
  
  return (
    <>
      <img src={WorldBG} className='bg-img-world' />
      <HistoryNavigation>
        <NavLink to={`${defualt_route}/community-news`}>Community News</NavLink>
        <p>News Details</p>
      </HistoryNavigation>
      <SimpleUserPanel
        userImage={`https://salic.shareposint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
        userName={user_data.Data?.DisplayName}
        notificationsCount={notifications_count}
        mailCount={mail_count}
      />
      {
        news_list.length > 0
        ? <div className='news-details-page-container'>
            <div className='news-header'>
              <h1>SALIC Community News</h1>
            </div>

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