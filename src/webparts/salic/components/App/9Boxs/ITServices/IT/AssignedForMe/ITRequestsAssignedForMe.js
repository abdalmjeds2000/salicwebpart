import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Space, Tag, Typography } from 'antd';
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import UserColumnInTable from '../../../../Global/UserColumnInTable/UserColumnInTable';
import { AppCtx } from '../../../../App';
import GetITRequestsAssignedForMe from '../../API/GetITRequestsAssignedForMe';
import RequestsTable from '../../../../Global/RequestsComponents/RequestsTable';
import moment from 'moment';

function ITRequestsAssignedForMe() {
  const { it_requests_assigned_for_me_data, setItRequestsAssignedForMeData, user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  async function GetRequests() {
    setLoading(true);
    const response = await GetITRequestsAssignedForMe(user_data.Data?.Mail);
    if(response) {
      setItRequestsAssignedForMeData(response.data.Data);
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
      title: 'SR. Number',
      dataIndex: 'Id',
      width: '7%',
      render: (val) => <b>{`SR[#${val}]`}</b>
    },{
      title: 'Date & Time',
      dataIndex: 'CreatedAt',
      width: '14%',
      render: (val) => moment(val).format('MM/DD/YYYY hh:mm:ss')
    },{
      title: 'Subject',
      dataIndex: 'Subject',
      width: '28%',
      render: (val, record) => <Typography.Link onClick={() => navigate(defualt_route + `/it-services/${record.Id}`)}>{val}</Typography.Link>
    },{
      title: 'Requester',
      dataIndex: 'Requester',
      width: '15%',
      render: (val) => <UserColumnInTable Mail={val.Mail} DisplayName={val.DisplayName} />
    },{
      title: 'Priority',
      dataIndex: 'Priority',
      width: '12%',
      render: (val) => val == "1" ? <Tag color="#0c508c">Normal</Tag> : val == "2" ? <Tag color="#ff272b">Critical</Tag> : <Tag color="#bbb">Unknown</Tag>
    },{
      title: 'Status',
      dataIndex: 'Status',
      width: '12%',
    },{
      title: 'Request Type',
      dataIndex: 'RequestType',
      width: '12%',
    }
  ];

  const filtered_it_requests_data = it_requests_assigned_for_me_data?.filter(row => {
    const searchWord = searchText?.toLowerCase();
    if(
        row.Subject?.toLowerCase().includes(searchWord) || 
        row.Id?.toString().includes(searchWord) || 
        row.Priority?.toLowerCase().includes(searchWord) ||
        row.Status?.toLowerCase().includes(searchWord) ||
        row.RequestType?.toLowerCase().includes(searchWord)
      ) return true
        return false
  });

  const ControlPanel = (
    <Space direction='horizontal'>
      <Input size='small' placeholder='Type To Search' onChange={e => setSearchText(e.target.value)} />
      <Button type='primary' size='small' onClick={GetRequests}><RedoOutlined /> Refresh</Button>
      <Button size='small' onClick={() => navigate(defualt_route+'/it-services/services-request')}><PlusOutlined /> New Request</Button>
    </Space>
  )
  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/it-services`)}>IT Services Center</a>
        <p>Requests Assigned For Me</p>
      </HistoryNavigation>

      <RequestsTable
        Title="Requests Assigned For Me"
        HeaderControlPanel={ControlPanel}
        IsLoading={loading}
        Columns={columns}
        DataTable={filtered_it_requests_data}
      />
    </>
  )
}

export default ITRequestsAssignedForMe