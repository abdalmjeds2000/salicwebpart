import React, { useContext, useState } from 'react'
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import MaintenanceRequest from './API/MaintenanceRequest';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };

function Maintenance() {
  const [form] = Form.useForm();
  const { user_data, setMaintenanceData, defualt_route } = useContext(AppCtx);
  const [btnLoader, setBtnLoader] = useState(false);
  let navigate = useNavigate();


  async function CreateMaintenanceRequest(values) {
    setBtnLoader(true);
    const formData = {
      Email: user_data?.Data?.Mail,
      ReferenceCode: "auto generated",
      Files: "",
      Id: 0,
      ...values
    }
    if(values) {
      const response = await MaintenanceRequest(formData);
      if(response.data) {
        form.resetFields();
        message.success("The request has been sent successfully.")
        console.log(formData)
        setBtnLoader(false);
      } else {
        setBtnLoader(false);
        message.success("Failed to send request.")
      }
      
    } else {
      message.error("Failed to send request.")
      setBtnLoader(false);
    }
  }

  const onFinishFailed = () => { message.error("Please, fill out the form correctly.") }




  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
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
          <Form.Item name="Description" label="Descriptions" rules={[{required: true}]}>
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} />
        </Form>
      </FormPage>
    </>
  )
}

export default Maintenance