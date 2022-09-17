import React, { useContext, useState } from 'react'
import { Form, Input, message } from 'antd';
import { NavLink } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import AddMaintenanceRequest from './API/AddMaintenanceRequest.js';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };

function Maintenance() {
  const [form] = Form.useForm();
  const { user_data, setMaintenanceData, defualt_route } = useContext(AppCtx);
  const [btnLoader, setBtnLoader] = useState(false)
  
  async function CreateMaintenanceRequest(values) {
    setBtnLoader(true);
    const response = await AddMaintenanceRequest(values);
    if(response.data) {
      form.resetFields();
      message.success("The request has been sent successfully.")
      setBtnLoader(false);
      setMaintenanceData(prev => [response.data, ...prev])
    } else {
      message.error("Failed to send request.")
      setBtnLoader(false);
    }
  }

  const onFinishFailed = () => {
    message.error("Please, fill out the form correctly.")
  }
  

  return (
    <>
      <HistoryNavigation>
        <NavLink to={`${defualt_route}/admin-services`}>Admin Service</NavLink>
        <p>Maintenance Request</p>
      </HistoryNavigation>
      

      <FormPage
        user_data={user_data}
        pageTitle='New Maintenance Request'
        tips_userInfo={[
          {title: 'SALIC', text: user_data.Data?.Department},
          {title: 'Nationality', text: user_data.Data?.Nationality},
          {title: 'ID #', text: user_data.Data?.Id},
        ]}
        tipsList={[
          "Fill out required fields carefully.",
          "Check your email regularly. You will receive a notification on every future actions",
        ]}
      >
        <Form 
          {...layout} 
          form={form}
          colon={false}
          labelWrap 
          name="service-request" 
          onFinish={CreateMaintenanceRequest} 
          onFinishFailed={onFinishFailed}
          layout="horizontal"
        >

          <Form.Item name='Date' label="Date" rules={[{required: true,}]} initialValue={moment().format('MM-DD-YYYY hh:mm')} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>
          
          <hr />

          <Form.Item name="Requester" label="Requester">
            <Input placeholder='full name' size='large' />
          </Form.Item>
          <Form.Item name="Location" label="Location" rules={[{required: true}]} >
            <Input placeholder='Location' size='large' />
          </Form.Item>
          <Form.Item name="Descriptions" label="Descriptions" rules={[{required: true}]}>
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} />
        </Form>
      </FormPage>
    </>
  )
}

export default Maintenance