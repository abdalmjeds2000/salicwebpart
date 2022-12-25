import { ArrowLeftOutlined } from '@ant-design/icons';
import { Badge, Tooltip, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppCtx } from '../../../App';
import './TeamTree.css';



const TeamTree = ({ onChangeUser }) => {

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  const { user_data, communicationList } = useContext(AppCtx);
  const userAvatarURL = 'https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=';
  const [dataFor, setDataFor] = useState(user_data?.Data);
  const [activeUser, setActiveUser] = useState(user_data?.Data);
  const [countLevel, setCountLevel] = useState(0);

  // let root = communicationList.filter(emp => emp.id == "1")[0];
  // const location = useLocation();


  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      // if(location.state) {
      //   if(location.state?.DirectUsers?.length > 0) {
      //     if(user_data.Data?.Mail?.toLowerCase() !== root?.email?.toLowerCase()) {
      //       setActiveUser(location.state);
      //     }
      //   }
      //   setDataFor(location.state);
      // } else {
        setActiveUser(user_data.Data);
        setDataFor(user_data.Data);
      // }
    }
  }, [user_data]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    onChangeUser(dataFor, signal);
    return () => {controller.abort();};
  }, [dataFor]);




const Childrens = () => {
  return <div className='childrens'>
    {
      activeUser?.DirectUsers?.map(user => (
        <Badge count={user.DirectUsers?.length} status='success'>
          <Tooltip title={user?.DisplayName}>
            <div 
              key={user?.Id} 
              className={`child-item ${dataFor?.Mail === user?.Mail ? 'active' : ''}`}
              onClick={() => {
                if(user.DirectUsers?.length > 0) {
                  if(countLevel <= 1) {
                    setCountLevel(prev => prev + 1);
                    setActiveUser(user);
                  }
                }
                setDataFor(user);
              }}
            >
              <img src={userAvatarURL + user?.Mail} alt='' />
            </div>
          </Tooltip>
        </Badge>
      ))
    }
  </div>
}


  if(Object.keys(user_data).length === 0 && Object.keys(communicationList).length === 0) {
    return null
  }
  return (
    <div className='team-tree-container'>
      {
        user_data.Data?.Mail?.toLowerCase() !== dataFor?.Mail?.toLowerCase()
        ? (
          <span 
            className='back-btn'
            onClick={() => {
              setActiveUser(user_data.Data);
              setDataFor(user_data.Data);
              setCountLevel(0);
            }}
          >
            <Tooltip title="Click for Back to your Team" placement='right'>
              <Typography.Link><ArrowLeftOutlined /></Typography.Link>
            </Tooltip>
          </span>
        ) : (
          null
        )
      }
      
      <div className={`parent ${dataFor?.Mail === activeUser?.Mail ? 'active' : ''}`}>
        <span className='img'>
          <img
            src={userAvatarURL + activeUser?.Mail}
            alt=''
            onClick={() => {
              // setActiveUser(user_data.Data);
              setDataFor(activeUser);
            }}
            // onClick={() => {
            //   setActiveUser(user_data.Data);
            //   setDataFor(user_data.Data);
            // }}
          />
        </span>
        <div className='desc'>
          <Typography.Title level={4}>{activeUser?.DisplayName}</Typography.Title>
          <Typography.Text>{activeUser?.Title}</Typography.Text>
        </div>
      </div>
      <div className='mobile-childrens'>
        <Childrens />
      </div>

      <div className='desktop-childrens'>
        <Childrens />
      </div>
    </div>
  )
}

export default TeamTree



