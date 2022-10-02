import React, { useContext, useEffect, useState } from 'react';
import './CommunityNews.css';
import NewsBox from './NewsBox';
import { AppCtx } from '../App';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { Pagination } from 'antd';


const getDataByPageNo = (list, pno) => {
  if(list.length >= 19 && pno === 1) return list.slice(0, 20)
  else if(list.length >= 39 && pno === 2) return list.slice(20, 40)
  else if(list.length >= 59 && pno === 3) return list.slice(40, 60)
  else if(list.length >= 79 && pno === 4) return list.slice(60, 80)
  else if(list.length >= 99 && pno === 5) return list.slice(80, 100)
}
function CommunityNews() {
  const { news_list } = useContext(AppCtx);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNewslist, setFilteredNewslist] = useState([]);
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    const FilterNewsDraft = news_list?.filter(news => news.IsDraft === false).slice(0, 100);
    setNewsList(FilterNewsDraft);
    setFilteredNewslist(getDataByPageNo(FilterNewsDraft, currentPage));
  }, [news_list])
  
  return (
    <div className='community-news-page-container'>
      <HistoryNavigation>
        <p>Community News</p>
      </HistoryNavigation>

      <h1>Community News</h1>
      <div className='news-boxs'>
        {filteredNewslist?.map((box, i) => {
          return (
            <NewsBox 
              key={i}
              AuthorImg={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${box.Author?.EMail}`}
              AuthorName={box.Author?.Title}
              AuthorTitle={box.Author?.JobTitle}
              NewTitle={box.Subject}
              NewDescription ={box.Description?.replace(/<[^>]*>?/gm, '').replace(/&(nbsp|amp|quot|lt|gt);/g, "")}
              Poster={box.AttachmentFiles[0]?.ServerRelativeUrl}
              Id={box.Id}
            />
          )
        })}
      </div>


      <div style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: '0'}}>
        <Pagination 
          current={currentPage} 
          onChange={p => {
            setCurrentPage(p)
            setFilteredNewslist(getDataByPageNo(newsList, p))
          }}
          total={newsList.length / 2}
        />
      </div>
    </div>
  )
}

export default CommunityNews