import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Upload, Select, DatePicker, InputNumber, Modal, message, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import VisitorRequest from './API/VisitorRequest';
import GetVisitorRequestById from './API/GetVisitorRequestById';
import ActionsTable from '../../components/ActionsTable/ActionsTable';
import FileIcon from '../../../NewContentRequests/PreviewRequest/components/FileIcon';

const { Option } = Select;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


function Visitor() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});

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


  async function CreateVisitorRequest(values) {
    setLoading(true);
    let isFilesFinishUpload = true;
    const files = fileList.map(file => {
      if(file.status === "uploading") isFilesFinishUpload = false
      return file.response?.uploadedFiles[0]?.Name
    }).join();

    if(values && isFilesFinishUpload) {
      values.ExpectedDateArrival = new Date(values.ExpectedDateArrival).toLocaleDateString();
      const formData = {
        Email: user_data?.Data?.Mail,
        ReferenceCode: "auto generated",
        Files: files,
        Id: 0,
        ...values
      }

      const response = await VisitorRequest(formData);
      if(response.data) {
        form.resetFields();
        message.success("The request has been sent successfully.")
        setLoading(false);
        setFileList([]);
        console.log(formData);
      } else {
        message.error("Failed to send request.")
        setLoading(false);
      }
    } else {
      message.error("Wait for upload")
      setLoading(false);
    }
  }
  async function GetVisitorRequestData(email, id) {
    setLoading(true);
    const response = await GetVisitorRequestById(email, id);
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
        GetVisitorRequestData(user_data.Data.Mail, id);
      }
    } else {
      setLoading(false);
    }
  }, [user_data])


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>{!id && 'New '}Visitor VISA Request</p>
      </HistoryNavigation>
      
      {
        !loading
        ? <FormPage
            pageTitle={!id ? 'New VISA Visitor Request' : 'VISA Visitor Request'}
            Email={id ? requestData?.ByUser?.Mail : user_data.Data.Mail}
            UserName={id ? requestData?.ByUser?.DisplayName : user_data.Data.DisplayName}
            UserDept={id ? requestData?.ByUser?.Title : user_data.Data.Title}
            UserNationality={id ? ' - ' : user_data.Data.Nationality || ' - '}
            UserId={id ? parseInt(requestData.ByUser?.PIN, 10) || ' - ' : parseInt(user_data.Data.PIN, 10)}
            tipsList={[
              "Fill out required fields carefully.",
              "Check your email regularly. You will receive a notification on every future actions",
            ]}
          >
            <Form 
              {...layout} 
              colon={false}
              labelWrap 
              name="Service Request" 
              layout="horizontal"
              form={form} 
              onFinish={CreateVisitorRequest}
              onFinishFailed={() => message.error("Please, fill out the form correctly.")}
            >

              <Form.Item name='Date' label="Date" rules={[{required: true,}]} initialValue={moment().format('MM-DD-YYYY hh:mm')} >
                <Input placeholder='Date' size='large' disabled />
              </Form.Item>
              
              <hr />

              <Form.Item name="NameOfVisitor" label="Name Of Visitor" rules={[{required: true}]} initialValue={id ? requestData.NameOfVisitor : ''}>
                <Input placeholder='full name' size='large' disabled={id ? true : false} />
              </Form.Item>
              <Form.Item name="Nationality" label="Nationality" rules={[{required: true,}]}>
                <Select
                  showSearch
                  placeholder="Nationality"
                  filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  size="large"
                  disabled={id ? true : false}
                  defaultValue={id ? requestData.Nationality : ''}
                >
                  <Option value="Palestine">Palestine</Option>
                  <Option value="Saudi">Saudi</Option>
                  <Option value="India">India</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Profession" label="Profession" rules={[{required: true}]} initialValue={id ? requestData.Profession : ''}>
                <Input placeholder='job title, or job field' size='large' disabled={id ? true : false} />
              </Form.Item>
              <Form.Item name="Description" label="Company and Address" initialValue={id ? requestData.Description : ''}>
                <Input.TextArea rows={6} placeholder="write a brief description" disabled={id ? true : false}/>
              </Form.Item>
              <Form.Item name="ExpectedDateArrival" label="Expected Date Arrival">
                {
                  !id
                  ? <DatePicker placeholder='mm-dd-yyyy' format='MM-DD-YYYY' size='large'/>
                  : <Input size='large' disabled defaultValue={moment(requestData.ExpectedDateArrival).format("MM-DD-YYYY")}/>
                }
              </Form.Item>
              <Form.Item name="TypeVISA" initialValue="Single" label="Type VISA" rules={[{required: true,}]}>
                <Select
                  showSearch
                  placeholder=""
                  filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  size="large"
                  defaultValue={id ? requestData.TypeVISA : "Single"}
                  disabled={id ? true : false}
                >
                  <Option value="Single" selected>Single</Option>
                  <Option value="Multiple">Multiple</Option>
                </Select>
              </Form.Item>
              <Form.Item name="SaudiEmbassy" label="Saudi Embassy Location" rules={[{required: true}]} initialValue={id ? requestData.SaudiEmbassy : ''}>
                <Input placeholder='the location of Saudi Embassy' size='large' disabled={id ? true : false}/>
              </Form.Item>



              <Form.Item name="Period" label="Period Of Visit (days)" initialValue={id ? requestData.Period : 1} rules={[{required: true,}]}>
                <InputNumber size="large" min={-1000000} max={1000000} placeholder="Period Of Visit (days)" disabled={id ? true : false}/>
              </Form.Item>
              {
                !id
                ? <Form.Item label="Attach">
                    <Upload
                      action="https://salicapi.com/api/uploader/up"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 8 ? null : <div><PlusOutlined /><div style={{marginTop: 8,}}>Upload</div></div>}
                    </Upload>
                    <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </Form.Item>
                : <Form.Item label="Attach">
                    {
                      requestData.Files.map((file,i) => {
                          return (
                              <FileIcon
                                  key={i} 
                                  FileType={file.Guid.split(".")[file.Guid.split(".").length-1]}
                                  FileName={file.Guid}
                                  FilePath={file.Path}
                                  IconWidth='100px'
                              />
                          )
                      })
                    }
                  </Form.Item>
              }


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

export default Visitor