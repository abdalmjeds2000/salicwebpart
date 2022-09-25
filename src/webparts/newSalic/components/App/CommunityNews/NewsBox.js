import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../App';
import './NewsBox.css';


function NewsBox(props) {
  const { defualt_route }  = useContext(AppCtx);
  const navigate = useNavigate();

  
  

  return (
    <div className='news-box'>
      {/* <div className="header">
        <img src={props.AuthorImg} alt="" />
        <div>
          <h3>{props.AuthorName}</h3>
          <p>{props.AuthorTitle}</p>
        </div>
      </div> */}
      <div className='img' style={{backgroundImage: `url("${props.Poster}")`}}></div>
      <h2 onClick={() => navigate(`${defualt_route}/community-news/${props.Id}`)}>
        {props.NewTitle}
      </h2>
      <p>{props.NewDescription}</p>
      <a onClick={() => navigate(`${defualt_route}/community-news/${props.Id}`)}>More</a>
    </div>
  )
}


export default NewsBox
