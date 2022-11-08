import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Space, Tag, Typography } from 'antd';
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import UserColumnInTable from '../../../../Global/UserColumnInTable/UserColumnInTable';
import { AppCtx } from '../../../../App';
import GetMyItServiceRequests from '../../API/GetMyItServiceRequests';
import RequestsTable from '../../../../Global/RequestsComponents/RequestsTable';
import moment from 'moment';

function MyItServiceRequests() {
  const { my_it_requests_data, setMyItRequestsData, user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  async function GetRequests() {
    setLoading(true);
    const response = await GetMyItServiceRequests(user_data.Data?.Mail);
    if(response) {
      setMyItRequestsData(response.data.Data);
    } else {
      console.log("ERROR :: Get My It Requests");
    }
    setLoading(false);
  } 
  useEffect(() => {
    if(Object.keys(user_data).length > 0 && my_it_requests_data.length === 0) {
      GetRequests();
    }
  }, [user_data]);

  const columns = [
    {
      title: 'SR. Number',
      dataIndex: 'Id',
      width: '5%',
      render: (val) => <b>{`SR[#${val}]`}</b>
    },{
      title: 'Date & Time',
      dataIndex: 'CreatedAt',
      width: '15%',
      render: (val) => moment(val).format('MM/DD/YYYY hh:mm:ss')
    },{
      title: 'Subject',
      dataIndex: 'Subject',
      width: '30%',
      render: (val, record) => <Typography.Link onClick={() => navigate(defualt_route + `/it-services/${record.Id}`)}>{val}</Typography.Link>
    },{
      title: 'Assigned To',
      dataIndex: 'ClosedBy',
      width: '20%',
      render: (val) => <UserColumnInTable Mail={val.Mail} DisplayName={val.DisplayName} />
    },{
      title: 'Priority',
      dataIndex: 'Priority',
      width: '15%',
      render: (val) => val == "1" ? <Tag color="#0c508c">Normal</Tag> : val == "2" ? <Tag color="#ff272b">Critical</Tag> : <Tag color="#bbb">Unknown</Tag>
    },{
      title: 'Status',
      dataIndex: 'Status',
      width: '15%',
    }
  ];

  const filtered_it_requests_data = my_it_requests_data?.filter(row => {
    const searchWord = searchText?.toLowerCase();
    if(
        row.Subject?.toLowerCase().includes(searchWord) || 
        row.Id?.toString().includes(searchWord) || 
        row.Priority?.toLowerCase().includes(searchWord) ||
        row.Status?.toLowerCase().includes(searchWord)
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
        <p>My IT Sevices Requests</p>
      </HistoryNavigation>

      <RequestsTable
        Title="My Requests"
        HeaderControlPanel={ControlPanel}
        IsLoading={loading}
        Columns={columns}
        DataTable={filtered_it_requests_data}
      />
    </>
  )
}

export default MyItServiceRequests