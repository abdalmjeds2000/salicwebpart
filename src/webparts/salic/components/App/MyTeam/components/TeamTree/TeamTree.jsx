import { Badge, Tooltip, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppCtx } from '../../../App';
import './TeamTree.css';



const TeamTree = ({ onChangeUser }) => {
  const { user_data } = useContext(AppCtx);

  const userAvatarURL = 'https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=';
  
  const [dataFor, setDataFor] = useState(user_data?.Data);


  const [activeUser, setActiveUser] = useState(user_data?.Data);
  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      setActiveUser(user_data.Data);
      setDataFor(user_data.Data);
    }
  }, [user_data]);


  
  useEffect(() => {
    onChangeUser(dataFor);
  }, [dataFor]);


  return (
    <div className='team-tree-container'>
      <div className={`parent ${dataFor?.Mail === activeUser?.Mail ? 'active' : ''}`}>
        <img
          src={userAvatarURL + activeUser?.Mail}
          alt=''
          onClick={() => {
            setActiveUser(user_data.Data);
            setDataFor(user_data.Data);
          }}
        />
        <div className='desc'>
          <Typography.Title level={5}>{activeUser?.DisplayName}</Typography.Title>
          <Typography.Text>{activeUser?.Title}</Typography.Text>
        </div>
      </div>

      <div className='childrens'>
        {
          activeUser?.DirectUsers?.map(user => (
            <Badge count={user.DirectUsers?.length} status='success'>
              <Tooltip title={user?.DisplayName}>
                <div 
                  key={user?.Id} 
                  className={`child-item ${dataFor?.Mail === user?.Mail ? 'active' : ''}`}
                  onClick={() => {
                    if(user.DirectUsers?.length > 0) {
                      setActiveUser(user)
                      setDataFor(user);
                    } else {
                      setDataFor(user);
                    }
                  }}
                >
                  <img src={userAvatarURL + user?.Mail} alt='' />
                </div>
              </Tooltip>
            </Badge>
          ))
        }
      </div>
    </div>
  )
}

export default TeamTree