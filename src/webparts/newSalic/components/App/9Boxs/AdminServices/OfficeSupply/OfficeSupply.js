import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Form, Input, Upload, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';

const { Option } = Select;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };





function OfficeSupply() {
  const { user_data } = useContext(AppCtx);

  let getDateAndTime = () => {
    const today = new Date();
    const date = today.getDate() +'-'+ (today.getMonth()+1)+'-' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() 
    return date + ' ' + time
  }
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <>
      <HistoryNavigation>
        <NavLink to="/admin-services">Admin Service</NavLink>
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
          onFinish={onFinish} 
        >

          <Form.Item name="date" label="Date" rules={[{required: true,}]} initialValue={getDateAndTime()} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>
          
          <hr />

          <Form.Item name="Requester" label="Requester">
            <Input placeholder='' size='large' />
          </Form.Item>

          <Form.Item name="Items" label="Items" rules={[{required: true}]}>
            <Form.List
              name="names"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject();
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      required={false}
                      key={field.key}
                    >
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <Select
                          placeholder="select one value"
                          // onChange={value => console.log(value)}
                          size="large"
                          style={{width: '70%'}}
                        >
                          <Option value="Laptop">Laptop</Option>
                          <Option value="Monitor">Monitor</Option>
                          <Option value="Printer">Printer</Option>
                        </Select>
                        <Input placeholder='Quantity' size='large' style={{width: '30%'}} />
                        {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                      </div>

                      
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{width: '100%',}}
                      icon={<PlusOutlined />}
                    >
                      Add More
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <SubmitCancel formSubmitHandler={_ => {alert('Submit')}} />
        </Form>
      </FormPage>
    </>
  )
}

export default OfficeSupply