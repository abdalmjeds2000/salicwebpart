import React, { useContext, useState } from 'react'
import { Form, Input, Modal, Upload, Radio, Select, Space, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormPageTemplate from '../../components/FormPageTemplate/FormPage'
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App'
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


function NewITRequest() {
  const { user_data, defualt_route } = useContext(AppCtx);
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




  let navigate = useNavigate();


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/it-services`)}>IT Service Center</a>
        <p>New Service Request</p>
      </HistoryNavigation>
      <FormPageTemplate
        user_data={user_data}
        pageTitle='Service Request'
        tips_userInfo={[{title: 'SALIC', text: user_data.Data?.Department}]}
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
          name="service-request" 
          onFinish={values => console.log(values)}
        >
          <Form.Item name="ReceivedDate" label="Date" rules={[{required: true,}]} initialValue={moment().format('MM-DD-YYYY hh:mm')}>
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>
          <Form.Item name="onbehalf" label="On Behalf Of">
            <Select
              showSearch
              placeholder="employee name"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              <Option value="name789@gmail.com">name 789</Option>
              <Option value="name456@gmail.com">name 456</Option>
              <Option value="name123@gmail.com">name 123</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Subject" label="Subject" rules={[{required: true,}]}>
            <Input placeholder='write breif subject' size='large' />
          </Form.Item>

          <Divider />

          <Form.Item name="CategoryType" label="Issue Category" initialValue="Hardware" rules={[{required: true}]}>
            <Radio.Group value="Hardware" /* onChange={e => console.log(e.target.value)} */>
              <Space direction="vertical">
                <Radio value="Hardware">
                  <span>Hardware & Devices</span> <br />
                  <p>Hardware problem such as laptop or screen broken</p>
                </Radio>
                <Radio value="Software">
                  <span>Software & Applications</span> <br />
                  <p>Software issues such as Oracle, SharePoint, and Office 365 Suite</p>
                </Radio>
                <Radio value="Access">
                  <span>Access, Permissions, and Licenses</span> <br />
                  <p>Access Issues such as Permissions to access a resource</p>
                </Radio>
                <Radio value="Security">
                  <span>Security Incident</span> <br />
                  <p>Security Incidents such as email fishing.</p>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="Priority" label="Priority" >
            <Select placeholder="Priority" size="large" /* onChange={value => console.log(value)} */ >
              <Option value="1">Normal</Option>
              <Option value="2">Critical</Option>
            </Select>
          </Form.Item>
          <Form.Item name="IssueType" label="Issue Type" >
            <Select placeholder="Select Issue Type" size="large" /* onChange={value => console.log(value)} */ >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Form.Item name='Description' label="Descriptions / Justifications" rules={[{required: true}]}>
            <Input.TextArea rows={8} placeholder="write a brief description" />
          </Form.Item>
          <Form.Item label="Documents">
            <Upload
              action="https://salicapi.com/api/uploader/up"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList?.length >= 15 ? null : <div><PlusOutlined /><div style={{marginTop: 8}}>Upload</div></div>}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
          </Form.Item>

          <SubmitCancel />

        </Form>
      </FormPageTemplate>
    </>
  )
}

export default NewITRequest