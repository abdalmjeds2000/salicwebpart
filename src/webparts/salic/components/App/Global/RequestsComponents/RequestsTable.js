import React from 'react';
import { Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function RequestsTable(props) {

  return (
      <div className='table-page-container'>
        <div className='content'>
          <div className="header">
            <h1>{props.Title}</h1>
            <div>
              {props.HeaderControlPanel}
            </div>
          </div>

          <div className='form' style={{overflowX: 'auto'}}>
              {
                !props.IsLoading
                ? <Table
                    columns={props.Columns} 
                    dataSource={props.DataTable} 
                    pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
                    size="small"
                  />
                : <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
              }
          </div>
        </div>
      </div>
  )
}

export default RequestsTable