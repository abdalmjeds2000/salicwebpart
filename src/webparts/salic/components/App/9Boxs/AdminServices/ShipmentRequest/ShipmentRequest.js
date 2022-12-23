import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import ShipmentRequest from './API/ShipmentRequest';
import { LoadingOutlined } from '@ant-design/icons';
import ActionsTable from '../../components/ActionsTable/ActionsTable';
import GetShipmentRequestById from './API/GetShipmentRequestById'
import AddAction from '../AddAction/AddAction';
import pnp from 'sp-pnp-js';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';


const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };


function Shipment() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});
  const [approvals, setApprovals] = useState([]);


  async function GetApprovals() {
    const response = await pnp.sp.web.lists.getByTitle('Admin Services Approvals').items.select('Email/Title,Email/EMail,*').filter("Title eq 'Shipment'").expand('Email').get();
    setApprovals(response);
  }
  async function CreateShipmentRequest(values) {
    setLoading(true);
    const formData = {
      Email: user_data?.Data?.Mail,
      Requester: user_data?.Data?.Mail,
      ReferenceCode: "auto generated",
      Files: "",
      Id: 0,
      ...values
    }
    if(values) {
      const response = await ShipmentRequest(formData);
      if(response.data) {
        form.resetFields();
        message.success("The request has been sent successfully.")
        console.log(formData);
      } else {
        message.success("Failed to send request.")
        setLoading(false);
      }
      
    } else {
      message.error("Failed to send request.")
    }
    setLoading(false);
  }
  async function GetShipmentRequestData(email, id) {
    setLoading(true);
    const response = await GetShipmentRequestById(email, id);
    if(response.data.Status === 200 && response.data.Data.length > 0) {
      document.title = `.:: SALIC Gate | ${response.data.Data[0].ReferenceCode || "Shipment Request"} ::.`
      setRequestData(response.data.Data[0])
    } else {
      message.error("Error Get Request Data")
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) {
      if(Object.keys(user_data).length > 0 && Object.keys(requestData).length === 0) {
        GetShipmentRequestData(user_data.Data.Mail, id);
        GetApprovals();
      }
    } else {
      setLoading(false);
    }
  }, [user_data]);



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
        <p>{!id && 'New '}Shipment Request</p>
      </HistoryNavigation>
      {
        !loading
        ? <FormPage
            pageTitle={!id ? 'New Shipment Request' : 'Shipment Request'}
            Header={
              id && requestStatus !== "FIN" && IsApproval &&
              <AddAction RequestType="BusniessGate" ModalTitle="Approve Busniess Gate Request" /> 
            }
            Email={id ? requestData?.ByUser?.Mail : user_data.Data.Mail}
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
              colon={false}
              labelWrap 
              name="service-request"
              form={form} 
              onFinish={CreateShipmentRequest}
              onFinishFailed={() => message.error("Please, fill out the form correctly.")}
              layout="horizontal"
            >

              <Form.Item name='Date' label="Date" rules={[{required: true,}]} initialValue={moment(id ? requestData.Date : new Date()).format('MM/DD/YYYY hh:mm')} >
                <Input placeholder='Date' size='large' disabled />
              </Form.Item>
              
              <hr />

              <Form.Item name="Sender" label="Sender Mobile" rules={[{required: true}]} initialValue={id ? requestData.Sender : ''}>
                <Input placeholder='sender name or mobile number' size='large' disabled={id ? true : false} />
              </Form.Item>
              <Form.Item name="Source" label="Source Address" rules={[{required: true}]} initialValue={id ? requestData.Source : ''}>
                <Input placeholder='from location' size='large' disabled={id ? true : false} />
              </Form.Item>
              <Form.Item name="Receiver" label="Receiver Mobile" rules={[{required: true}]} initialValue={id ? requestData.Receiver : ''}>
                <Input placeholder='Receiver name or mobile number' size='large' disabled={id ? true : false} />
              </Form.Item>
              <Form.Item name="Destination" label="Destination Address" rules={[{required: true}]} initialValue={id ? requestData.Destination : ''}>
                <Input placeholder='to location' size='large' disabled={id ? true : false} />
              </Form.Item>
              <Form.Item name="Description" label="Descriptions" initialValue={id ? requestData.Description : ''}>
                <Input.TextArea rows={6} placeholder="write a brief description" disabled={id ? true : false} />
              </Form.Item>

              
              {!id && <SubmitCancel loaderState={loading} isUpdate={id ? true : false} backTo="/admin-services" />}
            </Form>
            {id && <ActionsTable ActionData={requestData.Status || []} />}
          </FormPage>
        : <AntdLoader />
      }
    </>
  )
}

export default Shipment