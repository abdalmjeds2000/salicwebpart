import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Radio, Row, DatePicker, message, Spin } from 'antd';
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import EditableTable from '../../components/EditableTable/EditableTableTransportation';
import { AppCtx } from '../../../App';
import TransportationRequest from './API/TransportationRequest';
import GetTransportationRequest from './API/GetTransportationRequest';
import ActionsTable from '../../components/ActionsTable/ActionsTable';

const { Search } = Input;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function Transportation() {
  const { id } = useParams();
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [passenger, setPassenger] = useState([{ key: 0, Name: '', Phone: '', Reason: '' }]);
  const [requestData, setRequestData] = useState({});
  const [serivceType, setSerivceType] = useState(id ? requestData.ToLink : 'OneWay');


  async function CreateBusinessGateRequest(values) {
    setLoading(true);
    let validation = true;
    for(let key in passenger) {
      if(passenger[key].Name === "" || passenger[key].Phone === "" || passenger[key].Reason === "") validation = false
    }

    if(validation) {
      values.Date = new Date(values.Date).toLocaleDateString();
      // reset editable table
      const passengers = passenger.map(p => {
        delete p.key
        return {...p}
      })
      // request payload
      const formData = {
        Email: user_data?.Data?.Mail,
        ReferenceCode: "auto generated",
        Files: "",
        Id: 0,
        ...values,
        Passenger: passengers
      }
      const response = await TransportationRequest(formData);
      if(response.data) {
        form.resetFields();
        setSerivceType("OneWay")
        setPassenger([{ key: 0, Name: '', Phone: '', Reason: '' }]);
        message.success("The request has been sent successfully.")
        console.log(formData);
      } else {
        message.error("Failed to send request.")
      }
    } else {
      message.error("Passenger Informations is required")
    }
    setLoading(false);
  }

  async function GetBusinessGateRequestData(email, id) {
    setLoading(true);
    const response = await GetTransportationRequest(email, id);
    if(response.data.Status === 200 && response.data.Data.length > 0) {
      console.log(response);
      setRequestData(response.data.Data[0]);
      // setDataSource(JSON.parse(response.data.Data[0].Guests));
    } else {
      message.error("Error Get Request Data")
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) {
      if(Object.keys(user_data).length > 0 && Object.keys(requestData).length === 0) {
        GetBusinessGateRequestData(user_data.Data.Mail, id);
      }
    } else {
      setLoading(false);
    }
  }, [user_data]);

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>{!id && 'New '}Transportation Request</p>
      </HistoryNavigation>
      
      {
        !loading
        ? (
            <FormPage
              pageTitle={!id ? 'New Transportation Request' : 'Transportation Request'}
              Email={id ? requestData?.ByUser?.Mail : user_data.Data.Mail}
              UserName={id ? requestData?.ByUser?.DisplayName : user_data.Data.DisplayName}
              UserDept={id ? requestData?.ByUser?.Title : user_data.Data.Title}
              UserNationality={id ? ' - ' : user_data.Data.Nationality || ' - '}
              UserId={id ? requestData.ByUser?.Iqama || ' - ' : user_data.Data?.Iqama || ' - '}
              tipsList={[
                "Fill out required fields carefully.",
                "Check your email regularly. You will receive a notification on every future actions",
                "For additional information, Please contact administrative office or call us at +966 55 5040 314"
              ]}
            >
              <Form 
                {...layout} 
                colon={false}
                labelWrap 
                name="transportation-request" 
                layout="horizontal"
                form={form} 
                onFinish={CreateBusinessGateRequest}
                onFinishFailed={() => message.error("Please, fill out the form correctly.")}
              >

                
                {
                  !id
                  ? <Form.Item name="Date" label="Date" rules={[{required: true,}]}>
                      <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))} size='large' /* onChange={} onOk={} */ />
                    </Form.Item>
                  : <Input size='large' disabled defaultValue={moment(requestData.Date).format("MM-DD-YYYY hh:mm")} />
                }
                <Form.Item name="From" label="From" rules={[{required: true}]} initialValue={id ? requestData.From : ''} disabled={id ? true : false} style={{marginBottom: '12px'}}>
                  <Input placeholder='' size='large' gutter={10} />
                </Form.Item>
                <Form.Item name="FromLink" label="From Link" initialValue={id ? requestData.FromLink : ''} disabled={id ? true : false} rules={[{required: true}]} >
                  <Search 
                    placeholder="google map link" 
                    allowClear 
                    enterButton={<a href='https://www.google.com/maps' target="blank"><EnvironmentOutlined /></a>}
                  />
                </Form.Item>
                <Form.Item name="To" label="To" rules={[{required: true}]} initialValue={id ? requestData.To : ''} disabled={id ? true : false} style={{marginBottom: '12px'}}>
                  <Input placeholder='' size='large' gutter={10} />
                </Form.Item>
                <Form.Item name="ToLink" label="To Link" initialValue={id ? requestData.ToLink : ''} disabled={id ? true : false} rules={[{required: true}]} >
                  <Search 
                    placeholder="google map link" 
                    allowClear 
                    enterButton={<a href='https://www.google.com/maps' target="blank"><EnvironmentOutlined /></a>}
                  />
                </Form.Item>
                <hr />
                
                <Form.Item name="ServiceType" label="Serivce Type" initialValue={id ? requestData.ServiceType : 'OneWay'} disabled={id ? true : false}>
                  <Radio.Group
                    options={[{label: 'One Way', value: 'OneWay'}, {label: 'Round Trip', value: 'RoundTrip'}]}
                    onChange={ ({target: {value}}) => setSerivceType(value) }
                    value={serivceType}
                    optionType="button"
                    buttonStyle="solid"
                    style={{width: '100%'}}
                    size="large"
                    defaultValue="One Way"
                  />
                </Form.Item>
                {serivceType === 'RoundTrip' && 
                <Form.Item name="WaitingTime" label="Waiting Time" initialValue={id ? requestData.WaitingTime : ''} disabled={id ? true : false}>
                  <Input placeholder='' size='large' />
                </Form.Item>}
                
                <hr />

                <EditableTable dataSource={passenger} setDataSource={setPassenger} />
                <hr />

                <SubmitCancel loaderState={loading} isUpdate={id ? true : false} backTo="/home" />
              </Form>

              {id && <ActionsTable ActionData={requestData.Status || []} />}
            </FormPage>
          )
        : <div style={{display: 'flex', justifyContent: 'center'}}>
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
      }
      
    </>
  )
}

export default Transportation