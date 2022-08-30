import React from 'react';
import './NewsBox.css';


function NewsBox(props) {
  return (
    <div className='news-box'>
      <div className="header">
        <img src={props.AuthorImg} alt="" />
        <div>
          <h3>{props.AuthorName}</h3>
          <p>{props.AuthorTitle}</p>
        </div>
      </div>
      <h2>{props.NewTitle}</h2>
      <p>{props.NewDescription}</p>
      <a href="/">More</a>
    </div>
  )
}


export default NewsBox
