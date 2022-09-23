import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import FormItem from 'antd/es/form/FormItem';

const { Option } = Select;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };





function OfficeSupply() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [btnLoader, setBtnLoader] = useState(false)


  async function CreateOfficeSupplyRequest(values) {
    setBtnLoader(true);
    if(values) {
      const formData = {
        CreatedBy: user_data?.Data?.Mail,
        ...values
      }
      form.resetFields();
      message.success("The request has been sent successfully.")
      setBtnLoader(false);
      console.log(formData);
    } else {
      message.error("Failed to send request.")
      setBtnLoader(false);
    }
  }
  
  const onFinishFailed = () => {
    message.error("Please, fill out the form correctly.")
  }



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>Office Supply</p>
      </HistoryNavigation>
      

      <FormPage
        user_data={user_data}
        pageTitle='New Office Supply Request'
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
          name="Office Supply" 
          layout="horizontal"
          form={form} 
          onFinish={CreateOfficeSupplyRequest}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item name="Date" label="Date" rules={[{required: true,}]} initialValue={moment().format('MM-DD-YYYY hh:mm')} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>
          
          <hr />

          <Form.Item name="Requester" label="Requester">
            <Input placeholder='' size='large' />
          </Form.Item>

          <Form.Item label="Items" colon>
            <Form.List
              name="Items"
              rules={[{
                  validator: async (_, items) => {
                    if (!items || items.length < 1) {
                      return Promise.reject();
                    }},
                  }]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px'}}>
                      <Form.Item name={[field.name, 'type']} style={{width: '70%', margin: 0}} rules={[{required: true, message: 'Required'}]}>
                        <Select
                          placeholder="select one value"
                          size="large"
                          name={[field.name, 'type']}

                        >
                          <Option value="Laptop">Laptop</Option>
                          <Option value="Monitor">Monitor</Option>
                          <Option value="Printer">Printer</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={[field.name, 'quantity']} style={{width: '30%', margin: 0}} rules={[{required: true, message: 'Required'}]}>
                        <Input placeholder='Quantity' size='large' />
                      </Form.Item>
                      {fields.length > 1 ? (<MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />) : null}
                    </div>
                  ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{width: '100%',}}
                      icon={<PlusOutlined />}
                    >
                      Add More
                    </Button>
                    <Form.ErrorList errors={errors} />
                </>
              )}
            </Form.List>
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} />
        </Form>
      </FormPage>
    </>
  )
}

export default OfficeSupply