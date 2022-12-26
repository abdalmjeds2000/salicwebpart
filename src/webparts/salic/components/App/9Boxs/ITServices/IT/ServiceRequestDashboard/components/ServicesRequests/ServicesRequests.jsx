import React, { useContext, useEffect, useState } from 'react';
import { Button, message, Row, Space, Typography } from 'antd';
import moment from 'moment';
import { AppCtx } from '../../../../../../App';
import UserColumnInTable from '../../../../../../Global/UserColumnInTable/UserColumnInTable';
import RequestsTable from '../../../../../../Global/RequestsComponents/RequestsTable';
import { CloseCircleOutlined, FileExcelOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination';
import AntdLoader from '../../../../../../Global/AntdLoader/AntdLoader';



function ServicesRequests(props) {
  const { ITRequests, setITRequests, user_data, defualt_route } = useContext(AppCtx);
  const [isShowRemoveFilterBtn, setIsShowRemoveFilterBtn] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  let _pageSize = 24;
  
  const FetchData = async (page, pageSize) => {
    setLoading(true);
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;

    const _email = props.dataForUser.Mail || user_data.Data?.Mail;
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/tracking/Get?draw=3&order=Id desc&start=${skipItems}&length=${takeItems}&search[value]=&search[regex]=false&email=${_email}&query=&_=1668265007659`
    }).then((response) => {
      const withkeys = response.data?.data?.map(row => {
        row.key = row.Status.replace(/[ ]/g, '_');
        return row;
      });
      setITRequests({data: withkeys, recordsTotal: response.data.recordsTotal});
      setCurrentPage(page);
      setLoading(false);
    }).catch(() => {
      message.error("Failed Fetch Services Requests")
    })
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


  const RemoveFilter = async () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/tracking/Get?draw=3&order=Id desc&start=0&length=24&search[value]=&search[regex]=false&email=&query=&_=1668265007659`
    }).then((response) => {
      const withkeys = response.data?.data?.map(row => {
        row.key = row.Status.replace(/[ ]/g, '_');
        return row;
      });
      setITRequests({data: withkeys, recordsTotal: response.data.recordsTotal});
      setCurrentPage(1);
      setIsShowRemoveFilterBtn(false);
      setLoading(false);
    }).catch(() => {
      message.error("Failed Fetch Services Requests")
    })
  }



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
        <Space direction='horizontal' style={{minWidth: 200}}>
          <InfoCircleOutlined style={{color: record.Priority === "1" ? "#0c508c" : "#ff272b"}} /> 
          <Typography.Link onClick={() => window.open(defualt_route + `/services-requests/${record.Id}`, '_blank')}>{val}</Typography.Link>
        </Space>
      )
    },{
      title: 'Requester',
      dataIndex: 'Requester',
      width: '16%',
      render: (val) => <div style={{minWidth: 100}}><UserColumnInTable Mail={val?.Mail} DisplayName={val?.DisplayName} /></div>
    },{
      title: 'Assgined To',
      dataIndex: 'PendingWith',
      width: '16%',
      render: (val, record) => <div style={{minWidth: 100}}><UserColumnInTable Mail={val?.Mail || record.ClosedBy?.Mail} DisplayName={val?.DisplayName || record.ClosedBy?.DisplayName} /></div>
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
      {/* <Input size='small' placeholder='Type To Search' onChange={e => setSearchText(e.target.value)} /> */}
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
      {
        !loading 
        ? (
          <>
            <RequestsTable
              Title="Services Requests"
              HeaderControlPanel={ControlPanel}
              Columns={columns}
              containerStyle={{top: 0, marginBottom: 25, padding: 0}}
              headerStyle={{borderRadius: 0}}
              DataTable={ITRequests?.data}
            />
          </>
        ) : (
          <AntdLoader customStyle={{margin: '10px'}} />
        )
      }
      <Row justify="center" align="middle" style={{width: '100%', marginTop: 25}}>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(ITRequests?.recordsTotal / _pageSize)}
          onChange={(page) => FetchData(page, _pageSize)}
          limiter={3}
        />
      </Row>
    </>
  )
}

export default ServicesRequests