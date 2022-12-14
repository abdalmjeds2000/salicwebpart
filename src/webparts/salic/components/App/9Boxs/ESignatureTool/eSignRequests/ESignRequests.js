import React, { useContext, useEffect, useState } from 'react'
import './ESignRequests.css';
import { CheckOutlined, DeleteOutlined, DownOutlined, FileOutlined, FileTextOutlined, MoreOutlined, PlusOutlined, RedoOutlined, SearchOutlined, StopOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Menu, message, Popconfirm, Space, Table, Typography } from 'antd'
import { AppCtx } from '../../../App';
import axios from 'axios';
import VerifySignatureModal from './Actions/VerifySignatureModal';
import ResendInvitation from './Actions/ResendInvitation';
import ShareWith from './Actions/ShareWith';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';


function getWindowSize() {
  const {innerWidth, innerHeight} = typeof window !== "undefined" && window;
  return {innerWidth, innerHeight};
}


function ESignRequests() {
  const { eSign_requests, setESignRequests } = useContext(AppCtx)
  // Get Window Size
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {setWindowSize(getWindowSize());}
    window.addEventListener('resize', handleWindowResize);
  }, []);


  // Row Menu Withdraw Or Enable
  const confirmWithdrawOrEnable = (Id, IsActive) => {
    axios({
      method: 'POST',
      url: 'https://salicapi.com/api/Signature/Withdraw',
      data: {DocumentId: Id, Status: IsActive ? false : true}
    }).then((res) => {
      message.success(`Success, Document Is ${IsActive ? 'Withdraw' : 'Enable'} Now!`, 3);
    }).then(() => {
      const setESignRequestsUpdated = eSign_requests.map(row => {
        if(row.Id === Id) {
          if(row.IsActive === true) {
            row.IsActive = false
            return row
          }
          else if(row.IsActive === false){
            row.IsActive = true
            return row
          }
        }
        return row
      })
      setESignRequests(setESignRequestsUpdated)
    }).catch(() => message.error('Failed', 3))
  }
  // Row Menu Delete
  const confirmDelete = (Id) => {
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/Signature/Delete?DocumentId=${Id}`
    }).then((res) => {
      message.success(res.data.Message, 3)
    }).then(() => {
      const setESignRequestsUpdated = eSign_requests.filter(row => row.Id !== Id)
      setESignRequests(setESignRequestsUpdated)
    }).catch(() => message.error('Failed', 3))
  }
  // Row Menu 
  const menu = (Id, IsActive, Status, Key) => {
    const Items = [
      {
        key: '4',
        label: (<a href={`https://salicapi.com/eSign/Sign.html?key=${Key}`} target="_blank"><FileTextOutlined /> Show Document</a>),
      },
      {
        key: '1',
        label: (
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => confirmWithdrawOrEnable(Id, IsActive)}
            okText={IsActive ? 'Withdraw' : 'Enable'}
            cancelText="Cancel"
          >
            <a>
              {IsActive ? <><StopOutlined /> Withdraw</> : <><CheckOutlined /> Enable</>}
            </a>
          </Popconfirm>
        ),
      },
      {
        key: '2',
        label: (
          <ResendInvitation Id={Id} />
        ),
      },Status === 'Pending' ? {
        key: '3',
        label: (
          <ShareWith Id={Id} />
        ),
      } : null,
      {
        key: '5',
        label: (
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => confirmDelete(Id)}
            okText='Delete'
            cancelText="Cancel"
          >
            <a style={{color: '#ff272b !important'}}>
              <DeleteOutlined /> Delete
            </a>
          </Popconfirm>
        ),
        danger: true
      }
    ]
    return <Menu items={Items} />
  };

  
  const columns = [
    {
      title: '#',
      dataIndex: 'Number',
      key: 'Number',
      width: windowSize.innerWidth <= 768 ? '5%' : '3%',
    },{
      title: 'Subject',
      dataIndex: 'Subject',
      key: 'Subject',
      width: windowSize.innerWidth <= 768 ? '95%' : '22%',
      render: (text) => {
        const currentRow = eSign_requests.filter(r => r.Subject === text)[0];
        return (
          <>
            <Typography.Link href={`https://salicapi.com/eSign/Sign.html?key=${text.split('__KEY__')[1]}`} target='_blank'>
              {currentRow.IsActive ? text.split('__KEY__')[0] : <> <StopOutlined style={{color: 'var(--brand-red-color)'}} /> {text.split('__KEY__')[0]}</> }
            </Typography.Link>
            <Dropdown overlay={menu(currentRow.Id, currentRow.IsActive, currentRow.Status, currentRow.Key)} trigger={['click']}>
              <Typography.Link strong style={{marginLeft: '15px'}}><MoreOutlined /></Typography.Link>
            </Dropdown>
          </>
        )
      },
    },{
      title: 'Request Date',
      dataIndex: 'RequestDate',
      key: 'RequestDate',
      width: '10%',
    },{
      title: 'Recipients',
      dataIndex: 'Recipients',
      key: 'Recipients',
      width: '5%',
      // ellipsis: true,
    },{
      title: 'Is Parallel',
      dataIndex: 'IsParallel',
      key: 'IsParallel',
      width: '5%',
    },{
      title: 'Has Reminder',
      dataIndex: 'HasReminder',
      key: 'HasReminder',
      width: '5%',
    },{
      title: 'Pending With',
      dataIndex: 'PendingWith',
      key: 'PendingWith',
      width: '20%',
    },{
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: '14%',
      render: (val) => <><span style={{ fontSize: '2.5rem', lineHeight: 0, position: 'relative', top: '7px', color: val === 'Completed' ? 'rgb(39, 124, 98)' : 'rgb(233 155 77)'}}>•</span>{val}</>
    },{
      title: 'Signed Document',
      dataIndex: 'SignedDocument',
      key: 'SignedDocument',
      width: '8%',
      render: (val) => val.length > 0 ? <a href={val} target='blank'>Download</a> : ''
    },{
      title: 'Preview Version',
      dataIndex: 'PreviewVersion',
      key: 'PreviewVersion',
      width: '8%',
      render: (val) => val.length > 0 ? <a href={val} target='blank'>Download</a> : ''
    }
  ];




  
  return (
    <div className='eSign-requests-container'>
      <div className='header'>
        <h1>eSign Requests</h1>
        <div className='controls'>
          {/* <Button type="primary" size='small' onClick={}><RedoOutlined /> Refresh</Button> */}
          <VerifySignatureModal />
          <Button size='small' href='https://salic.sharepoint.com/sites/newsalic/SitePages/eSign/NewRequest.aspx' target='blank'><PlusOutlined /> New Request</Button>
        </div>
      </div>

      <div className='table'>
        {
          windowSize.innerWidth > 768 
          ? <Table 
              columns={columns} 
              dataSource={eSign_requests} 
              pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
            />
          : <Table 
              columns={columns?.filter(r => r.dataIndex === 'Number' || r.dataIndex === 'Subject')} 
              dataSource={eSign_requests} 
              pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{paddingLeft: '10px'}}>
                    <><b>Status: </b>{<><span style={{ fontSize: '2.5rem', lineHeight: 0, position: 'relative', top: '7px', color: record.Status === 'Completed' ? 'rgb(39, 124, 98)' : 'rgb(233 155 77)'}}>•</span>{record.Status}</>}</><br/>
                    <><b>Pending With: </b>{record.PendingWith}</><br/>
                    <><b>Request Date: </b>{record.RequestDate}</><br/>
                    <><b>Recipients: </b>{record.Recipients}</><br/>
                    <><b>Is Parallel: </b>{record.IsParallel}</><br/>
                    <><b>Has Reminder: </b>{record.HasReminder}</><br/>
                    <><b>Signed Document: </b>{record.SignedDocument.length > 0 ? <a href={record.SignedDocument} target='blank'>Download</a> : ''}</><br/>
                    <><b>Preview Version: </b>{record.PreviewVersion.length > 0 ? <a href={record.PreviewVersion} target='blank'>Download</a> : ''}</><br/>
                  </div>
                ),
              }}
            />
        }
      </div>

    </div>
  )
}

export default ESignRequests