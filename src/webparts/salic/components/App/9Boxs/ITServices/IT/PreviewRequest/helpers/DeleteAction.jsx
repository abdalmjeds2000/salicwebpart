import React, { useState } from 'react';
import { Button, Form, message, Modal, Popconfirm, Typography } from 'antd';
import DeleteSeriveRequest from '../../../API/DeleteSeriveRequest';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';


function DeleteAction({ RequestId }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [reasonValue, setReasonValue] = useState('');
  
  
  const deleteAction = async () => {
    if(reasonValue.length > 0) {
      setBtnLoading(true);
      const DeleteRequest = await DeleteSeriveRequest(RequestId, reasonValue);
      message.success("Service request has been deleted");
      console.log('request has been cancelled ===>', `#${RequestId}`, DeleteRequest)
      setIsShowing(false);
      setBtnLoading(false);
      setOpenModal("");
      setReasonValue(false);
    } else message.error("Please, write reason of canceled");
  }
  return (
    <>
      {
      isShowing &&
      <> 
        <Button size="middle" onClick={() => setOpenModal(true)} type='primary' danger>Cancel</Button>
        <Modal
          title={<><DeleteOutlined /> Cancel Request #{RequestId}</>}
          open={openModal} 
          onOk={deleteAction} 
          cancelButtonProps={{style: {display: 'none'}}}
          onCancel={() => setOpenModal(false)}
          okButtonProps={{type: 'primary', danger: true, disabled: btnLoading}} 
          okText="Cancel Request"
          destroyOnClose
        >
          <div>
            <Typography.Text strong>Write Cancel Reason</Typography.Text>
            <TextArea rows={4} placeholder="write here" value={reasonValue} onChange={e => setReasonValue(e.target.value)} />
          </div>
        </Modal>
      </>
      }
    </>
  )
}

export default DeleteAction