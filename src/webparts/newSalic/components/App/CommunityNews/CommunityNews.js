import React, { useContext, useState } from 'react';
import './CommunityNews.css';
import NewsBox from './NewsBox';
import DefualtPerson from '../../../assets/defualt-person.png';
import WorldBG from '../../../assets/images/world.svg';
import { AppCtx } from '../App';
import DefualtUserIcon from '../../../assets/images/default-profile-icon.svg'
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../Global/SimpleUserPanel/SimpleUserPanel';

function CommunityNews() {
  const { news_list, user_data, notifications_count, mail_count } = useContext(AppCtx);

  return (
    <div className='community-news-page-container'>
      <img src={WorldBG} className='bg-img-world' />
      <HistoryNavigation>
        <p>Community News</p>
      </HistoryNavigation>
      <SimpleUserPanel
        userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
        userName={user_data.Data?.DisplayName}
        notificationsCount={notifications_count}
        mailCount={mail_count}
      />
      <h1>Community News</h1>
      <div className='news-boxs'>
        {news_list.map((box, i) => {
          return (
            <NewsBox 
              key={i}
              AuthorImg={box.Photos !== null ? box.Photos : DefualtUserIcon}
              AuthorName={box.Author.Title}
              AuthorTitle='HR Manager'
              NewTitle={box.Subject}
              NewDescription ={box.Description.replace(/<[^>]*>?/gm, '').replace(/&(nbsp|amp|quot|lt|gt);/g, "")}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CommunityNews