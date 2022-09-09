import React, { useContext, useState } from 'react';
import './CommunityNews.css';
import NewsBox from './NewsBox';
import WorldBG from '../../../assets/images/world.svg';
import { AppCtx } from '../App';
import DefualtUserIcon from '../../../assets/images/default-profile-icon.svg'
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../Global/SimpleUserPanel/SimpleUserPanel';
import { Pagination } from 'antd';


const getDataByPageNo = (list, pno) => {
  if(list.length >= 9 && pno === 1) return list.slice(0, 10)
  else if(list.length >= 19 && pno === 2) return list.slice(10, 20)
  else if(list.length >= 29 && pno === 3) return list.slice(20, 30)
  else if(list.length >= 39 && pno === 4) return list.slice(30, 40)
  else if(list.length >= 49 && pno === 5) return list.slice(40, 50)
  else if(list.length >= 59 && pno === 6) return list.slice(50, 60)
  else if(list.length >= 69 && pno === 7) return list.slice(60, 70)
  else if(list.length >= 79 && pno === 8) return list.slice(70, 80)
  else if(list.length >= 89 && pno === 9) return list.slice(80, 90)
  else if(list.length >= 99 && pno === 10) return list.slice(90, 100)
  
}

function CommunityNews() {
  const { news_list, user_data, notifications_count, mail_count } = useContext(AppCtx);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNewslist, setFilteredNewslist] = useState(getDataByPageNo(news_list, currentPage));

  
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
        {filteredNewslist.map((box, i) => {
          return (
            <NewsBox 
              key={i}
              AuthorImg={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${box.Author?.EMail}`}
              AuthorName={box.Author?.Title}
              AuthorTitle={box.Author?.JobTitle}
              NewTitle={box.Subject}
              NewDescription ={box.Description?.replace(/<[^>]*>?/gm, '').replace(/&(nbsp|amp|quot|lt|gt);/g, "")}
            />
          )
        })}
      </div>


      <div style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: '0'}}>
        <Pagination current={currentPage} onChange={p => {
          setCurrentPage(p)
          setFilteredNewslist(getDataByPageNo(news_list, p))
          }} total={news_list.length} />
      </div>
    </div>
  )
}

export default CommunityNews