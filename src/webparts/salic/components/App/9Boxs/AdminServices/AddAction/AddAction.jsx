import React, { useContext, useState } from 'react';
import { FileProtectOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, message, Modal, Radio, Row, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { AppCtx } from '../../../App';
import AddActionRequest from './AddActionRequest';


function AddAction({ RequestType, ModalTitle }) {
  const { user_data } = useContext(AppCtx);
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(true);



  const TakeAction = async (formValues) => {
    setBtnLoading(true);
    let isFilesFinishUpload = true;
    const files = fileList.map(file => {
      if(file.status === "uploading") isFilesFinishUpload = false
      return file.response?.uploadedFiles[0]?.Name
    }).join();

    if(isFilesFinishUpload) {
      formValues.ByUser = user_data.Data.Mail;
      formValues.Files = files;
      formValues.OriginalFiles = "";
      const response = await AddActionRequest(RequestType, formValues);
      console.log(response);
      console.log(RequestType, formValues)
      setOpenModal(false);
      form.resetFields();
      setFileList([]);
      setIsShowing(false);
    } else {
      message.error("Wait For Uploading...")
    }
    setBtnLoading(false);
  }



  return (
    <div>
      {isShowing && <Button type='primary' size='middle' disabled={btnLoading} onClick={() => setOpenModal(true)}>Approve</Button>}
      <Modal
        title={<><FileProtectOutlined /> {ModalTitle}</>}
        open={openModal} 
        onCancel={() => setOpenModal(false)}
        footer={false}
        destroyOnClose
      >
        <Form
          name="admin-request-action" 
          layout="vertical"
          form={form}
          onFinish={TakeAction}
          onFinishFailed={() => message.error("Please, fill out the form correctly.")}
        >
          <Form.Item name="ActionStatus" label="Status" rules={[{required: true}]}>
            <Radio.Group>
              <Radio value="1">Approved</Radio>
              <Radio value="2">Rejected</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="notes" label="Subject" rules={[{required: true}]}>
            <TextArea rows={4} placeholder="Write Here"></TextArea>
          </Form.Item>
          
          <Form.Item label="Attach Files">
            <Upload
              action="https://salicapi.com/api/uploader/up"
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            >
              <Button type='ghost' icon={<UploadOutlined />}>Attach Files</Button>
            </Upload>
          </Form.Item>
          <Row justify="end" align="middle" gutter={[10, 10]}>
            <Col>
              <Button type='primary' htmlType='submit'>Send & Close</Button>
            </Col>
            <Col>
              <Button type='default' onClick={() => setOpenModal(false)}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default AddAction