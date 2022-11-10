import React, { useContext } from 'react';
import { Button } from 'antd';
import { AppCtx } from '../../../../../App';

function ApproveAction() {
  const { user_data } = useContext(AppCtx);

  const approveAction = (status) => {
    console.log('request has been ===>', status)
  }
  return (
    <>
      <Button size="middle" type='primary' onClick={() => approveAction("APPROVED")}>Approve</Button>
      <Button size="middle" type='primary' danger onClick={() => approveAction("REJECTED")}>Reject</Button>
    </>
  )
}

export default ApproveAction