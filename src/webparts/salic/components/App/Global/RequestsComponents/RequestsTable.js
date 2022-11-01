import React, { useContext } from 'react'
import { Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { AppCtx } from '../../App';

function RequestsTable(props) {
  const { user_data } = useContext(AppCtx);

  return (
      <div className='table-page-container'>
        <div className='content'>
          <div className="header">
            <h1>{props.Title}</h1>
            <div style={{display: 'flex', gap: '10px'}}>
              {props.HeaderControlPanel}
            </div>
          </div>

          <div className='form' style={{overflowX: 'auto'}}>
              {
                !props.IsLoading
                ? <Table
                    columns={props.Columns} 
                    dataSource={!props.IsMyRequest ? props.DataTable : props.DataTable.filter(row => row.Author.EMail === user_data.Data.Mail)} 
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