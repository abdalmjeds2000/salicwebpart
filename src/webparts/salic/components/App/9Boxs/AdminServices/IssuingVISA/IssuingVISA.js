import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Upload, Radio, Select, DatePicker, Modal, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation'
import FormPage from '../../components/FormPageTemplate/FormPage'
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import DropdownSelectUser from '../../../Global/DropdownSelectUser/DropdownSelectUser';
import AddAction from '../AddAction/AddAction';
import IssuingVISARequest from './API/IssuingVISARequest';
import GetVISAById from './API/GetVISAById';
import pnp from 'sp-pnp-js';
import ActionsTable from '../../components/ActionsTable/ActionsTable';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';
import Leaves from './Leaves';


const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });



function IssuingVISA() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [withFamily, setWithFamily] = useState(1);
  const [visaType, setVisaType] = useState(1);
  const [onBehalfOf, setOnBehalfOf] = useState("");
  const [visaReason, setVisaReason] = useState("1");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [requestData, setRequestData] = useState({});
  const [approvals, setApprovals] = useState([]);



  // GET VISA Request Approvals
  async function GetApprovals() {
    const response = await pnp.sp.web.lists.getByTitle('Admin Services Approvals').items.select('Email/Title,Email/EMail,*').filter("Title eq 'Issuing VISA'").expand('Email').get();
    setApprovals(response);
  }

  // Create New VISA Request
  async function CreateVISARequest(values) {
    setLoading(true);
    let isFilesFinishUpload = true;
    const files = fileList.map(file => {
      if(file.status === "uploading") isFilesFinishUpload = false
      return file.response?.uploadedFiles[0]?.Name
    }).join();


    values.IqamaExpireDate = new Date(values.IqamaExpireDate).toLocaleDateString();
    if(isFilesFinishUpload) {
      const formData = {
        Email: user_data?.Data?.Mail,
        Files: files,
        ...values,
      }
      const response = await IssuingVISARequest(formData);
      if(response) {
        message.success("The request has been sent successfully.")
        setFileList([]);
        form.resetFields();
        console.log(formData);
      } else {
        message.error("Failed to send request.")
      }
      
    } else {
      message.error("Wait for Uploading...")
    }
    setLoading(false);
  }

  // GET VISA Request in preview mode
  async function GetVISARequest(email, id) {
    setLoading(true);
    const response = await GetVISAById(email, id);
    if(response.data.Status === 200 && response.data.Data.length > 0) {
      document.title = `.:: SALIC Gate | ${response.data.Data[0].ReferenceCode || "VISA Request"} ::.`
      setRequestData(response.data.Data[0]);
    } else {
      message.error("Error Get Request Data")
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) {
      if(Object.keys(user_data).length > 0 && Object.keys(requestData).length === 0) {
        GetVISARequest(user_data.Data.Mail, id);
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



  
    // FOR WHO WILL FETCH LEAVES DATA
  let toUser;
  if(Object.keys(user_data).length > 0) {
    toUser = onBehalfOf.length > 0 ? onBehalfOf : user_data?.Data?.Mail;
  }



  if(loading) {
    return <AntdLoader />;
  }

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>Issuing VISA</p>
      </HistoryNavigation>
      

      <FormPage
        pageTitle={!id ? 'New VISA Application' : 'VISA Application'}
        Header={
          id && requestStatus !== "FIN" && IsApproval &&
          <AddAction RequestType="VISA" ModalTitle="Approve VISA Request" /> 
        }
        Email={id ? requestData?.ByUser?.Mail : user_data?.Data?.Mail}
        UserName={id ? requestData?.ByUser?.DisplayName : user_data?.Data?.DisplayName}
        UserDept={id ? requestData?.ByUser?.Title : user_data?.Data?.Title}
        UserNationality={id ? ' - ' : user_data?.Data?.Nationality || ' - '}
        UserId={id ? requestData.ByUser?.Iqama || ' - ' : user_data.Data?.Iqama || ' - '}
        tipsList={[
          "Fill out required fields carefully.",
          "Before refer the enrollment to the users, please read it carefully and refer it to all participants.",
          "Note : For Annual Leaves, foreigner has only one time VISA in a year for free. Otherwise, you have to attach the VISA payment bill",
          "Check your email regularly. You will receive a notification on every future actions",
        ]}
      >
        <Form 
          {...layout} 
          colon={false}
          labelWrap 
          name="issue-visa-request" 
          layout="horizontal"
          form={form} 
          onFinish={CreateVISARequest}
          onFinishFailed={() => message.error("Please, fill out the form correctly.")}
        >
          

          <Form.Item label="On Behalf Of">
            <DropdownSelectUser
              name="OnBehalfOf"
              required={false}
              placeholder="the user name"
              isDisabled={id ? true : false}
              onChange={val => setOnBehalfOf(val)}
            />
          </Form.Item>
          <Form.Item name="Reason" label="VISA Reason" initialValue={id ? `${requestData.Reason}` : "1"}>
            <Select placeholder="select one value" onChange={val => setVisaReason(val)} size="large" disabled={id ? true : false}>
              <Select.Option value="1">Annual Leave</Select.Option>
              <Select.Option value="2">Business Trip</Select.Option>
              <Select.Option value="3">Training</Select.Option>
            </Select>
          </Form.Item>
          {
            !id ? ( 
              <Form.Item label=" ">
                <Leaves reasonId={visaReason} toUser={toUser} /> 
              </Form.Item>
            ) : null
          }


          {
            id && requestData.Dates
            ? (
                <Form.Item label=" ">
                  <Typography.Text type='secondary'>
                    {new Date(requestData.Dates[0].Date).toLocaleDateString()} - {new Date(requestData.Dates[requestData.Dates.length-1].Date).toLocaleDateString()}
                  </Typography.Text>
                </Form.Item>
              )
            : null
          }
          <hr />
          
          <Form.Item name="ReceivedDate" label="Date" rules={[{required: true}]} initialValue={id ? new Date(requestData.ReceivedDate).toLocaleDateString() : moment().format('MM/DD/YYYY hh:mm')} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>

          <hr />

          <Form.Item name="WithFamily" label="With Family" initialValue={id ? `${requestData.WithFamily}` : "1"}>
            <Radio.Group
              options={[{label: 'Yes', value: "1"}, {label: 'No', value: "2"}]}
              onChange={ ({target: {value}}) => setWithFamily(value) }
              value={withFamily}
              optionType="button"
              buttonStyle="outline"
              style={{width: '100%'}}
              disabled={id ? true : false}
            />
          </Form.Item>
          <Form.Item name="VISAType" label="VISA Type" initialValue={id ? `${requestData.VISATypeId}` : "1"}>
            <Radio.Group
              options={[{label: 'Single', value: "1"}, {label: 'Multiple', value: "2"}]}
              onChange={ ({target: {value}}) => setVisaType(value) }
              value={visaType}
              optionType="button"
              buttonStyle="outline"
              style={{width: '100%'}}
              disabled={id ? true : false}
            />
          </Form.Item>
          <Form.Item name="Duration" label="VISA Duration" initialValue={id ? `${requestData.Duration}` : "1"}>
            <Select placeholder="select one value" size="large" disabled={id ? true : false}>
              <Select.Option value="1">One Month</Select.Option>
              <Select.Option value="2">Two Months</Select.Option>
              <Select.Option value="3">Three Months</Select.Option>
              <Select.Option value="4">Four Months</Select.Option>
              <Select.Option value="5">Five Months</Select.Option>
              <Select.Option value="6">Six Months</Select.Option>
              <Select.Option value="12">One Year</Select.Option>
              <Select.Option value="24">Two Years</Select.Option>
              <Select.Option value="36">Three Years</Select.Option>
              <Select.Option value="48">Four Years</Select.Option>
              <Select.Option value="60">Five Years</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="DestinationCountry" label="Destination Country" initialValue={id ? requestData.DestinationCountry : ''}>
            <Input placeholder='i.e. USA, UK, ...' size='large' disabled={id ? true : false} />
          </Form.Item>

          <hr />

          <Form.Item name="IqamaExpireDate" label="ID Expire Date">
            {
              !id
              ? <DatePicker placeholder='mm/dd/yyyy' format='MM/DD/YYYY' size='large' />
              : <Input size='large' defaultValue={new Date(requestData.IqamaExpireDate).toLocaleDateString()} disabled />
            }
          </Form.Item>
          <Form.Item name="Description" label="Descriptions" initialValue={id ? requestData.Description : '' }>
            <Input.TextArea rows={6} placeholder="write a brief description" disabled={id ? true : false} />
          </Form.Item>
          {!id && <Form.Item label="Verification Documents">
            <Upload
              action="https://salicapi.com/api/uploader/up"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 15 ? null : <div><PlusOutlined /><div style={{marginTop: 8}}>Upload</div></div>}
            </Upload>
            <Modal open={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage} />
            </Modal>
          </Form.Item>}

          
          {!id && <SubmitCancel loaderState={loading} isUpdate={id ? true : false} backTo="/admin-services" />}
        </Form>

        {id && <ActionsTable ActionData={requestData.Status || []} />}
      </FormPage>
    </>
  )
}

export default IssuingVISA