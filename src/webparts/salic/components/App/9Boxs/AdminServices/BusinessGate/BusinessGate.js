import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Form, DatePicker, message, Spin, Input } from 'antd';
import moment from 'moment';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import EditableTable from '../../components/EditableTable/EditableTableBusinessGate';
import { AppCtx } from '../../../App';
import BusinessGateRequest from './API/BusinessGateRequest';
import GetBusinessGateById from './API/GetBusinessGateById';
import { LoadingOutlined } from '@ant-design/icons';
import ActionsTable from '../../components/ActionsTable/ActionsTable';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function BusinessGate() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});
  const [dataSource, setDataSource] = useState([{ key: 0, Name: "", Email: "", Mobile: "", Company: "", Car: false }]);


  async function CreateBusinessGateRequest(values) {
    setLoading(true);
    let validation = true;
    for(let key in dataSource) {
      if(dataSource[key].Name === "") validation = false
    }
    if(validation) {
      values.Date = new Date(values.Date).toLocaleDateString();
      values.EndDate = new Date(values.EndDate).toLocaleDateString();
      const guests = dataSource.map(g => {
        delete g.key
        return {...g}
      })
      const formData = {
        Email: user_data?.Data?.Mail,
        ReferenceCode: "auto generated",
        Id: 0,
        Files: "",
        ...values,
        Guest: guests
      }
      const response = await BusinessGateRequest(formData);
      if(response) {
        form.resetFields();
        setDataSource([{ key: 0, Name: "", Email: "", Mobile: "", Company: "", Car: false }]);
        message.success("The request has been sent successfully.")
        console.log(formData);
      } else {
        message.error("Failed to send request.")
      }
    } else {
      message.error("Please Fill Form Correctly.")
    }
    setLoading(false);
  }

  async function GetBusinessGateRequestData(email, id) {
    setLoading(true);
    const response = await GetBusinessGateById(email, id);
    if(response.data.Status === 200 && response.data.Data.length > 0) {
      console.log(response.data.Data[0]);
      setRequestData(response.data.Data[0]);
      setDataSource(JSON.parse(response.data.Data[0].Guests));
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
        <p>{!id && 'New '}Business Gate Request</p>
      </HistoryNavigation>
      
      {
        !loading
        ? <FormPage
            pageTitle={!id ? 'New Business Gate Entry' : 'Business Gate Entry'}
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
              name="business-gate" 
              layout="horizontal"
              form={form} 
              onFinish={CreateBusinessGateRequest}
              onFinishFailed={() => message.error("Please, fill out the form correctly.")}
            >
              
              { id &&
                <Form.Item name='ReferenceCode' label="Reference Code" initialValue={id ? requestData.ReferenceCode : ''} >
                  <Input size='large' disabled />
                </Form.Item> }

              <Form.Item name="Date" label="Expected Entry Date" rules={[{required: true,}]}>
              {
                !id
                ? <DatePicker
                    showTime 
                    format="MM-DD-YYYY hh:mm" 
                    disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))} 
                    size='large'
                    disabled={id ? true : false}
                  />
                : <Input size='large' disabled defaultValue={moment(requestData.Date).format("MM-DD-YYYY hh:mm")} />
              }
              </Form.Item>
              <Form.Item name="EndDate" label="Expected Exit Date" rules={[{required: true,}]}>
                {
                  !id
                  ? <DatePicker
                      showTime 
                      format="MM-DD-YYYY hh:mm"
                      disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))} 
                      size='large'
                      disabled={id ? true : false}
                    />
                  : <Input size='large' disabled defaultValue={moment(requestData.EndDate).format("MM-DD-YYYY hh:mm")} />
                }
              </Form.Item>
    
              <hr />
    
              <EditableTable dataSource={dataSource} setDataSource={setDataSource} PreviewMode={id ? true : false} />
    
              <hr />
    
              <SubmitCancel loaderState={loading} isUpdate={id ? true : false} backTo="/admin-services" />
            </Form>

            {id && <ActionsTable ActionData={requestData.Status || []} />}
          </FormPage>
        : <div style={{display: 'flex', justifyContent: 'center'}}>
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
      }
    </>
  )
}

export default BusinessGate