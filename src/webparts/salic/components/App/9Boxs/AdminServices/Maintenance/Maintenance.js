import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, message, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import MaintenanceRequest from './API/MaintenanceRequest';
import GetMaintenanceRequestById from './API/GetMaintenanceRequestById';
import ActionsTable from '../../components/ActionsTable/ActionsTable';
import AddAction from '../AddAction/AddAction';
import pnp from 'sp-pnp-js';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';

moment.locale('en');
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };



function Maintenance() {
  const [form] = Form.useForm();
  const { user_data, defualt_route } = useContext(AppCtx);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  let navigate = useNavigate();
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});
  const [approvals, setApprovals] = useState([]);

  async function GetApprovals() {
    const response = await pnp.sp.web.lists.getByTitle('Admin Services Approvals').items.select('Email/Title,Email/EMail,*').filter("Title eq 'Maintenance'").expand('Email').get();
    setApprovals(response);
  }

  async function CreateMaintenanceRequest(values) {
    setBtnLoading(true);

    const form_values = {
      Email: user_data?.Data?.Mail,
      ReferenceCode: "auto generated",
      Files: "",
      Id: 0,
      ...values
    }
    var form_data = new FormData();
    for ( var key in form_values ) {
      form_data.append(key, form_values[key]);
    }
    const response = await MaintenanceRequest(form_data);
    if(response?.status == 200) {
      form.resetFields();
      notification.success({message: response?.data?.Message || "Your Application has been submitted successfully."})
      if(response?.data?.Data) {
        window.open(defualt_route + '/admin-services/maintenance/' + response?.data?.Data);
      }
    } else {
      message.error("Failed to send request.")
    }

    setBtnLoading(false);
  }

  async function GetMaintenanceRequestData(email, id) {
    setLoading(true);
    const response = await GetMaintenanceRequestById(email, id);
    if(response.data.Status === 200 && response.data.Data.length > 0) {
      document.title = `.:: SALIC Gate | ${response.data.Data[0].ReferenceCode || "Maintenance Request"} ::.`
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
        GetApprovals();
      }
    } else {
      setLoading(false);
    }
  }, [user_data])

  // Check Request Status
  let requestStatus = '';
  if(requestData !== undefined && Object.keys(requestData).length > 0) {
    requestStatus = requestData?.Status[requestData?.Status?.length-1]?.Type
  }
  // Check Is Approval
  let IsApproval = false;
  if(approvals !== undefined && Object.keys(approvals).length > 0) {
    for (const approval of approvals) {
      if (approval.Email?.EMail?.toLowerCase() === user_data.Data?.Mail?.toLowerCase()) {
        IsApproval = true;
        break;
      }
    }
  }


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>{!id && 'New '}Maintenance Request</p>
      </HistoryNavigation>
      {
        !loading
        ? <FormPage
            Email={id ? requestData?.ByUser?.Mail : user_data?.Data?.Mail}
            pageTitle={!id ? 'New Maintenance Request' : 'Maintenance Request'}
            Header={
              id && requestStatus !== "FIN" && IsApproval &&
              <AddAction RequestType="Maintenance" ModalTitle=" Approve Maintenance Request" /> 
            }
            UserName={id ? requestData?.ByUser?.DisplayName : user_data?.Data?.DisplayName}
            UserDept={id ? requestData?.ByUser?.Title : user_data?.Data?.Title}
            UserNationality={id ? ' - ' : user_data?.Data?.Nationality || ' - '}
            UserId={id ? requestData.ByUser?.Iqama || ' - ' : user_data?.Data?.Iqama || ' - '}
            EmployeeId={id ? parseInt(requestData.ByUser?.PIN, 10) || ' - ' : parseInt(user_data.Data?.PIN, 10) || ' - '}
            Extension={id ? requestData.ByUser?.Ext || ' - ' : user_data.Data?.Ext || ' - '}    
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

              <Form.Item name='Date' label="Date" rules={[{required: true,}]} initialValue={moment(id ? new Date(requestData.CreatedAt) : new Date()).format("MM/DD/YYYY hh:mm")} >
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

              
              {!id && <SubmitCancel loaderState={btnLoading} isUpdate={id ? true : false} backTo="/admin-services" />}
            </Form>
            {
              id && 
              <div className='admin-services-table'>
                <ActionsTable ActionData={requestData.Status || []} />
              </div>
            }
          </FormPage>
        : <AntdLoader />
      }
    </>
  )
}

export default Maintenance