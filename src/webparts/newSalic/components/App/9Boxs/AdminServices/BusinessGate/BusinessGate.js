import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Form, DatePicker } from 'antd';
import moment from 'moment';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import EditableTable from '../../components/EditableTable/EditableTableBusinessGate';
import { AppCtx } from '../../../App';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function BusinessGate() {
  const { user_data } = useContext(AppCtx);
  const [dataSource, setDataSource] = useState([]);

  return (
    <>
      <HistoryNavigation>
        <NavLink to="/admin-services">Admin Service</NavLink>
        <p>Business Gate Request</p>
      </HistoryNavigation>
      

      <FormPage
        user_data={user_data}
        pageTitle='New Business Gate Entry'
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
          name="business-gate" 
          onFinish={values => console.log(values)} /* validateMessages={validateMessages} */
          layout="horizontal"
        >

          <Form.Item name="Expected Entry Date" label="Expected Entry Date" rules={[{required: true,}]}>
            <DatePicker
              showTime 
              format="YYYY-MM-DD HH:mm" 
              disabledDate={current => current && current < moment().endOf('day')} 
              size='large'
              /* onChange={} onOk={} */ 
            />
          </Form.Item>
          <Form.Item name="Expected Exit Date" label="Expected Exit Date">
            <DatePicker
              showTime 
              format="YYYY-MM-DD HH:mm" 
              disabledDate={current => current && current < moment().endOf('day')} 
              size='large'
              /* onChange={} onOk={} */ 
            />
          </Form.Item>

          <hr />

          <EditableTable dataSource={dataSource} setDataSource={setDataSource} />

          <hr />

          <SubmitCancel formSubmitHandler={_ => {alert('Submit')}} />
        </Form>
      </FormPage>
    </>
  )
}

export default BusinessGate