import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Pagination, Row, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../../../App';
import UserColumnInTable from '../../../../../../Global/UserColumnInTable/UserColumnInTable';
import RequestsTable from '../../../../../../Global/RequestsComponents/RequestsTable';
import { CloseCircleOutlined, FileExcelOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';



function ServicesRequests(props) {
  const { ITRequests, setITRequests, user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [isShowRemoveFilterBtn, setIsShowRemoveFilterBtn] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  let _pageSize = 24;
  
  const FetchData = async (page, pageSize) => {
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;

    const _email = props.dataForUser.Mail || user_data.Data?.Mail;
    const response = await axios.get(`https://salicapi.com/api/tracking/Get?draw=3&order=Id desc&start=${skipItems}&length=${takeItems}&search[value]=&search[regex]=false&email=${_email}&query=&_=1668265007659`);
    setITRequests(response.data);
    setCurrentPage(page);
  }

  useEffect(() => {
    if( 
      Object.keys(user_data).length > 0 && 
      Object.keys(ITRequests).length === 0 && 
      props.dataForUser 
    ) {
      FetchData(1, _pageSize);
    }
  }, [user_data]);

  useEffect(() => {
    if(Object.keys(user_data).length > 0 && props.dataForUser ) {
      FetchData(1, _pageSize);
    }
  }, [props.dataForUser]);



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



  const RemoveFilter = async () => {
    const response = await axios.get(`https://salicapi.com/api/tracking/Get?draw=3&order=Id desc&start=0&length=24&search[value]=&search[regex]=false&email=&query=&_=1668265007659`);
    setITRequests(response.data);
    setIsShowRemoveFilterBtn(false);
    setCurrentPage(1);
  }


  const filtered_it_requests_data = ITRequests?.data?.filter(row => {
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
    <>
      <RequestsTable
        Title="Services Requests"
        HeaderControlPanel={ControlPanel}
        Columns={columns}
        containerStyle={{top: 0, marginBottom: 25}}
        DataTable={filtered_it_requests_data}
      />

      <Row justify="center" align="middle" style={{width: '100%', marginTop: 25}}>
        <Pagination
          size="small" 
          current={currentPage}
          total={ITRequests.recordsTotal / 2} 
          onChange={(page) => FetchData(page, _pageSize)}
          hideOnSinglePage
        />
      </Row>
    </>
  )
}

export default ServicesRequests