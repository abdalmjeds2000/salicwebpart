import React, { useContext } from 'react'
import { Button, Col, Form, Input, message, Upload, Radio, Row, Select, Space, DatePicker, InputNumber } from 'antd';
import { NavLink } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';

const { Option } = Select;
const { Dragger } = Upload;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };



function Maintenance() {
  const { user_data, defualt_route } = useContext(AppCtx);

  let getDateAndTime = () => {
    const today = new Date();
    const date = today.getDate() +'-'+ (today.getMonth()+1)+'-' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() 
    return date + ' ' + time
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
          colon={false}
          labelWrap 
          name="service-request" 
          onFinish={values => console.log(values)} /* validateMessages={validateMessages} */
          layout="horizontal"
        >

          <Form.Item name={'date'} label="Date" rules={[{required: true,}]} initialValue={getDateAndTime()} >
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

          <SubmitCancel formSubmitHandler={_ => {alert('Submit')}} />
        </Form>
      </FormPage>
    </>
  )
}

export default Maintenance