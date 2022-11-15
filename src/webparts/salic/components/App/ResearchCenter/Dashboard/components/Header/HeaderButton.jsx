import React from 'react';

function HeaderButton({ title, icon, onClick }) {

  return (
    <div className='header-item'>
      {icon}
      <span onClick={onClick}>{title}</span>
    </div>
  )
}

export default HeaderButton