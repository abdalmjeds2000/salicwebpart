import React, { useContext, useEffect, useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { InfoCircleOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import UserColumnInTable from '../../../../Global/UserColumnInTable/UserColumnInTable';
import { AppCtx } from '../../../../App';
import GetITRequestsAssignedForMe from '../../API/GetITRequestsAssignedForMe';
import RequestsTable from '../../../../Global/RequestsComponents/RequestsTable';
import moment from 'moment';

function ITRequestsAssignedForMe() {
  const { query } = useParams();

  const { it_requests_assigned_for_me_data, setItRequestsAssignedForMeData, user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function GetRequests() {
    setLoading(true);
    const response = await GetITRequestsAssignedForMe(user_data.Data?.Mail);
    if(response) {
      // const withkey = response.data.Data.map(row => {
      //   row.key = row.Status;
      //   return {...row}
      // });
      setItRequestsAssignedForMeData(response.data.Data);
      console.log(response.data.Data);
    } else {
      console.log("ERROR :: Get It Requests Assigned For Me");
    }
    setLoading(false);
  } 
  useEffect(() => {
    if(Object.keys(user_data).length > 0 && it_requests_assigned_for_me_data.length === 0) {
      GetRequests();
    }
  }, [user_data]);

  const columns = [
    {
      title: 'SR. #',
      dataIndex: 'Id',
      width: '5%',
      render: (val) => <b>{`SR[#${val}]`}</b>
    },{
      title: 'Date & Time',
      dataIndex: 'CreatedAt',
      width: '12%',
      render: (val) => moment(val).format('MM/DD/YYYY hh:mm:ss')
    },{
      title: 'Subject',
      dataIndex: 'Subject',
      width: '33%',
      render: (val, record) => (
        <Space direction='horizontal'>
          <InfoCircleOutlined style={{color: record.Priority === "1" ? "#0c508c" : "#ff272b"}} /> 
          <Typography.Link onClick={() => navigate(defualt_route + `/services-requests/${record.Id}`)}>{val}</Typography.Link>
        </Space>
      )
    },{
      title: 'Requester',
      dataIndex: 'Requester',
      width: '16%',
      render: (val) => <UserColumnInTable Mail={val?.Mail} DisplayName={val?.DisplayName} />
    }/* ,{
      title: 'Priority',
      dataIndex: 'Priority',
      width: '12%',
      render: (val) => val == "1" ? <Tag color="#0c508c">Normal</Tag> : val == "2" ? <Tag color="#ff272b">Critical</Tag> : <Tag color="#bbb">Unknown</Tag>
    } */,
    {
      title: 'Pending With',
      dataIndex: 'PendingWith',
      width: '16%',
      render: (val) => val ? <UserColumnInTable Mail={val?.Mail} DisplayName={val?.DisplayName} /> : '-'
    },{
      title: 'Status',
      dataIndex: 'Status',
      width: '8%',
    },{
      title: 'Request Type',
      dataIndex: 'RequestType',
      width: '10%',
    }
  ];

  

  const ControlPanel = (
    <Space direction='horizontal'>
      <Button type='primary' size='small' onClick={GetRequests}><RedoOutlined /> Refresh</Button>
      <Button size='small' onClick={() => navigate(defualt_route+'/services-requests/services-request')}><PlusOutlined /> New Request</Button>
    </Space>
  )
  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/services-requests`)}>IT Services Center</a>
        <p>Requests Assigned For Me</p>
      </HistoryNavigation>

      <RequestsTable
        Title="Requests Assigned For Me"
        HeaderControlPanel={ControlPanel}
        IsLoading={loading}
        Columns={columns}
        DataTable={it_requests_assigned_for_me_data}
      />
    </>
  )
}

export default ITRequestsAssignedForMe