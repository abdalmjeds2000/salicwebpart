import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Input, Upload, Radio, Select, DatePicker, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation'
import FormPage from '../../components/FormPageTemplate/FormPage'
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';

const { Option } = Select;
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
  const [btnLoader, setBtnLoader] = useState(false)


  const [withFamily, setWithFamily] = useState(1);
  const [visaType, setVisaType] = useState(1);
  
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



  let isFilesFinishUpload = true;
  const files = fileList.map(file => {
    if(file.status === "uploading") isFilesFinishUpload = false
    return file.response?.uploadedFiles[0]?.Name
  }).join();


  async function CreateBusinessGateRequest(values) {
    setBtnLoader(true);
    values.IqamaExpireDate = new Date(values.IqamaExpireDate).toLocaleDateString();
    if(isFilesFinishUpload) {
      const formData = {
        Email: user_data?.Data?.Mail,
        ReferenceCode: "auto generated",
        Id: 0,
        Files: files,
        ...values,
      }
      message.success("The request has been sent successfully.")
      setFileList([]);
      form.resetFields();
      setBtnLoader(false);
      console.log(formData);
    } else {
      message.error("Wait for Uploading...")
      setBtnLoader(false);
    }
  }



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>Issuing VISA</p>
      </HistoryNavigation>
      

      <FormPage
        user_data={user_data}
        pageTitle='VISA Application'
        tips_userInfo={[
          {title: 'SALIC', text: user_data.Data?.Department},
          {title: 'Nationality', text: user_data.Data?.Nationality},
          {title: 'ID #', text: user_data.Data?.Iqama},
        ]}
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
          onFinish={CreateBusinessGateRequest}
          onFinishFailed={() => message.error("Please, fill out the form correctly.")}
        >
          

          <Form.Item name="OnBehalfOf" label="On Behalf Of">
            <Select
              showSearch
              placeholder="the user name"
              // onChange={value => console.log(value)}
              // onSearch={value => console.log(value)}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              <Option value="Module">Module</Option>
              <Option value="SDS">SDS</Option>
              <Option value="Attendance">Attendance</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Reason" label="VISA Reason" initialValue="Annual Leave">
            <Select placeholder="select one value" size="large" defaultValue="Annual Leave">
              <Option value="1">Annual Leave</Option>
              <Option value="2">Business Trip</Option>
              <Option value="3">Training</Option>
            </Select>
          </Form.Item>
          
          <hr />
          
          <Form.Item name="ReceivedDate" label="Date" rules={[{required: true}]} initialValue={moment().format('MM-DD-YYYY hh:mm')} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>

          <hr />

          <Form.Item name="WithFamily" label="With Family" initialValue="Yes">
            <Radio.Group
              options={[{label: 'Yes', value: 1}, {label: 'No', value: 2}]}
              onChange={ ({target: {value}}) => setWithFamily(value) }
              value={withFamily}
              optionType="button"
              buttonStyle="outline"
              style={{width: '100%'}}
              defaultValue={1}
            />
          </Form.Item>
          <Form.Item name="VISAType" label="VISA Type" initialValue="Single">
            <Radio.Group
              options={[{label: 'Single', value: 1}, {label: 'Multiple', value: 2}]}
              onChange={ ({target: {value}}) => setVisaType(value) }
              value={visaType}
              optionType="button"
              buttonStyle="outline"
              style={{width: '100%'}}
              defaultValue={1}
            />
          </Form.Item>
          <Form.Item name="Duration" label="VISA Duration">
            <Select placeholder="select one value" size="large">
              <Option value="1">One Month</Option>
              <Option value="2">Two Months</Option>
              <Option value="3">Three Months</Option>
              <Option value="4">Four Months</Option>
              <Option value="5">Five Months</Option>
              <Option value="6">Six Months</Option>
              <Option value="12">One Year</Option>
              <Option value="24">Two Years</Option>
              <Option value="36">Three Years</Option>
              <Option value="48">Four Years</Option>
              <Option value="60">Five Years</Option>
            </Select>
          </Form.Item>
          <Form.Item name="DestinationCountry" label="Destination Country">
            <Input placeholder='i.e. USA, UK, ...' size='large' />
          </Form.Item>

          <hr />

          <Form.Item name="IqamaExpireDate" label="ID Expire Date">
            <DatePicker placeholder='mm/dd/yyyy' format='MM/DD/YYYY' size='large' />
          </Form.Item>
          <Form.Item name="Description" label="Descriptions">
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>
          <Form.Item label="Verification Documents">
            <Upload
              action="https://salicapi.com/api/uploader/up"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 15 ? null : <div><PlusOutlined /><div style={{marginTop: 8}}>Upload</div></div>}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage} />
            </Modal>
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} />

        </Form>
      </FormPage>
    </>
  )
}

export default IssuingVISA