import React from 'react';
import { Button, Modal, Select, Table } from 'antd';
import { useState } from 'react';
import { SyncOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';

const ShareWith = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  const [dataLoader, setDataLoader] = useState(true)

  let getShareWith = () => {
    setOpenModal(true)
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/Library/GetDocumentPermissions?DocumentId=${props.Id}`
    }).then((res) => {
      const Rows = res.data.Data.map((r, i) => {
        return { 
          id: i,
          Number: i+1, 
          UserName: r.Title, 
          Roles: r.Roles[0]?.Name, 
          Action: r.Roles[0]?.Name === "Full Control" ? '-' : "Delete"
        }
      })
      setDataLoader(false)
      setData(Rows)
    }).catch(err => {
      console.log(err); 
      setDataLoader(false)
    })
  }



  const columns = [
    {
      title: '#',
      dataIndex: 'Number',
      key: 'Number',
      width: '3%'
    },{
      title: 'User Name',
      dataIndex: 'UserName',
      key: 'UserName',
      width: '70%'
    },{
      title: 'Roles',
      dataIndex: 'Roles',
      key: 'Roles',
      width: '15%'
    },{
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      width: '12%',
      render: (val) => val !== '-' && <a>{val}</a>
    },
  ]
  return (
    <>
      <a onClick={getShareWith}><SyncOutlined /> Share With</a>
      <Modal
        title="Share With"
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        okButtonProps={{ style: {display: 'none'}}}
      >

        <div style={{marginBottom: '15px', display: 'flex', flexDirection: '', justifyContent: 'flex-end', gap: '10px'}}>
          <Select
            showSearch
            style={{width: '100%'}}
            placeholder="Type to add new users"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Select.Option value="1">Defualt User</Select.Option>
            <Select.Option value="2">Defualt User</Select.Option>
            <Select.Option value="3">Defualt User</Select.Option>
            <Select.Option value="4">Defualt User</Select.Option>
          </Select>
          <Button type="primary" icon={<UserAddOutlined />}>Add</Button>
        </div>

        {
          !dataLoader
          ? <div style={{overflowX: 'auto'}}>
              <Table 
                columns={columns} 
                dataSource={data} 
                pagination={{position: ['none', 'bottomCenter'], pageSize: 10, hideOnSinglePage: true }} 
              />
            </div>
          : <div className='loader' style={{position: 'relative'}}><div style={{width: '40px', height: '40px'}}></div></div>
        }
      </Modal>
    </>
  );
}
export default ShareWith;