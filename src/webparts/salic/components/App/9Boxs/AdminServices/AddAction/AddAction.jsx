import React, { useContext, useState } from 'react';
import { FileProtectOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Radio, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { AppCtx } from '../../../App';


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
      // const response = await AddActionRequest(RequestType, formValues);
      // console.log(response);
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
        okButtonProps={{style: {display: 'none'}}}
        onCancel={() => setOpenModal(false)}
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

          <Button type='primary' htmlType='submit' style={{width: '100%'}}>Send & Close</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default AddAction