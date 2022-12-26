import React from 'react';
import { Empty, Table } from 'antd';
import AntdLoader from '../AntdLoader/AntdLoader';

function RequestsTable(props) {
  return (
      <div className='table-page-container' style={props.containerStyle}>
        <div className='content'>
          <div className="header" style={props.headerStyle}>
            <h1>{props.Title}</h1>
            <div>
              {props.HeaderControlPanel}
            </div>
          </div>

          <div className='form' style={{overflowX: 'auto'}}>
              {
                !props.IsLoading
                ? (
                  props.DataTable.length > 0
                  ? <Table
                      columns={props.Columns} 
                      dataSource={props.DataTable} 
                      pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true, style: {padding: '25px 0'} }} 
                      size="middle"
                    />
                  : <Empty />
                )
                : <AntdLoader />
              }
          </div>
        </div>
      </div>
  )
}

export default RequestsTable