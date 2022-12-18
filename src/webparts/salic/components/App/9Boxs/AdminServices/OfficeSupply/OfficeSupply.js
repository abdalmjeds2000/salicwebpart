import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input, message, Select, Spin, Table } from 'antd';
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import FormPage from '../../components/FormPageTemplate/FormPage';
import SubmitCancel from '../../components/SubmitCancel/SubmitCancel';
import { AppCtx } from '../../../App';
import moment from 'moment';
import OfficeRequest from './API/OfficeRequest';
import GetOfficeSupplyRequestById from './API/GetOfficeSupplyRequestById'
import ActionsTable from '../../components/ActionsTable/ActionsTable';
import AddAction from '../AddAction/AddAction';
import pnp from 'sp-pnp-js';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';
const { Option } = Select;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };





function OfficeSupply() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});
  const [approvals, setApprovals] = useState([]);

  async function GetApprovals() {
    const response = await pnp.sp.web.lists.getByTitle('Admin Services Approvals').items.select('Email/Title,Email/EMail,*').filter("Title eq 'Office Supply'").expand('Email').get();
    setApprovals(response);
  }

  async function CreateOfficeSupplyRequest(values) {
    setLoading(true);
    const formData = {
      CreatedBy: user_data?.Data?.Mail,
      ReferenceCode: "auto generated",
      Files: "",
      Id: 0,
      ...values
    }
    if(values) {
      const response = await OfficeRequest(formData);
      if(response.data) {
        form.resetFields();
        message.success("The request has been sent successfully.")
        setLoading(false);
        console.log(formData);
      } else {
        message.success("Failed to send request.")
        setLoading(false);
      }
      
    } else {
      message.error("Failed to send request.")
      setLoading(false);
    }
  }

  async function GetOfficeSupplyRequestData(email, id) {
    setLoading(true);
    const response = await GetOfficeSupplyRequestById(email, id);
    if(response.data.Status === 200 && response.data.Data.length > 0) {
      console.log(response.data.Data[0]);
      setRequestData(response.data.Data[0])
    } else {
      message.error("Error Get Request Data")
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) {
      if(Object.keys(user_data).length > 0 && Object.keys(requestData).length === 0) {
        GetOfficeSupplyRequestData(user_data.Data.Mail, id);
        GetApprovals();
      }
    } else {
      setLoading(false);
    }
  }, [user_data])



  // Check Request Status
  let requestStatus = '';
  if(requestData !== undefined && Object.keys(requestData).length > 0) {
    requestStatus = requestData?.Status[requestData?.Status?.length-1]?.Type
  }
  // Check Is Approval
  let IsApproval = false;
  if(approvals !== undefined && Object.keys(approvals).length > 0) {
    for (const approval of approvals) {
      if (approval.Email?.EMail?.toLowerCase() === user_data.Data?.Mail?.toLowerCase()) {
        IsApproval = true;
        break;
      }
    }
  }



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/admin-services`)}>Admin Service</a>
        <p>Office Supply</p>
      </HistoryNavigation>
      

      {
        !loading
        ? <FormPage
            pageTitle={!id ? 'New Office Supply Request' : 'Office Supply Request'}
            Header={
              id && requestStatus !== "FIN" && IsApproval &&
              <AddAction RequestType="Office" ModalTitle=" Approve Office Request" /> 
            }
            Email={id ? requestData?.ByUser?.Mail : user_data.Data.Mail}
            UserName={id ? requestData?.ByUser?.DisplayName : user_data.Data.DisplayName}
            UserDept={id ? requestData?.ByUser?.Title : user_data.Data.Title}
            UserNationality={id ? ' - ' : user_data.Data.Nationality || ' - '}
            UserId={id ? requestData.ByUser?.Iqama || ' - ' : user_data.Data?.Iqama || ' - '}
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
              onFinishFailed={() => message.error("Please, fill out the form correctly.")}
            >

              <Form.Item name="Date" label="Date" rules={[{required: true,}]} initialValue={moment().format('MM-DD-YYYY hh:mm')} >
                <Input placeholder='Date' size='large' disabled />
              </Form.Item>
              
              <hr />

              <Form.Item name="Requester" label="Requester" initialValue={id ? requestData.ByUser?.DisplayName : ''}>
                <Input placeholder='' size='large' disabled={id ? true : false}/>
              </Form.Item>

              {
                !id
                ? <Form.Item label="Items" required>
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
                              <Form.Item name={[field.name, 'Key']} style={{width: '70%', margin: 0}} rules={[{required: true, message: 'Required'}]}>
                                <Select
                                  placeholder="select one value"
                                  size="large"
                                >
                                  <Option value="Laptop">Laptop</Option>
                                  <Option value="Monitor">Monitor</Option>
                                  <Option value="Printer">Printer</Option>
                                </Select>
                              </Form.Item>
                              <Form.Item name={[field.name, 'Value']} style={{width: '30%', margin: 0}} rules={[{required: true, message: 'Required'}]}>
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
                : <Form.Item label="Items" required>
                    <Table
                      size='small'
                      columns={[{title: '#', dataIndex: 'Id', width: '10%'}, {title: 'Item', dataIndex: 'Key', width: '70%'}, {title: 'Quantity', dataIndex: 'Value', width: '20%'}]}
                      pagination={false}
                      dataSource={JSON.parse(requestData.Items).map((item, i) => {
                        item.Id = i+1;
                        return {...item}
                      })}
                    />
                  </Form.Item>
              }
              
              {!id && <SubmitCancel loaderState={loading} isUpdate={id ? true : false} backTo="/admin-services" />}
            </Form>
            {id && <ActionsTable ActionData={requestData.Status || []} />}
          </FormPage>
        : <AntdLoader />
      }
    </>
  )
}

export default OfficeSupply