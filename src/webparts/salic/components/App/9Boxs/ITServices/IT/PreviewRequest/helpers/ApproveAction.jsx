import React, { useState } from 'react';
import { Button, message } from 'antd';
import RejectSeriveRequest from '../../../API/RejectSeriveRequest';
import ApproveSeriveRequest from '../../../API/ApproveSeriveRequest';

function ApproveAction({ RequestId }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

  const approveAction = async (status) => {
    setBtnLoading(true);
    if(status === "APPROVED") {
      const ApproveRequest = await ApproveSeriveRequest(RequestId);
      message.success("Service request has been accepted successfully");
      console.log('request has been ===>', `#${RequestId}`, ApproveRequest);
    } else if(status === "REJECTED") {
      const RejectRequest = await RejectSeriveRequest(RequestId);
      message.success("Service request has been rejected successfully");
      console.log('request has been ===>', `#${RequestId}`, RejectRequest);
    }
    setIsShowing(false);
    setBtnLoading(false);
  }

  return (
    <>
      {isShowing && <>
        <Button disabled={btnLoading} size="middle" type='default' onClick={() => approveAction("APPROVED")}>Approve</Button>
        <Button disabled={btnLoading} size="middle" type='primary' danger onClick={() => approveAction("REJECTED")}>Reject</Button>
      </>}
    </>
  )
}

export default ApproveAction