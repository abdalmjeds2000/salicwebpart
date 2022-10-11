import React, { useContext, useState } from 'react'
import { Form, Input, Modal, Upload, Radio, message, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App'
import FormPage from '../../9Boxs/components/FormPageTemplate/FormPage';
import AddContentRequest from '../API/AddContentRequest';
import SubmitCancel from '../../9Boxs/components/SubmitCancel/SubmitCancel';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const radioBtnsStyle = {
    display: 'flex',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 1,
    webkitLineClamp: 1,
    webkitBoxOrient: 'vertical'
  }





function NewRequest() {
  const { defualt_route, user_data } = useContext(AppCtx);
  const [requestType, setRequestType] = useState("Internal Announcement Request");
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
  // const beforeUpload = (file) => {
  //   const reader = new FileReader();
  //   console.log(file)
  //     reader.onload = e => {
  //       const newFile = {
  //         name: file.name,
  //         content: e.target.result
  //       };
  //       setFileList(prev => [...prev, newFile])
  //       console.log('newFile', {
  //         name: file.name,
  //         content: e.target.result
  //       });
  //     }
  //     reader.readAsArrayBuffer(file);

  //     console.log('newFile', fileList);
      


  //   // Prevent upload
  //   // return false;
  // }
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  let navigate = useNavigate();


  async function CreateRequest(values) {
    let isFilesFinishUpload = true;
    const attachmentsList = fileList.map(file => {
      if(file.status === "uploading") isFilesFinishUpload = false
        return {
          fileName: file.name, 
          path: file.response?.uploadedFiles[0]?.Path
        }
      });
    values.Title = values.Subject;
    values.AttachmentsRows = JSON.stringify(attachmentsList);
    if(values && isFilesFinishUpload) {
      const response = await AddContentRequest(values)
      if(response.data) {
        form.resetFields();
        message.success("The request has been sent successfully.")
        setBtnLoader(false);
        setFileList([]);
        navigate(`${defualt_route}/content-requests/${response.data.Id}`)
        console.log(response);
      } else {
        message.error("Failed to send request.")
        setBtnLoader(false);
      }
      // .then((item) => {
      //    item.item.attachmentFiles.addMultiple(fileList)
      // });
    } else {
      message.error("Wait for upload")
      setBtnLoader(false);
    }
  }
  const onFinishFailed = () => { message.error("Please, fill out the form correctly.") }




  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/content-requests`)}>Content Requests</a>
        <p>New Request</p>
      </HistoryNavigation>

      <FormPage
        user_data={user_data}
        pageTitle='New Request'
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
          name="content-request" 
          form={form} 
          onFinish={CreateRequest}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item name="RequestType" label="Request Type" initialValue="Internal Announcement Request">
            <Radio.Group
              options={[{label: 'Internal Announcement Request', value: 'Internal Announcement Request'}, {label: 'Media Request', value: 'Media Request'}]}
              onChange={ ({target: {value}}) => setRequestType(value) }
              value={requestType}
              optionType="button"
              buttonStyle="solid"
              style={radioBtnsStyle}
              size="large"
              defaultValue="Internal Announcement Request"
            />
          </Form.Item>


          <Form.Item name='Subject' label="Subject" rules={[{required: true}]}>
            <Input placeholder='Subject' size='large' />
          </Form.Item>
          

          <Form.Item name="Descriptions" label="Descriptions" rules={[{required: true}]}>
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>


          <Form.Item label="Attachments">
            <Upload   
              action="https://salicapi.com/api/uploader/up"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              // beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : <div><PlusOutlined /><div style={{marginTop: 8,}}>Upload</div></div>}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage} />
            </Modal>
          </Form.Item>


          <SubmitCancel loaderState={btnLoader} backTo="content-requests" />
        </Form>
      </FormPage>
    </>
  )
}

export default NewRequest