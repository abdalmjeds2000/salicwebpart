import React, {useState} from 'react'
import './UserPanel.css';
import { NavLink } from 'react-router-dom'
import UserSettingsPanel from '../UserSettingsPanel/UserSettingsPanel';
import NotificationIcon from '../../../../assets/icons/userpanel_icons/Iconly-Bold-Notification.svg';
import MessageIcon from '../../../../assets/icons/userpanel_icons/Iconly-Bold-Message.svg';
import DocumentIcon from '../../../../assets/icons/userpanel_icons/Iconly-Bold-Document.svg';
import CallingIcon from '../../../../assets/icons/userpanel_icons/Iconly-Bold-Calling.svg';
import BookingIcon from '../../../../assets/icons/userpanel_icons/Iconly-Bold-Booking.svg';

const UserPanel = (props) => {
  const [showUserDetails, setShowUserDetails] = useState(false);

  return (
    <div className='user-panel-container'>
      <div className='icons'>
        
        {/* <a href="/">
          <img src={DocumentIcon} alt="" />
        </a> */}
        
        
        <NavLink to="/book-meeting-room">
          <img src={BookingIcon} alt="" />
        </NavLink>
        
        <a href={props.mailTo} target='blank'>
          <img src={MessageIcon} alt="" />
          { 
            props.mailCount > 0 && 
            <span className="badge mail-count" style={{top: '-10px'}}>
              {props.mailCount > 99 ? '99+' : props.mailCount}
            </span> 
          }
        </a>
        
        <NavLink to="/notification-center">
          <img src={NotificationIcon} alt="" />
          { 
            props.notificationsCount > 0 && 
            <span className="badge notifi-count" style={{top: '-10px'}}>
              {props.notificationsCount > 99 ? '99+' : props.notificationsCount}
            </span> 
          }
        </NavLink>
        
      </div>
      
      <div className='user-info'>
        <h2>{props.userName}</h2>
        <img 
          src={props.userImage} 
          alt="" 
          onClick={_ => setShowUserDetails(!showUserDetails)} 
        />
      </div>
      {
        showUserDetails
        ? <UserSettingsPanel
            userName={props.userName}
            userImage={props.userImage}
            onClickClose={() => setShowUserDetails(!showUserDetails)}
          />
        : null
      }
    </div>
  )
}

export default UserPanel