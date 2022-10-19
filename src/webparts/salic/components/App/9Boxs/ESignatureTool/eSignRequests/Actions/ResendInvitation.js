import React from 'react';
import { message, Modal, Table } from 'antd';
import { useState } from 'react';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import axios from 'axios';

const ResendInvitation = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  const [dataLoader, setDataLoader] = useState(true)

  let getInvitation = () => {
    setOpenModal(true)
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/Signature/Recipients?eDocumentId=${props.Id}`
    }).then((res) => {
      const Rows = res.data.Data.map((r, i) => {
        return { 
          id: i,
          Number: i+1, 
          EmailAddress: r.EmailAddress, 
          Action: r.Status === "Signed" ? `Signed At ${r.Modified.replace('T', ' ').slice(0, -1)}` : {DocumentId: props.Id, Email: r.EmailAddress, Key: r.Key} 
        }
      })
      setDataLoader(false)
      setData(Rows)
    }).catch(err => {
      console.log(err); 
      setDataLoader(false)
    })
  }

  let sendInvite = (val) => {
    axios({
      method: "POST",
      url: "https://salicapi.com/api/Signature/Invite",
      data: val
    }).then((res) => {
      res.data.Status === 200
      ? message.success("The invitation has been sent successfully!")
      : message.success("Failed to send invitation!")
    }).catch(err => {
      console.log(err)
      message.error("Something Wrong!")
    })
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'Number',
      key: 'Number',
      width: '3%'
    },{
      title: 'Recipient Name',
      dataIndex: 'EmailAddress',
      key: 'EmailAddress',
      width: '55%'
    },{
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      width: '55%',
      render: (val) => typeof(val) !== "object" ? <><CheckCircleOutlined /> {val}</> : <a onClick={() => sendInvite(val)}>Invite</a>
    },
  ]
  return (
    <>
      <a onClick={getInvitation}><SyncOutlined /> Resend Invitation</a>
      <Modal
        title="Resend Invitation"
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        okButtonProps={{ style: {display: 'none'}}}
      >
        {
          !dataLoader
          ? <Table 
              columns={columns} 
              dataSource={data} 
              pagination={{position: ['none', 'bottomCenter'], pageSize: 10, hideOnSinglePage: true }} 
            />
          : <div className='loader' style={{position: 'relative'}}><div style={{width: '40px', height: '40px'}}></div></div>
        }
      </Modal>
    </>
  );
}
export default ResendInvitation;