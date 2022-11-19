import React from 'react';
import { Table } from 'antd';
import AntdLoader from '../AntdLoader/AntdLoader';

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
                : <AntdLoader />
              }
          </div>
        </div>
      </div>
  )
}

export default RequestsTable