import { SmileOutlined } from '@ant-design/icons';
import { Alert, notification } from 'antd';
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { AppCtx } from '../App';

const WelcomeMessage = () => {
  const { user_data, showWelcomeMessage, setShowWelcomeMessage } = useContext(AppCtx);

  // const openNotification = () => {
  //   notification.success({
  //     message: <span style={{color: 'var(--main-color)'}}>Hello <b>{user_data.Data.DisplayName}</b>, welcome to the new website of SALIC</span>,
  //     description: <span>This is SALIC's new website. If you want to browse the old website, <a href='https://salic.sharepoint.com/sites/newsalic' target='_blank'>click here</a>. This website will be activated within 30 days.</span>,
  //     placement: "bottomRight",
  //     icon: <SmileOutlined style={{color: 'var(--link-text-color)'}} />,
  //     style: {width: '100%', borderLeft: '10px solid var(--link-text-color)'},
  //     duration: 0
  //   });
    
  // };

  // useEffect(() => {
  //   if(Object.keys(user_data).length > 0) {
  //     openNotification();
  //     console.log('openNotification()');
  //   }
  // }, [user_data]);



  if(Object.keys(user_data).length > 0 && showWelcomeMessage) {
    return (
      <Alert
        message={<span>Hello <b>{user_data?.Data?.DisplayName}</b>, welcome to the new SALIC Gate</span>}
        description={<span>This is SALIC's new Gate. If you want to browse the old Gate, <a href='https://salic.sharepoint.com/sites/newsalic' target='_blank'><b>click here</b></a>. The previous SALIC gate will be deactivated after 30 days.</span>}
        type="success"
        closable
        showIcon
        afterClose={() => setShowWelcomeMessage(false)}
      />
    )
  }

  return <></>
  
  
}

export default WelcomeMessage