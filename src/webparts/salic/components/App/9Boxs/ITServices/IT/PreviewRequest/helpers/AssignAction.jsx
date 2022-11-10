import React, { useState, useContext } from 'react';
import { Button, message, Modal, Select, Typography } from 'antd';
import { AppCtx } from '../../../../../App';
import { SendOutlined } from '@ant-design/icons';

function AssignAction(props) {
  const { user_data } = useContext(AppCtx);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const assignAction = () => {
    if(selectedEmp) {
      const payload = {
        Email: user_data.Data.Mail,
        ToUser: selectedEmp,
        ByUser: user_data.Data.Mail,
        ServiceRequestId: props.RequestId
      }
      console.log('assign payload', payload)
    } else {
      message.error("Select Employee First!")
    }
  }
  return (
    <>
      <Button size="middle" type='primary' onClick={() => setOpenModal(true)}>Assign</Button>
      <Modal 
        title={<><SendOutlined /> Assign Service Request</>}
        open={openModal} 
        onOk={assignAction} 
        onCancel={() => setOpenModal(false)}
        okButtonProps={{type: 'primary', danger: true}} 
        okText="Assign"
      >
        <Typography.Text strong>Select Employee</Typography.Text>
        <Select value={selectedEmp} size="large" placeholder="Select Employee" onChange={value => setSelectedEmp(value)} style={{width: '100%'}}>
          {
            props.EmployeesList?.map((emp, i) => (
              <Select.Option value={emp.Mail} key={i}>{emp.DisplayName}</Select.Option>
            ))
          }
        </Select>
      </Modal>
    </>
  )
}

export default AssignAction