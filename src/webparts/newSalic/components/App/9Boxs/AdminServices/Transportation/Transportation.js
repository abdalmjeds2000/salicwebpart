import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Radio, Row, DatePicker } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import EditableTable from '../../components/EditableTable/EditableTableTransportation';
import { AppCtx } from '../../../App';

const { Search } = Input;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function TransportationRequest() {
  const { user_data, defualt_route } = useContext(AppCtx);
  const [serivceType, setSerivceType] = useState('');
  const [dataSource, setDataSource] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    console.log(dataSource)
  }, [dataSource])


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
          onFinish={values => console.log(values)} /* validateMessages={validateMessages} */
          layout="horizontal"
        >

          <Form.Item name="Date" label="Date" rules={[{required: true,}]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={current => current && current < moment().endOf('day')} size='large'/* onChange={} onOk={} */ />
          </Form.Item>
          <Form.Item name="From" label="From" rules={[{required: true}]} >
            <Row gutter={[0, 5]}>
              <Input placeholder='' size='large' gutter={10} />
              <Search 
                placeholder="google map link" 
                allowClear 
                enterButton={<a href='https://www.google.com/maps' target="blank"><EnvironmentOutlined /></a>}
              />
            </Row>
          </Form.Item>
          <Form.Item name="To" label="To" rules={[{required: true}]} >
            <Row gutter={[0, 5]}>
              <Input placeholder='' size='large' gutter={10} />
              <Search 
                placeholder="google map link" 
                allowClear 
                enterButton={<a href='https://www.google.com/maps' target="blank"><EnvironmentOutlined /></a>}
              />
            </Row>
          </Form.Item>
          
          <hr />
          
          <Form.Item name="Serivce Type" label="Serivce Type">
            <Radio.Group
              options={[{label: 'One Way', value: 'One Way'}, {label: 'Round Trip', value: 'Round Trip'}]}
              onChange={ ({target: {value}}) => setSerivceType(value) }
              value={serivceType}
              optionType="button"
              buttonStyle="solid"
              style={{width: '100%'}}
              defaultValue="One Way"
            />
          </Form.Item>
          {serivceType === 'Round Trip' && 
          <Form.Item name="Waiting Time" label="Waiting Time">
            <Input placeholder='' size='large' />
          </Form.Item>}
          
          <hr />

          <EditableTable dataSource={dataSource} setDataSource={setDataSource} />

          <hr />

          <SubmitCancel formSubmitHandler={_ => {alert('Submit')}} />
        </Form>
      </FormPage>
    </>
  )
}

export default TransportationRequest