import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import { Button, message, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GetMyRequests from './GetMyRequests';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';
import UserColumnInTable from '../../../Global/UserColumnInTable/UserColumnInTable';



function MyRequests() {
  const { admin_my_requests, setAdminMyRequests, defualt_route, user_data } = useContext(AppCtx);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  async function fetchData() {
    setLoading(true)
    const response = await GetMyRequests(user_data?.Data?.Mail)
    if(response.status === 200){
      const dataTable = response?.data?.Data?.map((row, i) => {
        row.Key = i+1
        return {...row}
      })
      setAdminMyRequests(dataTable);
    } else {
      message.error("Failed Load Data!")
    }
    setLoading(false);
  }

  useEffect(() => {
    if(Object.keys(user_data).length > 0 && admin_my_requests.length === 0){
      fetchData();
    }
  }, [user_data])


  const ToUpdatePage = (RequestType, RequestId) => {
    const Code = RequestType.split("-")[0];
    if(Code === "VISA") {
      navigate(defualt_route + `/admin-services/issuing-VISA/${RequestId}`);
    } else if(Code === "BG") {
      navigate(defualt_route + `/admin-services/business-gate/${RequestId}`);
    } else if(Code === "SHP") {
      navigate(defualt_route + `/admin-services/shipment/${RequestId}`);
    } else if(Code === "SUP") {
      navigate(defualt_route + `/admin-services/office-supply/${RequestId}`);
    } else if(Code === "MAN") {
      navigate(defualt_route + `/admin-services/maintenance/${RequestId}`);
    } else if(Code === "VIS") {
      navigate(defualt_route + `/admin-services/visitor/${RequestId}`);
    } else if(Code === "TS") {
      navigate(defualt_route + `/admin-services/transportation/${RequestId}`);
    }
    return null
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'Key',
    },{
      title: 'Application Name',
      dataIndex: 'ApplicationName',
      render: (code, record) => <a onClick={() => ToUpdatePage(code, record.Id)}>{code}</a>
    },{
      title: 'Date',
      dataIndex: 'Date',
      render: (val) => new Date(val).toLocaleDateString() || ' - '
    },{
      title: 'Ref. Code',
      dataIndex: 'ReferenceCode',
      render: (code, record) => <a onClick={() => ToUpdatePage(code, record.Id)}>{code}</a>
    },{
      title: 'Status',
      dataIndex: 'Status',
      render: (val) => <><span style={{ fontSize: '2.5rem', lineHeight: 0, position: 'relative', top: '7px', color: val === null ? 'rgb(39, 124, 98)' : 'rgb(233 155 77)'}}>???</span>{val === null ? "Completed" : "Processing"}</>
    },{
      title: 'Requester Name',
      dataIndex: 'ByUser',
      render: (val) =>  val ? <UserColumnInTable Mail={''} DisplayName={''} /> : ' - '
    },{
      title: 'Created At',
      dataIndex: 'Date',
      render: (val) => new Date(val).toLocaleString() || ' - '
    },{
      title: 'Modified At',
      dataIndex: 'Date',
      render: (val) => new Date(val).toLocaleString() || ' - '
    },
  ];



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>My Requests</p>
      </HistoryNavigation>

      <div className='table-page-container'>

        <div className='content'>
          <div className="header">
            <h1>My Requests History</h1>
            <Button type='primary' size='small' onClick={fetchData}>Refresh</Button>
          </div>

          <div className='form'>
            {
              !loading
              ? <Table
                  columns={columns}
                  dataSource={admin_my_requests}
                  pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
                />
              : <AntdLoader />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MyRequests