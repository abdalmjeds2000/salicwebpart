import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import { message, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GetMyRequests from './GetMyRequests';



function MyRequests() {
  const { maintenance_data, setMaintenanceData, defualt_route, user_data } = useContext(AppCtx);
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  async function fetchData() {
    setLoading(true)
    const response = await GetMyRequests(user_data?.Data?.Mail)
    if(response.status === 200){
      const dataTable = response?.data?.Data?.map((row, i) => {
        row.Key = i+1
        return {...row}
      })
      setData(dataTable);
      setLoading(false)
    } else {
      setLoading(false)
      message.error("Failed Load Data!")
    }

  }

  useEffect(() => {
    if(user_data){
      fetchData();
    }
  }, [user_data])


  
  const columns = [
    {
      title: '#',
      dataIndex: 'Key',
    },{
      title: 'Application Name',
      dataIndex: 'ApplicationName',
      render: (val, record) => <a>{val}</a>
    },{
      title: 'Date',
      dataIndex: 'Date',
      render: (val) => new Date(val).toLocaleDateString() || ' - '
    },{
      title: 'Ref. Code',
      dataIndex: 'ReferenceCode',
      render: (val) => <a>{val}</a>
    },{
      title: 'Status',
      dataIndex: 'Status',
      render: (val) => <><span style={{ fontSize: '2.5rem', lineHeight: 0, position: 'relative', top: '7px', color: val === null ? 'rgb(39, 124, 98)' : 'rgb(233 155 77)'}}>•</span>{val === null ? "Completed" : "Processing"}</>
    },{
      title: 'Requester Name',
      dataIndex: 'ByUser',
      render: (val) =>  <div style={{display: 'flex', alignItems: 'center', gap: '7px'}}>
                          <img src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=S&username={val.Mail || ''}`} alt='' style={{borderRadius: '50%', width: '40px', border: '2px solid rgb(255, 255, 255)'}}/>
                          <a href={`https://salic.sharepoint.com/_layouts/15/me.aspx/?p={val.Mail}&v=work`} target='_blank'>Name of Pending With{/* {val.DisplayName || ' - '} */}</a>
                        </div>
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
          </div>

          <div style={{padding: '25px', overflowX: 'auto'}}>
            {
              !loading
              ? <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
                />
              : <Spin indicator={<LoadingOutlined spin />} style={{width: '100%', margin: '25px auto'}} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MyRequests