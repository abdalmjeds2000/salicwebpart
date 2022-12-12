import React from 'react';
import './UserSettingsPanel.css';
import logo from '../../../../assets/images/logo.jpg';

function UserSettingsPanel(props) {
  return (
    <div className="user-setting-panel">
      <div id='user-details' onclick={e => e.preventDefault()}>
        <div className='user-details-header'>
          <img src={logo} alt="logo" className='logo' />
          <a href="https://salic.sharepoint.com/sites/newsalic/_layouts/closeConnection.aspx?loginasanotheruser=true&Source=https://salic.sharepoint.com/sites/dev">Sign Out</a>
        </div>
        <div className='details'>
          <img 
            src={props.userImage} 
            alt="user face" 
          />
          <div>
            <h2>{props.userName}</h2>
            <a target='_blank' href="https://myaccount.microsoft.com/">Microsoft Account</a>
            <a target='_blank' href="https://salic.sharepoint.com/sites/Portal/_layouts/15/settings.aspx">Site Setting</a>
            <a target='_blank' href="https://account.activedirectory.windowsazure.com/ChangePassword.aspx">Change Password</a>
          </div>
        </div>
      </div>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        right: '0',
        zIndex: '0'
      }}
        onClick={props.onClickClose}
      ></div>
    </div>
  )
}

export default UserSettingsPanel