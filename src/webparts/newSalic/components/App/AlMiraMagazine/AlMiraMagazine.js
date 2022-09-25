import React, { useContext } from 'react';
import './AlMiraMagazine.css';
import AlMiraMagazinePoster from '../../../assets/images/almira/almira-poster.jpg';
import { AppCtx } from '../App'
import WorldBG from '../../../assets/images/world.svg'
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../Global/SimpleUserPanel/SimpleUserPanel';



const AlMiraMagazine = () => {
  const { user_data, notifications_count, mail_count } = useContext(AppCtx);
  return (
    <>
      <img src={WorldBG} className='img-bg' />
      <HistoryNavigation>
        <p>Al Mira Magazine</p>
      </HistoryNavigation>
      <SimpleUserPanel
        userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
        userName={user_data.Data?.DisplayName}
        notificationsCount={notifications_count}
        mailCount={mail_count}
      />
      <div className='almira-magazine-container'>
        <div className='image'>
          <img src={AlMiraMagazinePoster} alt="AlMira Magazine" />
        </div>
        <div className='content'>
          <div className='header'>
            <h1>AlMira Magazine | مجلة الميرة</h1>
            <p>First Issue : Q1 2020</p>
          </div>
          <div className='description'>
            <p><b>Description</b></p>
            <p>Quartely magazine published Saudi Agricultural and Livestock Company "SALIC" under Corporate Communication Department.</p>
          </div>
          <div className='en-ar-btns'>
            <a target='blank' href="https://salic.sharepoint.com/sites/newsalic/SiteAssets/js/almira/magazine/en/en.aspx">
              English Version
            </a>
            <a target='blank' href="https://salic.sharepoint.com/sites/newsalic/SiteAssets/js/almira/magazine/ar/ar.aspx">
              النسخة العربية
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlMiraMagazine