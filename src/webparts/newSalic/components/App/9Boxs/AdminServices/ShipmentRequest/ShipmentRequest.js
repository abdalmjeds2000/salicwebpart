import React, { useContext, useState } from 'react'
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';



const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };


function Shipment() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [btnLoader, setBtnLoader] = useState(false)



  async function CreateShipmentRequest(values) {
    setBtnLoader(true);
    // const response = await AddMaintenanceRequest(values);
    // if(response.data)
    if(values) {
      const formData = {
        Email: user_data?.Data?.Mail,
        Requester: user_data?.Data?.Mail,
        ...values
      }
      console.log(formData);
      form.resetFields();
      message.success("The request has been sent successfully.")
      setBtnLoader(false);
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
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>Shipment Request</p>
      </HistoryNavigation>

      <FormPage
        user_data={user_data}
        pageTitle='New Shipment Request'
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
          colon={false}
          labelWrap 
          name="service-request"
          form={form} 
          onFinish={CreateShipmentRequest}
          onFinishFailed={onFinishFailed}
          layout="horizontal"
        >

          <Form.Item name='Date' label="Date" rules={[{required: true,}]} initialValue={moment().format('MM-DD-YYYY hh:mm')} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>
          
          <hr />

          <Form.Item name="SenderMobile" label="Sender Mobile" rules={[{required: true}]} >
            <Input placeholder='sender name or mobile number' size='large' />
          </Form.Item>
          <Form.Item name="SourceAddress" label="Source Address" rules={[{required: true}]} >
            <Input placeholder='from location' size='large' />
          </Form.Item>
          <Form.Item name="ReceiverMobile" label="Receiver Mobile" rules={[{required: true}]} >
            <Input placeholder='Receiver name or mobile number' size='large' />
          </Form.Item>
          <Form.Item name="DestinationAddress" label="Destination Address" rules={[{required: true}]} >
            <Input placeholder='to location' size='large' />
          </Form.Item>
          <Form.Item name="Descriptions" label="Descriptions">
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} />
        </Form>
      </FormPage>
    </>
  )
}

export default Shipment