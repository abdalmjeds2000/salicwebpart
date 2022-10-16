import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Spin, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined, PlusCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import UserColumnInTable from '../../Global/UserColumnInTable/UserColumnInTable'
import { AppCtx } from '../../App';
import GetAllContentRequests from '../API/GetAllContentRequests';

function AllContentRequests() {
  const { content_requests_data, setContentRequestsData, user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');


  async function GetRequests() {
    setLoading(true);
    const response = await GetAllContentRequests();
    if(response) {
      setContentRequestsData(response);
    } else {
      console.log("ERROR :: Get Content Requests");
    }
    setLoading(false);
  } 
  useEffect(() => {
    if(Object.keys(user_data).length > 0 && content_requests_data.length === 0) {
      GetRequests();
    }
  }, [user_data]);

  const columns = [
    {
      title: 'CR[#]',
      dataIndex: 'Id',
      width: '3%',
      render: (val, record) => <b>{`CR[#${val}]`}</b>
    },{
      title: 'Date & Time',
      dataIndex: 'Created',
      width: '20%',
      render: (val) => val ? new Date(val).toLocaleString() : ' - '
    },{
      title: 'Subject',
      dataIndex: 'Title',
      width: '35%',
      render: (val, record) => <a onClick={() => navigate(defualt_route + `/content-requests/${record.Id}`)}>{val}</a>
    },{
      title: 'Requester',
      dataIndex: 'Author',
      width: '30%',
      render: (val) => <UserColumnInTable Mail={val?.EMail} DisplayName={val?.Title} />
    },{
      title: 'Status',
      dataIndex: 'Status',
      width: '10%',
      render: (val) =>  val === "Submitted" 
                          ? <Tag icon={<SyncOutlined spin />} color="processing">Submitted</Tag> 
                        : val === "Approved"
                          ? <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag> 
                        : <Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>
    }
  ];

  const filtered_content_requests_data = content_requests_data?.filter(row => {
    const searchWord = searchText?.toLowerCase();
    if(
        row.Title?.toLowerCase().includes(searchWord) || 
        row.Id?.toString().includes(searchWord) || 
        row.Status?.toLowerCase().includes(searchWord)
      ) {
          return true
        }
        return false
  });



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/content-requests`)}>Content Requests</a>
        <p>Content Requests</p>
      </HistoryNavigation>

      <div className='table-page-container'>
        <div className='content'>
          <div className="header">
            <h1>All Content Requests</h1>
            <div style={{display: 'flex', gap: '10px'}}>
              <Input size='small' placeholder='Type To Search' onChange={e => setSearchText(e.target.value)} />
              <Button type='primary' size='small' onClick={GetRequests}>Refresh</Button>
            </div>
          </div>

          <div className='form' style={{overflowX: 'auto'}}>
              {
                !loading
                ? <Table
                    columns={columns} 
                    dataSource={filtered_content_requests_data} 
                    pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
                  />
                : <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
              }
            
          </div>
        </div>
      </div>
    </>
  )
}

export default AllContentRequests