import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryNavigation from "../../Global/HistoryNavigation/HistoryNavigation";
import ServicesSection from "../../Global/ServicesSection/ServicesSection";
import { AppCtx } from '../../App';


const AlmiraVersions = () => {
  const { defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  return (
    <div>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/salic-profile`)}>SALIC Profile</a>
        <p>Almira Versions</p>
      </HistoryNavigation>
      
      <div className='standard-page it-center-container'>
        <ServicesSection
          title="Almira Versions"
          items={[
            {icon: '', isLink: false, to: '/salic-profile/almira-versions/almira-magazine', bgColor: '#7722ff', text: 'Version 1'},
            {icon: '', isLink: false, to: '/salic-profile/almira-versions', bgColor: '#ff33ff', text: 'Version 2'},
            {icon: '', isLink: false, to: '/salic-profile/almira-versions', bgColor: '#ffaa82', text: 'Version 3'},
          ]}
        />
      </div>
    </div>
  )
}

export default AlmiraVersions