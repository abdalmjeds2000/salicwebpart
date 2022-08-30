import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Form, Input, Upload, Radio, Select, DatePicker, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation'
import FormPage from '../../components/FormPageTemplate/FormPage'
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';

const { Option } = Select;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function IssuingVISA() {
  const { user_data } = useContext(AppCtx);
  const [serivceType, setSerivceType] = useState('');
  
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);



  let getDateAndTime = () => {
    const today = new Date();
    const date = today.getDate() +'-'+ (today.getMonth()+1)+'-' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() 
    return date + ' ' + time
  }


  return (
    <>
      <HistoryNavigation>
        <NavLink to="/admin-services">Admin Service</NavLink>
        <p>Issuing VISA</p>
      </HistoryNavigation>
      

      <FormPage
        user_data={user_data}
        pageTitle='VISA Application'
        tips_userInfo={[
          {title: 'SALIC', text: user_data.Data?.Department},
          {title: 'Nationality', text: user_data.Data?.Nationality},
          {title: 'ID #', text: user_data.Data?.Id},
        ]}
        tipsList={[
          "Fill out required fields carefully.",
          "Before refer the enrollment to the users, please read it carefully and refer it to all participants.",
          "Note : For Annual Leaves, foreigner has only one time VISA in a year for free. Otherwise, you have to attach the VISA payment bill",
          "Check your email regularly. You will receive a notification on every future actions",
        ]}
      >
        <Form 
          {...layout} 
          colon={false}
          labelWrap 
          name="service-request" 
          onFinish={values => console.log(values)} /* validateMessages={validateMessages} */
          layout="horizontal"
        >
          

          <Form.Item name="On Behalf Of" label="On Behalf Of">
            <Select
              showSearch
              placeholder="the user name"
              // onChange={value => console.log(value)}
              // onSearch={value => console.log(value)}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              <Option value="Module">Module</Option>
              <Option value="SDS">SDS</Option>
              <Option value="Attendance">Attendance</Option>
            </Select>
          </Form.Item>
          <Form.Item name="VISA Reason" label="VISA Reason">
            <Select
              placeholder="select one value"
              // onChange={value => console.log(value)}
              size="large"
              defaultValue="Annual Leave"
            >
              <Option value="Annual Leave">Annual Leave</Option>
              <Option value="Business Trip">Business Trip</Option>
              <Option value="Training">Training</Option>
            </Select>
          </Form.Item>
          
          <hr />
          
          <Form.Item name="Date" label="Date" rules={[{required: true}]} initialValue={getDateAndTime()} >
            <Input placeholder='Date' size='large' disabled />
          </Form.Item>

          <hr />

          <Form.Item name="With Family" label="With Family">
            <Radio.Group
              options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
              onChange={ ({target: {value}}) => setSerivceType(value) }
              value={serivceType}
              optionType="button"
              buttonStyle="outline"
              style={{width: '100%'}}
              defaultValue="Yes"
            />
          </Form.Item>
          <Form.Item name="VISA Type" label="VISA Type">
            <Radio.Group
              options={[{label: 'Single', value: 'Single'}, {label: 'Multiple', value: 'Multiple'}]}
              onChange={ ({target: {value}}) => setSerivceType(value) }
              value={serivceType}
              optionType="button"
              buttonStyle="outline"
              style={{width: '100%'}}
              defaultValue="Single"
            />
          </Form.Item>
          <Form.Item name="VISA Duration" label="VISA Duration">
            <Select
              placeholder="select one value"
              // onChange={value => console.log(value)}
              size="large"
            >
              <Option value="One Month">One Month</Option>
              <Option value="Two Months">Two Months</Option>
              <Option value="Three Months">Three Months</Option>
            </Select>
          </Form.Item>

          <hr />

          <Form.Item name="ID Expire Date" label="ID Expire Date">
            <DatePicker placeholder='mm/dd/yyyy' format='MM/DD/YYYY' size='large' />
          </Form.Item>
          <Form.Item name="Descriptions" label="Descriptions">
            <Input.TextArea rows={6} placeholder="write a brief description" />
          </Form.Item>
          <Form.Item name="Verification Documents" label="Verification Documents">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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

          <SubmitCancel formSubmitHandler={_ => {alert('Submit')}} />
        </Form>
      </FormPage>
    </>
  )
}

export default IssuingVISA