import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, message, notification, Radio, Row, Upload } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import pnp from 'sp-pnp-js';
import { AppCtx } from '../App';



const NewsForm = ({ openModal, isEditMode, item }) => {
  const { user_data, setNewsList } = useContext(AppCtx);
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const types = ["image/jpeg","image/jpg","image/png"];
  const [description, setDescription] = useState('');
  const [form] = Form.useForm();

  const SubmitForm = async (formData) => {
    setLoading(true);

    formData.Title = formData.Subject;
    formData.Description = description;
    let validation = true;

    if(description?.length === 0 || filesList[0]?.status === "uploading") validation = false;
    if(validation) {
      formData.Photos = filesList[0]?.response?.uploadedFiles[0]?.Path;
      if(!isEditMode) {
        if(filesList.length !== 0) {
          const responseAdd = await pnp.sp.web.lists.getByTitle('News').items.add(formData);
          if(responseAdd?.data) {
            console.log('responseAdd', responseAdd)
            responseAdd?.data.AttachmentFiles = [];
            responseAdd?.data?.Author = {
              Title: user_data.Data.DisplayName,
              EMail: user_data.Data.Mail,
            }
            setNewsList(prev => [responseAdd?.data, ...prev]);
            notification.success({message: "News has been added succefully"});
            form.resetFields();
            setFilesList([]);
            setDescription("");
            openModal(false);
          }
        } else message.error("Wait For Uploading...")
      } else {
        const responseUpdate = await pnp.sp.web.lists.getByTitle('News').items.getById(item.Id).update(formData);
        notification.success({message: "News has been updated succefully"});
        console.log('responseUpdate', responseUpdate);
        form.resetFields();
        setFilesList([]);
        setDescription("");
        openModal(false);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if(isEditMode) document.getElementsByClassName("ql-editor")[0].innerHTML = item.Description;
  }, [])

  return (
    <div>
      <Form form={form} layout='vertical' onFinish={SubmitForm} onFinishFailed={() => message.error("Please, fill out the form correctly")}>
        <Row gutter={[20, 20]}>
          <Col md={24} lg={12}>
            <Form.Item name="CreatedOn" label="Date & Time" initialValue={isEditMode ? moment(item.CreatedOn).format('MM/DD/YYYY hh:mm') : moment().format('MM/DD/YYYY hh:mm')} rules={[{required: true, message: false}]}>
              <Input disabled size='large' />
            </Form.Item>
            <Form.Item name="Subject" label="Subject" initialValue={isEditMode ? item.Subject : ''} rules={[{required: true, message: false}]}>
              <Input maxLength={100} showCount placeholder='enter news title' />
            </Form.Item>
            <Form.Item label="Description">
              <ReactQuill
                id='editor'
                style={{ background: "rgb(243 243 243)", color: "black" }}
                theme="snow"
                value={description}
                onChange={() => {
                  const content = document.getElementsByClassName("ql-editor")[0].innerHTML;
                  setDescription(content);
                }}
              />
            </Form.Item>
          </Col>

          <Col md={24} lg={12}>
            <Form.Item label="Add Photo">
              <Upload
                accept=".jpg,.jpeg,.png"
                beforeUpload={(file) => {
                  if (!types.includes(file.type)) {
                    message.error(`${file.name} is not a photo, please enter jpg, jpeg or png image.`);
                    return false;
                  } else {
                    return true
                  }
                }}
                action="https://salicapi.com/api/uploader/up"
                fileList={filesList}
                onChange={(file) => {setFilesList(file.fileList); console.log(file.fileList)}}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item name="IsPerson" label="Is this Person Photo ?" initialValue={isEditMode ? item.IsPerson : ''} rules={[{required: true, message: false}]}>
                  <Radio.Group options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="IsDraft" label="Is Draft ?" initialValue={isEditMode ? item.IsDraft : ''} rules={[{required: true, message: false}]}>
                  <Radio.Group options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]} />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <img
              src={
                isEditMode
                ? filesList[0]?.response?.uploadedFiles[0]?.Path || item.Photos
                : filesList[0]?.response?.uploadedFiles[0]?.Path || `https://salic.sharepoint.com/sites/newsalic/SiteAssets/images/no_preview.png`}
              alt=''
              style={{width: 'auto', height: '210px'}}
            />
          </Col>

          <Col span={24}>
            <Button type='primary' loading={loading} size='large' htmlType='submit' style={{width: '100%'}}>
              {isEditMode ? 'Update News' : 'Add News'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default NewsForm