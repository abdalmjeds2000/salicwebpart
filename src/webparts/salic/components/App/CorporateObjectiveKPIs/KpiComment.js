import React, { useEffect, useState } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import UpdateItem from './API/UpdateItem';

function KpiComment(props) {
  const [openModal, setOpenModal] = useState(false)
  const [btnLoader, setBtnLoader] = useState(0);
  const [form] = Form.useForm();

  const AddComment = async (FormData) => {
    setBtnLoader(true);
    console.log('comment FormData', FormData)
    if(props.CurrentComment !== FormData.Comment) {
      const updateResponse = await UpdateItem(props.KpiId, FormData)
      props.getNewCommentValue(FormData.Comment)
      setOpenModal(false);
      onReset();
      message.success("Your Comment has been Added Successfully");
    } else {
      message.error("Error, same last Comment!");
    }

    setBtnLoader(false);
  }
  const onReset = () => form.resetFields();
  useEffect(() => {
    if(!openModal) {
      onReset();
    }
  }, [openModal])
  return (
    <>
      <Tooltip placement="left" title="Comment">
        <a onClick={() => setOpenModal(true)}>
          <CommentOutlined style={{width: '100%'}} />
        </a>
      </Tooltip>
      <Modal
          title={`Comment for KPI .::: ${props.KpiTitle} :::.`}
          visible={openModal}
          onCancel={() => setOpenModal(false)}
          okButtonProps={{ style: {display: 'none'}}}
        >
          <Form name="KPI-Comment" form={form} onFinish={AddComment} layout="vertical" onFinishFailed={() => message.error("Fill Form Correctly!")}>
            <Form.Item
              label="Comment"
              name="Comment"
              rules={[{required: true, message: ''}]}
              initialValue={props.CurrentComment}
            >
              <TextArea showCount rows={4} maxLength={500} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}} disabled={btnLoader}>
                Send Comment
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    </>
  )
}

export default KpiComment