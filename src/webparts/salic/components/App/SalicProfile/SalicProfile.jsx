import React from 'react';
import HistoryNavigation from "../Global/HistoryNavigation/HistoryNavigation";
import ServicesSection from "../Global/ServicesSection/ServicesSection";


const SalicProfile = () => {
  return (
    <div>
      <HistoryNavigation>
        <p>SALIC Profile</p>
      </HistoryNavigation>
      
      <div className='standard-page it-center-container'>
        <ServicesSection
          title="SALIC Profile"
          items={[
            {icon: '', isLink: false, to: '/salic-profile/', bgColor: '#43A2CC', text: 'Annual Reports'},
            {icon: '', isLink: false, to: '/salic-profile/', bgColor: '#FBBE82', text: 'SALIC Presentation'},
            {icon: '', isLink: false, to: '/salic-profile/almira-versions', bgColor: '#FD96A6', text: 'Almira Versions'},
          ]}
        />
      </div>
    </div>
  )
}

export default SalicProfile