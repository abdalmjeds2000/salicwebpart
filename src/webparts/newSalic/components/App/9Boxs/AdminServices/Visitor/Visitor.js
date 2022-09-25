import React, { useContext, useState } from 'react';
import { Form, Input, Upload, Select, DatePicker, InputNumber, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import VisitorRequest from './API/VisitorRequest';

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
  const [btnLoader, setBtnLoader] = useState(false)


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
  const handleChange = ({ fileList: newFileList }) => {setFileList(newFileList); console.log(newFileList)};


  async function CreateOfficeSupplyRequest(values) {
    setBtnLoader(true);
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
        setBtnLoader(false);
        setFileList([]);
        console.log(formData);
      } else {
        message.error("Failed to send request.")
        setBtnLoader(false);
      }
    } else {
      message.error("Wait for upload")
      setBtnLoader(false);
    }
  }

  const onFinishFailed = () => { message.error("Please, fill out the form correctly.")}


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>Visitor VISA Request</p>
      </HistoryNavigation>
      

      <FormPage
        user_data={user_data}
        pageTitle='New VISA Visitor Request'
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
          colon={false}
          labelWrap 
          name="Service Request" 
          layout="horizontal"
          form={form} 
          onFinish={CreateOfficeSupplyRequest}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item name='Date' label="Date" rules={[{required: true,}]} initialValue={moment().format('MM-DD-YYYY hh:mm')} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>
          
          <hr />

          <Form.Item name="NameOfVisitor" label="Name Of Visitor" rules={[{required: true}]} >
            <Input placeholder='full name' size='large' />
          </Form.Item>
          <Form.Item name="Nationality" label="Nationality" rules={[{required: true,}]}>
            <Select
              showSearch
              placeholder="Nationality"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              <Option value="Palestine">Palestine</Option>
              <Option value="Saudi">Saudi</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Profession" label="Profession" rules={[{required: true}]} >
            <Input placeholder='job title, or job field' size='large' />
          </Form.Item>
          <Form.Item name="Description" label="Company and Address">
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>
          <Form.Item name="ExpectedDateArrival" label="Expected Date Arrival">
            <DatePicker placeholder='mm/dd/yyyy' format='MM/DD/YYYY' size='large' />
          </Form.Item>
          <Form.Item name="TypeVISA" initialValue="Single" label="Type VISA" rules={[{required: true,}]}>
            <Select
              showSearch
              placeholder=""
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
              defaultValue="Single"
            >
              <Option value="Single" selected>Single</Option>
              <Option value="Multiple">Multiple</Option>
            </Select>
          </Form.Item>
          <Form.Item name="SaudiEmbassy" label="Saudi Embassy Location" rules={[{required: true}]} >
            <Input placeholder='the location of Saudi Embassy' size='large' />
          </Form.Item>



          <Form.Item name="Period" label="Period Of Visit (days)" initialValue={1} rules={[{required: true,}]}>
            <InputNumber size="large" min={-1000000} max={1000000} placeholder="Period Of Visit (days)" />
          </Form.Item>
          <Form.Item label="Attach">
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


          <SubmitCancel loaderState={btnLoader} />
        </Form>
      </FormPage>
    </>
  )
}

export default Visitor