import React from 'react';
import ProgressRowItem from './ProgressRowItem';

const LineChart = ({items, totalCount}) => {
  return (
    <div className='custom-progress'>
      <div className='progress'>
        {
          items.map((item, i) => (
            <div key={i} style={{width: `${(item.count/totalCount)*100}%`}} className={`progress-bar bg-${item.type}`} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          ))
        }
      </div>

      {
        items.map((item, i) => (
          <ProgressRowItem key={i} type={item.type} title={item.title} desc={item.description} count={item.countLabel || item.count} />
        ))
      }
    </div>
  )
}

export default LineChart