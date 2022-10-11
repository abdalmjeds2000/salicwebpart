import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, DatePicker, message } from 'antd';
import moment from 'moment';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import EditableTable from '../../components/EditableTable/EditableTableBusinessGate';
import { AppCtx } from '../../../App';
import BusinessGateRequest from './API/BusinessGateRequest';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function BusinessGate() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [btnLoader, setBtnLoader] = useState(false)


  const [dataSource, setDataSource] = useState([{ key: 0, Name: "", Email: "", Mobile: "", Company: "", Car: false }]);


  async function CreateBusinessGateRequest(values) {
    setBtnLoader(true);
    let validation = true;
    for(let key in dataSource) {
      if(dataSource[key].Name === "") validation = false
    }

    if(validation) {
      values.Date = new Date(values.Date).toLocaleDateString();
      values.EndDate = new Date(values.EndDate).toLocaleDateString();
      const guests = dataSource.map(g => {
        delete g.key
        return {...g}
      })
      const formData = {
        Email: user_data?.Data?.Mail,
        ReferenceCode: "auto generated",
        Id: 0,
        Files: "",
        ...values,
        Guest: guests
      }

      const response = await BusinessGateRequest(formData);
      if(response.data) {
        form.resetFields();
        setDataSource([{ key: 0, Name: "", Email: "", Mobile: "", Company: "", Car: false }]);
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
          layout="horizontal"
          form={form} 
          onFinish={CreateBusinessGateRequest}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item name="Date" label="Expected Entry Date" rules={[{required: true,}]}>
            <DatePicker
              showTime 
              format="YYYY-MM-DD HH:mm" 
              disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))} 
              size='large'
              /* onChange={} onOk={} */ 
            />
          </Form.Item>
          <Form.Item name="EndDate" label="Expected Exit Date" rules={[{required: true,}]}>
            <DatePicker
              showTime 
              format="YYYY-MM-DD HH:mm" 
              disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))} 
              size='large'
              /* onChange={} onOk={} */ 
            />
          </Form.Item>

          <hr />

          <EditableTable dataSource={dataSource} setDataSource={setDataSource} />

          <hr />

          <SubmitCancel loaderState={btnLoader} />
        </Form>
      </FormPage>
    </>
  )
}

export default BusinessGate