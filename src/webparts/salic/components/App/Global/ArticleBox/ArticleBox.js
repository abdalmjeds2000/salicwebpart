import { CalendarOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';
import './ArticleBox.css';
import moment from 'moment';

function ArticleBox(props) {
  const { defualt_route }  = useContext(AppCtx);
  const navigate = useNavigate();

  
  

  return (
    <div className='news-box'>
      <div className='img' style={{backgroundImage: `url("${props.Poster}")`, ...props.customImgStyle}}></div>
      <h2 onClick={() => navigate(defualt_route + props.To)}>
        {props.Title}
      </h2>
      {/* <p dangerouslySetInnerHTML={{__html: props.Description}}></p> */}
      <p><div dangerouslySetInnerHTML={{__html: props.Description?.replace(/<[^>]*>/g, '')}}></div></p>
      
      {props.date && <Typography.Text type='secondary'><CalendarOutlined /> {moment(props.date).format('MM/DD/YYYY hh:mm:ss')}</Typography.Text>}
      <a onClick={() => navigate(defualt_route + props.To)}>More</a>
    </div>
  )
}


export default ArticleBox
