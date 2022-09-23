import React, { useContext, useEffect, useState } from 'react'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation'
import SimpleUserPanel from '../../Global/SimpleUserPanel/SimpleUserPanel'
import { useNavigate } from 'react-router-dom';
import WorldBG from '../../../../assets/images/world.svg';
import { AppCtx } from '../../App';
import { Select, Spin, Table, Tooltip } from 'antd';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';



function MyMeetings() {
  const { user_data, notifications_count, mail_count, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();


  const [roomTitle, setRoomTitle] = useState('meeting.room1@salic.com')
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  const handleChange = (value) => setRoomTitle(value.value);

  useEffect(() => {
    setLoader(true);
    axios({method: 'GET',url: `https://salicapi.com/api/Meeting/GetMyBooking?Email=${user_data?.Data?.Mail}&draw=4&order%5B0%5D%5Bdir%5D=asc&start=0&length=50`})
    .then((res) => {
      let dataTable = [];
      const response = res?.data?.data;
      for(let key in response) {
        const row = {
          Key: key,
          Id: key,
          Organizer: {DisplayName: response[key]?.organizer?.emailAddress?.name, Email: response[key]?.organizer?.emailAddress?.address},
          Subject: response[key]?.subject,
          Start: new Date(response[key]?.start?.dateTime).toString().slice(0, 24),
          End: new Date(response[key]?.end?.dateTime).toString().slice(0, 24),
          Location: response[key]?.location?.displayName,
          Attendance: response[key]?.attendees,
        }
        dataTable.push(row);
      }
      setData(dataTable);
      setLoader(false);
    }).catch(err => {
      console.log(err);
      setLoader(false);
    })
  }, [user_data, roomTitle])

  const columns = [
    {
      title: '#',
      dataIndex: 'Id',
      key: 'Id',
      render: (val) => `${Number(val)+1}`
    },{
      title: 'Subject',
      dataIndex: 'Subject',
      key: 'Subject',
      render: (val) => <a>{val}</a>
    },{
      title: 'Start',
      dataIndex: 'Start',
      key: 'Start',
    },{
      title: 'End',
      dataIndex: 'End',
      key: 'End',
    },{
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },{
      title: 'Attendance',
      dataIndex: 'Attendance',
      key: 'Attendance',
      render: (val) => val.length > 0 
                        ? <Tooltip placement="topRight" title={() => <div>{val.map(a => <div>{a?.emailAddress?.name}</div>)}</div>}>
                            <a>{val.length}</a>
                          </Tooltip> : <>0</>
      
    },{
      title: 'Organizer',
      dataIndex: 'Organizer',
      key: 'Organizer',
      render: (val) =>  <a onClick={() => window.open(`https://salic.sharepoint.com/_layouts/15/me.aspx/?p=${val.Email}&v=work`, "_blank")} style={{display: 'flex', alignItems: 'center', gap: '7px'}}>
                          <img src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=S&username=${val.Email}`} style={{borderRadius: '50%', width: '40px', border: '2px solid #fff'}} alt=''/>
                          {val.DisplayName}
                        </a>
    },
  ];


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/book-meeting-room`)}>Meetings Center</a>
        <p>My Meetings</p>
      </HistoryNavigation>
      <div className='meetings-center-container'>
        <img src={WorldBG} className='img-bg' alt="world background" />

        <SimpleUserPanel
          userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
          userName={user_data.Data?.DisplayName}
          notificationsCount={notifications_count}
          mailCount={mail_count}
        />

        <div className='content'>
          <div className="header">
            <h1>My Meetings</h1>
          </div>

          <div style={{padding: '25px'}}>
            {
              !loader
              ? <Table columns={columns} dataSource={data} pagination={false} rowClassName />
              : <Spin indicator={<LoadingOutlined spin />} style={{width: '100%', margin: '25px auto'}} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MyMeetings