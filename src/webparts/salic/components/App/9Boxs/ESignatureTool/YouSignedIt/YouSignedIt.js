import { Button, Modal, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { AppCtx } from '../../../App'

function YouSignedIt() {
  const { eSign_requests_you_signed_it } = useContext(AppCtx)

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
      width: '40%',
      ellipsis: true,
    },{
      title: 'Invitor',
      dataIndex: 'Invitor',
      key: 'Invitor',
      width: '20%',
    },{
      title: 'Signed Date',
      dataIndex: 'SignedDate',
      key: 'Signed-Date',
      width: '25%',
    },{
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      width: '12%',
      render: (val) => <a href={`https://salicapi.com/esign/sign.html?key=${val}`} target='_blank'>View</a>
    }
  ];

  return (
    <div className='eSign-requests-container'>
      <div className='header'>
        <h1>eSign Documents You Signed it</h1>
      </div>

      <div className='table'>
        {
          eSign_requests_you_signed_it.length > 0 
          ? <Table
              columns={columns}
              dataSource={eSign_requests_you_signed_it} 
              pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
            />
          : <div className='loader' style={{position: 'relative'}}><div style={{width: '40px', height: '40px'}}></div></div>
        }
      </div>
    </div>
  )
}

export default YouSignedIt