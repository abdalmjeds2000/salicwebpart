import React, { useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import DeleteSeriveRequest from '../../../API/DeleteSeriveRequest';


function DeleteAction({ RequestId }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

  const deleteAction = async () => {
    setBtnLoading(true);
    const DeleteRequest = await DeleteSeriveRequest(RequestId);
    message.success("Service request has been deleted");
    console.log('request has been ===>', `#${RequestId}`, DeleteRequest)
    setIsShowing(false);
    setBtnLoading(false);
  }
  return (
    <Popconfirm placement="topLeft" title="Are you sure to delete this Request?" onConfirm={deleteAction} okButtonProps={{disabled: btnLoading, danger: true}} okText="Yes" cancelText="No">
      {isShowing && <Button size="middle" type='primary' danger>Delete</Button>}
    </Popconfirm>
  )
}

export default DeleteAction