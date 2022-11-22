import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Input, Upload, Radio, Select, Space, DatePicker, InputNumber, Modal, message, Divider, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../../components/SubmitCancel/SubmitCancel';
import moment from 'moment';
import { AppCtx } from '../../../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


function RegisterNewAssets() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [categoryType, setCategoryType] = useState("Hardware");
  const [lookupsData, setLookupsData] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
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




  var types = lookupsData?.filter(x=>x.Property === 'Type');
  var brands = lookupsData?.filter(x=>x.Property === 'Brand');
  var models = lookupsData?.filter(x=>x.Property === 'Model');
  var supplier = lookupsData?.filter(x=>x.Property === 'Supplier');
  const getLookups = async () => {
    const lookupsResponse = await axios.get('https://salicapi.com/api/Asset/GetLookups');
    if(lookupsResponse.data?.Status === 200) {
      setLookupsData(lookupsResponse.data?.Data);
    }
  }



  const SubmitForm = async (formData) => {
    setBtnLoader(true);

    // Get Files Nemes Uploaded & check if all files finish uploading
    let isFilesFinishUpload = true;
    const files = fileList.map((file) => {
      if (file.status === "uploading") isFilesFinishUpload = false;
      return file.response?.uploadedFiles[0]?.Name;
    });
    if(isFilesFinishUpload) {
      formData.ReceivedDate = new Date(formData.ReceivedDate).toLocaleDateString()
      formData.Email = user_data.Data?.Mail;
      formData.FileNames = files.join();
      formData.Id = user_data.Data?.Id;
      formData.SubDevices = JSON.stringify(formData.SubDevices);
      
      const requestResponse = await axios.post('https://salicapi.com/api/Asset/Add', formData);
      if(requestResponse) {
        notification.success({message: 'Your request has been sent successfully'})
        setFileList([]);
        setCategoryType("Hardware");
        form.resetFields();
      }
      console.log('assets formData', formData);
    } else {
      message.error("Wait For Uploading...")
    }
    
    setBtnLoader(false);
  }


  useEffect(() => {
    getLookups();
  }, [])


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/services-requests`)}>IT Service Center</a>
        <p>Register New Asset</p>
      </HistoryNavigation>
      

      <FormPage
        pageTitle='VISA Visitor Request'
        Email={user_data.Data.Mail}
        UserName={user_data.Data.DisplayName}
        UserDept={user_data.Data.Title}
        UserNationality={user_data.Data.Nationality || ' - '}
        UserId={user_data.Data?.Iqama || ' - '}
        tipsList={[
          "Fill out required fields carefully.",
          "If Possile upload captured images for the problem.",
          "Be specific in describing the problem you are facing. Please do not write fussy words or incomplete statements.",
          "Be specific in choosing 'Issue Category' as the system will assign SR. to the appropriate team member."
        ]}
      >
        <Form 
          {...layout} 
          colon={false}
          labelWrap 
          form={form}
          name="asset-register" 
          layout="horizontal"
          onFinish={SubmitForm}
          onFinishFailed={() => message.error("Please, fill out the form correctly.")}
        >



          <Form.Item name="createdAt" label="Creation Date" initialValue={moment(new Date()).format("MM/DD/YYYY hh:mm")}>
            <Input size='large' disabled />
          </Form.Item>
          <Form.Item name="ReceivedDate" label="Receiving Date" rules={[{required: true}]} >
            <DatePicker format='MM/DD/YYYY' size='large' placeholder='select the date you recieved the asset' />
          </Form.Item>
          <Form.Item name="TagNumber" label="Tag Number" rules={[{required: true}]} >
            <Input placeholder='auto generated' size='large' />
          </Form.Item>
          <Form.Item name="SN" label="S/N" rules={[{required: true}]} >
            <Input placeholder='(i.e. 0A4WHMCD700181R)' size='large' />
          </Form.Item>
          <Form.Item name="AssetNumber" label="Asset Number" rules={[{required: true,}]} >
            <Input placeholder='full asset number' size='large' />
          </Form.Item>
          <Form.Item name="Name" label="Asset Name" rules={[{required: true,}]} >
            <Input placeholder='enter full name' size='large' />
          </Form.Item>

          <Divider />

          <Form.Item name="CategoryType" label="Category" initialValue="Hardware" rules={[{required: true}]} >
            <Radio.Group value={categoryType} onChange={({ target: { value } }) => {setCategoryType(value)}}>
              <Space direction="vertical">
                <Radio value="Hardware">
                  <span>Hardware Devices</span> <br />
                  <p>Hardware such as laptop, screen, or phone</p>
                </Radio>
                <Radio value="Software">
                  <span>Software Licenses</span> <br />
                  <p>Software licenses such as Adobe and Office 365 Suite</p>
                </Radio>
                <Radio value="Accessories">
                  <span>Cables & Accessories</span> <br />
                  <p>Computer or phone accessories such as USB cables, USB HUB, and USB Flashs</p>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          {categoryType === "Hardware" && <Form.Item name="Type" label="Type" rules={[{required: true,}]}>
            <Select
              showSearch
              placeholder="select device type"
              // onChange={value => console.log(value)}
              // onSearch={value => console.log(value)}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              <Option value="Laptop">Laptop</Option>
              <Option value="Monitor">Monitor</Option>
              <Option value="Printer">Printer</Option>
              <Option value="Desktop">Desktop</Option>
              <Option value="Server">Server</Option>
              {types?.map((row, i) => <Option key={i} value={row.Value}>{row.Value}</Option>)}
            </Select>
          </Form.Item>}
          
          <Form.Item name="Brand" label="Brand/Manufacture/Company" rules={[{required: true}]}>
            <Select
              showSearch
              placeholder="select one value"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              {brands?.map((row, i) => <Option key={i} value={row.Value}>{row.Value}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="Model" label="Model/Version" rules={[{required: true}]}>
            <Select
              showSearch
              placeholder="select device model"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              {models?.map((row, i) => <Option key={i} value={row.Value}>{row.Value}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="Classification" label="Classification" >
            <Select placeholder="employee name" size="large">
              <Option value="Normal">Normal</Option>
              <Option value="Meduim">Meduim</Option>
              <Option value="High">High</Option>
              <Option value="Critical">Critical</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Form.Item name="Quantity" label="Quantity" initialValue={1}>
            <InputNumber size="large" min={1} placeholder="default is 1" />
          </Form.Item>
          <Form.Item name="Cost" label="Cost" rules={[{required: true}]}>
            <InputNumber size="large" min={1} placeholder="asset cost in SAR" />
          </Form.Item>
          <Form.Item name="PurchaseOrder" label="Purchase Order #">
            <Input placeholder='PO# (i.e. 800)' size='large' />
          </Form.Item>
          <Form.Item name="Warranty" label="Warranty/Expiration" rules={[{required: true}]}>
            <InputNumber size="large" placeholder="warranty in months" />
          </Form.Item>

          <Divider />

          <Form.Item name="Supplier" label="Supplier" rules={[{required: true}]}>
            <Select
              showSearch
              placeholder="select supplier name"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              {supplier?.map((row, i) => <Option key={i} value={row.Value}>{row.Value}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="SupplierInfo" label="Contact Info">
            <Input placeholder='supplier address / telephone' size='large' />
          </Form.Item>

          <Divider />

          <Form.Item label="Sub devices">
            <Form.List name="SubDevices">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline">
                      <Form.Item {...restField} name={[name, 'name']} rules={[{required: true, message: false}]}>
                        <Input placeholder="device name (e.g. HP charge 75W)" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'tag']} rules={[{required: true, message: false}]}>
                        <Input placeholder="tag number" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'sn']} rules={[{required: true, message: false}]}>
                        <Input placeholder="serial number" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item name="Description" label="Description">
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>
          <Form.Item label="Photos">
            <Upload
              action="https://salicapi.com/api/uploader/up"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 25 ? null : <div><PlusOutlined /><div style={{marginTop: 8}}>Upload</div></div>}
            </Upload>
            <Modal open={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage} />
            </Modal>
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} backTo="/services-requests" />
        </Form>
      </FormPage>
    </>
  )
}

export default RegisterNewAssets