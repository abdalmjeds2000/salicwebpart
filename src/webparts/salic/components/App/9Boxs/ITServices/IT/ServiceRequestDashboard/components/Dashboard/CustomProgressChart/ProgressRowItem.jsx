import React from 'react'

const ProgressRowItem = ({type, title, desc, count}) => (
  <div className='row-item'>
    <div class={`row-item-legend bg-${type}`}></div>
    <div class="row-item-desc">
      <a href="#" class="user_chart_status">
        <span class="row-item-title">{title}</span>
      </a>
      <div class="row-item-desc">{desc}</div>
    </div>
    <div class="row-item-count">
      <span id="not-started-task">{count}</span>
    </div>
  </div>
)

export default ProgressRowItem