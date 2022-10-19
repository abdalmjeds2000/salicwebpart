import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Radio, Row, DatePicker, message } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import EditableTable from '../../components/EditableTable/EditableTableTransportation';
import { AppCtx } from '../../../App';
import TransportationRequest from './API/TransportationRequest';
const { Search } = Input;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function Transportation() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [btnLoader, setBtnLoader] = useState(false)
  const [serivceType, setSerivceType] = useState('OneWay');
  
  const [passenger, setPassenger] = useState([{ key: 0, Name: '', Phone: '', Reason: '' }]);


  async function CreateBusinessGateRequest(values) {
    setBtnLoader(true);
    let validation = true;
    for(let key in passenger) {
      if(passenger[key].Name === "" || passenger[key].Phone === "" || passenger[key].Reason === "") validation = false
    }

    if(validation) {
      values.Date = new Date(values.Date).toLocaleDateString();
      const passengers = passenger.map(p => {
        delete p.key
        return {...p}
      })
      const formData = {
        Email: user_data?.Data?.Mail,
        ReferenceCode: "auto generated",
        Files: "",
        Id: 0,
        ...values,
        Passenger: passengers
      }

      const response = await TransportationRequest(formData);
      if(response.data) {
        form.resetFields();
        setSerivceType("OneWay")
        setPassenger([{ key: 0, Name: '', Phone: '', Reason: '' }]);
        message.success("The request has been sent successfully.")
        setBtnLoader(false);
        console.log(formData);
      } else {
        message.error("Failed to send request.")
        setBtnLoader(false);
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
        <p>Transportation Request</p>
      </HistoryNavigation>
      

      <FormPage
        user_data={user_data}
        pageTitle='New Transportation Request'
        tips_userInfo={[
          {title: 'SALIC', text: user_data.Data?.Department},
          {title: 'Nationality', text: user_data.Data?.Nationality},
          {title: 'ID #', text: user_data.Data?.Id},
        ]}
        tipsList={[
          "Fill out required fields carefully.",
          "Check your email regularly. You will receive a notification on every future actions",
          "For additional information, Please contact administrative office or call us at +966 55 5040 314"
        ]}
      >
        <Form 
          {...layout} 
          colon={false}
          labelWrap 
          name="service-request" 
          layout="horizontal"
          form={form} 
          onFinish={CreateBusinessGateRequest}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item name="Date" label="Date" rules={[{required: true,}]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))} size='large' /* onChange={} onOk={} */ />
          </Form.Item>
          <Form.Item name="From" label="From" rules={[{required: true}]} style={{marginBottom: '12px'}}>
            <Input placeholder='' size='large' gutter={10} />
          </Form.Item>
          <Form.Item name="FromLink" label="From Link" rules={[{required: true}]} >
            <Search 
              placeholder="google map link" 
              allowClear 
              enterButton={<a href='https://www.google.com/maps' target="blank"><EnvironmentOutlined /></a>}
            />
          </Form.Item>
          <Form.Item name="To" label="To" rules={[{required: true}]} style={{marginBottom: '12px'}}>
            <Input placeholder='' size='large' gutter={10} />
          </Form.Item>
          <Form.Item name="ToLink" label="To Link" rules={[{required: true}]} >
            <Search 
              placeholder="google map link" 
              allowClear 
              enterButton={<a href='https://www.google.com/maps' target="blank"><EnvironmentOutlined /></a>}
            />
          </Form.Item>
          <hr />
          
          <Form.Item name="ServiceType" label="Serivce Type" initialValue="OneWay">
            <Radio.Group
              options={[{label: 'One Way', value: 'OneWay'}, {label: 'Round Trip', value: 'RoundTrip'}]}
              onChange={ ({target: {value}}) => setSerivceType(value) }
              value={serivceType}
              optionType="button"
              buttonStyle="solid"
              style={{width: '100%'}}
              size="large"
              defaultValue="One Way"
            />
          </Form.Item>
          {serivceType === 'RoundTrip' && 
          <Form.Item name="WaitingTime" label="Waiting Time">
            <Input placeholder='' size='large' />
          </Form.Item>}
          
          <hr />

          <EditableTable dataSource={passenger} setDataSource={setPassenger} />

          <hr />

          <SubmitCancel loaderState={btnLoader} />
        </Form>
      </FormPage>
    </>
  )
}

export default Transportation