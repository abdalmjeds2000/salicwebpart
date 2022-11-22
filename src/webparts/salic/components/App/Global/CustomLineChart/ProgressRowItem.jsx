import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';

const ProgressRowItem = ({type, title, desc, count}) => {
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  return (
    <div className='row-item'>
      <div class={`row-item-legend bg-${type}`}></div>
      <div class="row-item-desc">
        <a onClick={() => navigate(defualt_route+`/services-requests/requests-assigned-for-me/${title}`)} class="user_chart_status">
          <span class="row-item-title">{title}</span>
        </a>
        <div class="row-item-desc">{desc}</div>
      </div>
      <div class="row-item-count">
        <span id="not-started-task">{count}</span>
      </div>
    </div>
  )
}

export default ProgressRowItem