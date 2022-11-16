import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import MaintenanceRequest from './API/MaintenanceRequest';
import GetMaintenanceRequestById from './API/GetMaintenanceRequestById';
import { LoadingOutlined } from '@ant-design/icons';
import ActionsTable from '../../components/ActionsTable/ActionsTable';
moment.locale('en');

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };



function Maintenance() {
  const [form] = Form.useForm();
  const { user_data, defualt_route } = useContext(AppCtx);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});


  async function CreateMaintenanceRequest(values) {
    setLoading(true);
    const formData = {
      Email: user_data?.Data?.Mail,
      ReferenceCode: "auto generated",
      Files: "",
      Id: 0,
      ...values
    }
    if(values) {
      const response = await MaintenanceRequest(formData);
      if(response) {
        form.resetFields();
        message.success("The request has been sent successfully.");
        console.log(formData)
        setLoading(false);
      } else {
        setLoading(false);
        message.success("Failed to send request.")
      }
      
    } else {
      message.error("Failed to send request.")
      setLoading(false);
    }
  }

  async function GetMaintenanceRequestData(email, id) {
    setLoading(true);
    const response = await GetMaintenanceRequestById(email, id);
    if(response.data.Status === 200 && response.data.Data.length > 0) {
      console.log(response.data.Data[0]);
      setRequestData(response.data.Data[0])
    } else {
      message.error("Error Get Request Data")
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) {
      if(Object.keys(user_data).length > 0 && Object.keys(requestData).length === 0) {
        GetMaintenanceRequestData(user_data.Data.Mail, id);
      }
    } else {
      setLoading(false);
    }
  }, [user_data])

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>{!id && 'New '}Maintenance Request</p>
      </HistoryNavigation>
      {
        !loading
        ? <FormPage
            Email={id ? requestData?.ByUser?.Mail : user_data.Data.Mail}
            pageTitle={!id ? 'New Maintenance Request' : 'Maintenance Request'}
            RequestType="Maintenance"
            ActionModalTitle="Maintenance Request"
            IsAdminRequest={true}
            UserName={id ? requestData?.ByUser?.DisplayName : user_data.Data.DisplayName}
            UserDept={id ? requestData?.ByUser?.Title : user_data.Data.Title}
            UserNationality={id ? ' - ' : user_data.Data.Nationality || ' - '}
            UserId={id ? requestData.ByUser?.Iqama || ' - ' : user_data.Data?.Iqama || ' - '}
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
              onFinishFailed={() => message.error("Please, fill out the form correctly.")}
              layout="horizontal"
            >

              <Form.Item name='Date' label="Date" rules={[{required: true,}]} initialValue={moment(id ? requestData.Date : new Date()).format("MM/DD/YYYY hh:mm")} >
                <Input placeholder='Date' size='large' disabled />
              </Form.Item>
              
              <hr />

              <Form.Item name="Requester" label="Requester" initialValue={id ? requestData.ByUser?.DisplayName : ''}>
                <Input placeholder='full name' size='large' disabled={id ? true : false}/>
              </Form.Item>
              <Form.Item name="Location" label="Location" rules={[{required: true}]} initialValue={id ? requestData.Location : ''}>
                <Input placeholder='Location' size='large' disabled={id ? true : false}/>
              </Form.Item>
              <Form.Item name="Description" label="Descriptions" rules={[{required: true}]} initialValue={id ? requestData.Description : ''}>
                <Input.TextArea rows={6} placeholder="write a brief description" disabled={id ? true : false}/>
              </Form.Item>

              <SubmitCancel loaderState={loading} isUpdate={id ? true : false} backTo="/admin-services" />
            </Form>
            {id && <ActionsTable ActionData={requestData.Status || []} />}
          </FormPage>
        : <div style={{display: 'flex', justifyContent: 'center'}}>
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
      }
    </>
  )
}

export default Maintenance