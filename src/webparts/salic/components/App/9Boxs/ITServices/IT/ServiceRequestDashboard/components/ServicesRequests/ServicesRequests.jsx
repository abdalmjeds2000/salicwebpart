import React, { useContext, useState } from 'react';
import { Tag, Typography } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../../../App';
import UserColumnInTable from '../../../../../../Global/UserColumnInTable/UserColumnInTable';
import RequestsTable from '../../../../../../Global/RequestsComponents/RequestsTable';

function ServicesRequests(props) {
  const { user_data, defualt_route } = useContext(AppCtx);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

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

  const filtered_it_requests_data = props.DataTable?.filter(row => {
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

  
  return (
    <RequestsTable
      Title="Services Requests"
      // HeaderControlPanel={ControlPanel}
      Columns={columns}
      DataTable={filtered_it_requests_data}
    />
  )
}

export default ServicesRequests