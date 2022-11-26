import React, { useContext, useState } from 'react';
import { Button, Input, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../../../App';
import UserColumnInTable from '../../../../../../Global/UserColumnInTable/UserColumnInTable';
import RequestsTable from '../../../../../../Global/RequestsComponents/RequestsTable';
import { CloseCircleOutlined, FileExcelOutlined, InfoCircleFilled, InfoCircleOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import GetITRequests from '../../../../API/GetITRequests';



function ServicesRequests(props) {
  const { user_data, defualt_route } = useContext(AppCtx);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isShowRemoveFilterBtn, setIsShowRemoveFilterBtn] = useState(true);

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
      title: 'Assgined To',
      dataIndex: 'PendingWith',
      width: '16%',
      render: (val, record) => <UserColumnInTable Mail={val?.Mail || record.ClosedBy?.Mail} DisplayName={val?.DisplayName || record.ClosedBy?.DisplayName} />
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

  const filtered_it_requests_data = props.DataTable?.filter(row => {
    const searchWord = searchText?.toLowerCase();
    if(
        row.Subject?.toLowerCase().includes(searchWord?.toLowerCase()) || 
        row.Id?.toString().includes(searchWord?.toLowerCase()) || 
        row.Priority?.toLowerCase().includes(searchWord?.toLowerCase()) ||
        row.Status?.toLowerCase().includes(searchWord?.toLowerCase()) ||
        row.RequestType?.toLowerCase().includes(searchWord?.toLowerCase())
      ) return true
        return false
  });

  const RemoveFilter = async () => {
    let _email = '';
    const _itRequests = await GetITRequests(_email).then((response) => {
      props.setITRequestsNoFilter(response.data.data);
      setIsShowRemoveFilterBtn(false);
    })
  }
  const ControlPanel = (
    <Space direction='horizontal'>
      <Input size='small' placeholder='Type To Search' onChange={e => setSearchText(e.target.value)} />
      {isShowRemoveFilterBtn && <Button size='small' onClick={RemoveFilter}><CloseCircleOutlined /> Remove Filter</Button>}
      <Button 
        size='small' 
        type='primary' 
        onClick={() => window.open("https://salicapi.com/api/Tracking/ExportData?ServiceRequestId=&ClosedBy=&EmailAddress=&RequestType=&PendingWith=&CreatedFrom=&CreatedTo=", "_blank")}
      >
        <FileExcelOutlined /> Export
      </Button>
    </Space>
  );



  return (
    <RequestsTable
      Title="Services Requests"
      HeaderControlPanel={ControlPanel}
      Columns={columns}
      DataTable={
        filtered_it_requests_data.map(row => {
          row.key = row.Status;
          return {...row}
        })
      }
    />
  )
}

export default ServicesRequests