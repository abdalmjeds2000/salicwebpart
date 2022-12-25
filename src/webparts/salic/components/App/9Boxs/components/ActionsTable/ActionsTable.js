import { Table, Tabs, Tag } from 'antd';
import React from 'react';
import moment from 'moment';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import UserColumnInTable from '../../../Global/UserColumnInTable/UserColumnInTable';
import FileIcon from '../../../Global/RequestsComponents/FileIcon';


function ActionsTable(props) {
  const columns = [
    {
      title: 'Message',
      dataIndex: 'Description',
      width: '40%',
      render: (val, record) => <div style={{display: 'grid', gap: '10px', minWidth: '150px'}}>
        <div>
          {
            record.Type === "FYI"
              ? val
            : record.Type === "FIN" 
              ? record.Description === "" ? <>Action has been taken by <b>{record.ByUser.DisplayName}</b></> : <>{record.Description}</>
            : ' - '
          }
        </div>
        <div>
          {
            record.Type === "FIN"
            ? record.Files.map((file, i) => {
                return <FileIcon
                  key={i} 
                  FileType={file.FileName.split('.')[file.FileName.split('.').length-1]}
                  FileName={file.FileName}
                  FilePath={file.Path}
                  IconWidth='30px'
                />
              })
            : null
          }
        </div>
      </div>
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      width: '20%',
      render: (val) => moment(val).format("MM/DD/YYYY hh:mm")
    },
    {
      title: 'Status',
      dataIndex: 'Type',
      width: '15%',
      render: (val) => val === "FYI" 
        ? <Tag icon={<SyncOutlined spin />} color="processing">Reviewed</Tag> 
        : val === "FIN" ? <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag> 
        : ' - '
    },
    {
      title: 'Action By',
      dataIndex: 'ByUser',
      width: '25%',
      render: (val) => <UserColumnInTable Mail={val?.Mail} DisplayName={val?.DisplayName}  />
    },
  ];
  

  return (
    <div>
      <Tabs type='card'>
        <Tabs.TabPane tab="Actions History" key="item-1">
          <Table columns={columns} dataSource={props.ActionData} size="middle" pagination={false} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default ActionsTable