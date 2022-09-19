import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import AddMaintenanceRequestItem from './API/AddMaintenanceRequest.js';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };

function UpdateMaintenance() {
  const [form] = Form.useForm();
  const { user_data, maintenance_data, defualt_route } = useContext(AppCtx);
  const [btnLoader, setBtnLoader] = useState(false)

  let { id } = useParams();
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    setRequestData(maintenance_data.filter(n => id == n.Id))
    console.log(maintenance_data.filter(n => id == n.Id))
    
    form.setFieldsValue({
      Date: requestData[0]?.Date, 
      Requester: requestData[0]?.Requester, 
      Location: requestData[0]?.Location,
      Descriptions: requestData[0]?.Descriptions
    })

    form.resetFields();
  }, [id, maintenance_data])

  async function UpdateMaintenanceRequest(values) {
    console.log(values)
    setBtnLoader(true);
    const response = await AddMaintenanceRequestItem({...values, Id: id});
    if(response.data) {
      message.success("The request has been updated successfully.")
      setBtnLoader(false);
    } else {
      message.error("Failed to update request.")
      setBtnLoader(false);
    }
  }

  const onFinishFailed = () => {
    message.error("Please, fill out the form correctly.")
  }


  let navigate = useNavigate();



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
          onFinish={UpdateMaintenanceRequest} 
          onFinishFailed={onFinishFailed}
          layout="horizontal"
        >

          <Form.Item name='Date' label="Date" colon={true}>
            <Input placeholder='Date' size='large' disabled defaultValue={requestData[0]?.Date.replace('T', ' ').slice(0, -1)} />
          </Form.Item>
          
          <hr />

          <Form.Item name="Requester" label="Requester">
            <Input placeholder='full name' size='large' defaultValue={requestData[0]?.Requester} />
          </Form.Item>
          <Form.Item name="Location" label="Location" rules={[{required: true}]}>
            <Input placeholder='Location' size='large' defaultValue={requestData[0]?.Location} />
          </Form.Item>
          <Form.Item name="Descriptions" label="Descriptions" rules={[{required: true}]} initialValue={requestData[0]?.Descriptions}>
            <Input.TextArea rows={6} placeholder="write a brief description" defaultValue={requestData[0]?.Descriptions} />
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} isUpdate={true} />
        </Form>
      </FormPage>
    </>
  )
}

export default UpdateMaintenance