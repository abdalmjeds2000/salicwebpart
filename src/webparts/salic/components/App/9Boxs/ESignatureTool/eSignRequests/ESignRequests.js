import React, { useContext } from 'react'
import './ESignRequests.css';
import { CheckCircleOutlined, CheckOutlined, DeleteOutlined, FileTextOutlined, MoreOutlined, PlusOutlined, StopOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Menu, message, Popconfirm, Row, Table, Tag, Typography } from 'antd'
import { AppCtx } from '../../../App';
import axios from 'axios';
import VerifySignatureModal from './Actions/VerifySignatureModal';
import ResendInvitation from './Actions/ResendInvitation';
import ShareWith from './Actions/ShareWith';
import { GoCheck } from 'react-icons/go';
import { VscChromeClose } from 'react-icons/vsc';





function ESignRequests() {
  const { eSign_requests, setESignRequests } = useContext(AppCtx)



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
      width: '3%',
    },{
      title: 'Subject',
      dataIndex: 'Subject',
      key: 'Subject',
      width: '100%',
      render: (text) => {
        const currentRow = eSign_requests.filter(r => r.Subject === text)[0];
        return (
          <div className='eSign-subject'>
            <Typography.Link href={`https://salicapi.com/eSign/Sign.html?key=${text.split('__KEY__')[1]}`} target='_blank' style={{display: 'inline'}}>
              {currentRow.IsActive ? text.split('__KEY__')[0] : <> <StopOutlined style={{color: 'var(--brand-red-color)'}} /> {text.split('__KEY__')[0]}</> }
            </Typography.Link>
            <span className='eSign-more-btn'>
              <Dropdown overlay={menu(currentRow.Id, currentRow.IsActive, currentRow.Status, currentRow.Key)} trigger={['click']}>
                <Typography.Link strong style={{marginLeft: '15px'}}><MoreOutlined /></Typography.Link>
              </Dropdown>
            </span>
          </div>
        )
      },
    },{
      title: 'Request Date',
      dataIndex: 'RequestDate',
      key: 'RequestDate',
      width: '10%',
      render: v => <div style={{minWidth: 170}}>{v}</div>
    },{
      title: 'Recipients',
      dataIndex: 'Recipients',
      key: 'Recipients',
      width: '5%',
      render: v => <div style={{textAlign: 'center'}}>{v}</div>
    },{
      title: 'Is Parallel',
      dataIndex: 'IsParallel',
      key: 'IsParallel',
      width: '5%',
      render: val => <div style={{minWidth: 90}}>{val === "True" ? <span><GoCheck style={{color: 'var(--brand-green-color)'}} /> True</span> : <span><VscChromeClose style={{color: 'var(--brand-red-color)'}} /> False</span>}</div>
    },{
      title: 'Has Reminder',
      dataIndex: 'HasReminder',
      key: 'HasReminder',
      width: '5%',
      render: val => <div style={{minWidth: 110}}>{val === "True" ? <span><GoCheck style={{color: 'var(--brand-green-color)'}} /> True</span> : <span><VscChromeClose style={{color: 'var(--brand-red-color)'}} /> False</span>}</div>
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
      render: (val) => {
        const v = typeof val == "string" ? val?.toLowerCase() : "";
        switch(v) {
          case "completed":
            return <div style={{minWidth: 100}}><Tag icon={<CheckCircleOutlined />} color="success">Completed</Tag></div>
          case "pending":
            return <div style={{minWidth: 100}}><Tag icon={<SyncOutlined />} color="warning">Pending</Tag></div>
          default:
            return <div style={{minWidth: 100}}><Tag color="default">{val}</Tag></div>
        }
      }
    },{
      title: 'Signed Document',
      dataIndex: 'SignedDocument',
      key: 'SignedDocument',
      width: '8%',
      render: (val) => val.length > 0 ? <a style={{textAlign: 'center', minWidth: 140, display: 'block'}} href={val} target='blank'>Download</a> : ''
    },{
      title: 'Preview Version',
      dataIndex: 'PreviewVersion',
      key: 'PreviewVersion',
      width: '8%',
      render: (val) => val.length > 0 ? <a style={{textAlign: 'center', minWidth: 120, display: 'block'}} href={val} target='blank'>Download</a> : ''
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
        <Row>
          <Col xs={0} md={24}>
            <Table 
              columns={columns} 
              dataSource={eSign_requests} 
              pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
            />
          </Col>
          <Col xs={24} md={0}>
            <Table 
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
          </Col>
        </Row>
      </div>

    </div>
  )
}

export default ESignRequests