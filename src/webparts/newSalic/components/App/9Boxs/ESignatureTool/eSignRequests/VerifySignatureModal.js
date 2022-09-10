import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Popover, Table } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'

function VerifySignatureModal() {

  const [open, setOpen] = useState(false);
  const [signatureKey, setSignatureKey] = useState('');
  const [kaySignatureData, setKaySignatureData] = useState([]);

  const hide = () => {
    setOpen(!open);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };


  const columnsSignatureKey = [
    {
      title: '#',
      dataIndex: 'Number',
      key: 'Number',
      width: '5%',
    },{
      title: 'Inviter',
      dataIndex: 'CreatedByName',
      key: 'CreatedByName',
      width: '15%',
    },{
      title: 'Subject',
      dataIndex: 'EmailSubject',
      key: 'EmailSubject',
      width: '15%',
    },{
      title: 'Document Key',
      dataIndex: 'Key',
      key: 'Key',
      width: '15%',
    },{
      title: '#Of Pages',
      dataIndex: 'NumOfRecipients',
      key: 'NumOfRecipients',
      width: '15%',
    },{
      title: 'Recipients',
      dataIndex: 'Signatures',
      key: 'Signatures',
      render: (val) => val.map(e => e.EmailAddress + ' ' + e.Key.split('-').slice(0, 2).join().replace(',', '-')).join().replace(',', ' | '),
      width: '35%',
    }
  ];
  let verifySignatureHandlr = () => {
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/Signature/Verify?key=${signatureKey}`
    }).then((res) => {
      setKaySignatureData(res.data.Data)
      setSignatureKey('')
    })
  }
  return (
    <Popover
      content={
        <>
          <Input placeholder='enter signature key' onChange={(e) => setSignatureKey(e.target.value)} value={signatureKey} />
          {kaySignatureData.length > 0 ? <Table columns={columnsSignatureKey} dataSource={kaySignatureData} /> : null}
          <Button onClick={verifySignatureHandlr} disabled={signatureKey.length === 0 ? true : false} type="primary" icon={<SearchOutlined />}>
            Verify
          </Button>
        </>
      }
      title="Verify Signature"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">Verify Signature</Button>
    </Popover>
  )
}

export default VerifySignatureModal