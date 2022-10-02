import React, { useContext, useState } from 'react'
import { Form, Input, Modal, Upload, Radio, message, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App'

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function NewRequest() {
  const { defualt_route } = useContext(AppCtx);
  const [requestType, setRequestType] = useState("NewContentRequest");
  const [form] = Form.useForm();

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


  async function CreateRequest(values) {
    values.Files = fileList;
    console.log(values);
  }

  const onFinishFailed = () => { message.error("Please, fill out the form correctly.") }

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/content-requests`)}>Content Requests</a>
        <p>New Request</p>
      </HistoryNavigation>

      <div className='table-page-container'>
        <div className='content'>
          <div className="header">
            <h1>Content Requests</h1>
          </div>

          <div className='form'>
            <Form
              {...layout} 
              colon={false}
              labelWrap 
              name="content-request" 
              form={form} 
              onFinish={CreateRequest}
              onFinishFailed={onFinishFailed}
            >

              <Form.Item name="RequestType" label="Request Type" initialValue="NewContentRequest">
                <Radio.Group
                  options={[{label: 'طلب نشر محتوى', value: 'NewContentRequest'}, {label: 'طلب إعلان داخلي', value: 'NewContentRequest2'}]}
                  onChange={ ({target: {value}}) => setRequestType(value) }
                  value={requestType}
                  optionType="button"
                  buttonStyle="solid"
                  style={{width: '100%'}}
                  size="large"
                  defaultValue="NewContentRequest"
                />
              </Form.Item>


              <Form.Item name='Subject' label="Subject" rules={[{required: true}]}>
                <Input placeholder='Subject' size='large' />
              </Form.Item>
              

              <Form.Item name="Description" label="Descriptions" rules={[{required: true}]}>
                <Input.TextArea rows={6} placeholder="write a brief description" />
              </Form.Item>



              <Form.Item label="Attachments">
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
                  <img alt="example" style={{width: '100%'}} src={previewImage} />
                </Modal>
              </Form.Item>

              <Row gutter={10} justify="center">
                <Col>
                  <Button type="primary" htmlType='submit'>
                    Submit
                  </Button>
                </Col>
              </Row>

            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewRequest