import React, { useContext, useState } from 'react'
import './ESignRequests.css';
import { CheckOutlined, DeleteOutlined, DownOutlined, SearchOutlined, StopOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Menu, message, Modal, Popconfirm, Space, Table } from 'antd'
import { AppCtx } from '../../../App';
import axios from 'axios';




function ESignRequests() {
  const { eSign_requests, setESignRequests } = useContext(AppCtx)
  


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

  const menu = (Id, IsActive, Status) => {
    const Items = [
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
              {IsActive ? <><StopOutlined color='rgb(255, 39, 43)' /> Withdraw</> : <><CheckOutlined /> Enable</>}
            </a>
          </Popconfirm>
        ),
      },
      {
        key: '2',
        label: (
          <a><SyncOutlined /> Resend Invitation</a>
        ),
      },Status === 'Pending' ? {
        key: '3',
        label: (
          <a><SyncOutlined /> Share With</a>
        ),
      } : {},
      {
        key: '4',
        danger: true,
        label: (
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => confirmDelete(Id)}
            okText='Delete'
            cancelText="Cancel"
          >
            <a>
              <DeleteOutlined /> Delete
            </a>
          </Popconfirm>
        ),
      },
    ]
    return (
      <Menu
        items={Items}
      />
    )
  };
  
  const columns = [
    {
      title: '#',
      dataIndex: 'Number',
      key: 'Number',
      width: '3%',
    },{
      title: 'Subject',
      dataIndex: 'Subject',
      key: 'Subject',
      width: '22%',
      render: (text) => {
        const currentRow = eSign_requests.filter(r => r.Subject === text)[0];
        return (
          <Dropdown overlay={menu(currentRow.Id, currentRow.IsActive, currentRow.Status)} trigger={['click']}>
            <a href={`https://salicapi.com/eSign/Sign.html?key=${text.split('__KEY__')[1]}`} target='blank' onClick={(e) => e.preventDefault()}>
              <Space>
                {currentRow.IsActive ? text.split('__KEY__')[0] : <> <StopOutlined color='rgb(255, 39, 43)' /> {text.split('__KEY__')[0]}</> }
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
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
          <Input placeholder="type to search" prefix={<SearchOutlined />} />
          <Button type="primary">Verify Signature</Button>
          <Button href='https://salic.sharepoint.com/sites/newsalic/SitePages/eSign/NewRequest.aspx' target='blank'>New Request</Button>
        </div>
      </div>

      <div className='table'>
        {
          eSign_requests.length > 0 
          ? <Table 
              columns={columns} 
              dataSource={eSign_requests} 
              pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
            />
          : <div className='loader' style={{position: 'relative'}}><div style={{width: '40px', height: '40px'}}></div></div>
        }
      </div>

    </div>
  )
}

export default ESignRequests