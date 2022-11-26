import { Alert, Col, DatePicker, Divider, Form, Input, InputNumber, message, notification, Row, Select } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPageTemplate from '../../9Boxs/components/FormPageTemplate/FormPage';
import { AppCtx } from '../../App';
import HistoryNavigation from "../../Global/HistoryNavigation/HistoryNavigation";
import moment from "moment";
import TextArea from 'antd/lib/input/TextArea';
import SubmitCancel from '../../9Boxs/components/SubmitCancel/SubmitCancel';
import axios from 'axios';

const NewIncidentReport = () => {
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  

  const SubmitForm = async (dataForm) => {
    setLoading(true);
    dataForm.RiskTypeName = riskType.filter(row => row.Type == dataForm.RiskType)[0]?.Name || '';
    dataForm.email = user_data.Data.Mail;
    dataForm.Id = user_data.Data.Id;
    dataForm.DiscoveryDate = moment(dataForm.DiscoveryDate).format('MM/DD/YYYY');
    dataForm.IncidentDate = moment(dataForm.IncidentDate).format('MM/DD/YYYY');
    
    await axios.post('https://salicapi.com/api/Incidents/Add', dataForm)
      .then((response) => {
        console.log(response);
        form.resetFields();
        notification.success({message: 'Success'});
        navigate(defualt_route + '/incidents-center/my-reports');
      })
    setLoading(false);
  }
  let values = riskType.filter((r)=> { return r.Type === formData.RiskType })[0]?.Incident;



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/incidents-center`)}>Risk Center</a>
        <p>New Incident Report</p>
      </HistoryNavigation>

      <FormPageTemplate
        pageTitle="Incident Report"
        tipsList={[
          "Fill out all required fields marked as ‘*’ carefully.",
          "Incident date is the date in which incident occur.",
          "Discovery date is the date in which incident has been found.",
          "Be specific in choosing \"Risk Type\" & \"Incident Type\" as the system will assign this report to the appropriate team member.",
          "Describe incident completely and precisely.",
        ]}
      >
        <Form
          layout="vertical"
          colon={false}
          form={form}
          labelWrap
          name="incident-report"
          onFinish={SubmitForm}
          onFinishFailed={() => message.error("Please, fill out the form correctly.") }
          onValuesChange={(changedValues, allValues) => setFormData(allValues)}
        >
          <Row gutter={25}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Form.Item name="Number" label="Operational Incident NO." initialValue={"<<auto generated>>"} rules={[{ required: true }]}>
                    <Input placeholder="" size="large" disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="Country" label="Country" rules={[{ required: true }]}>
                    <Select placeholder="Select Country" size="large">
                      <Select.Option value="KSA">KSA</Select.Option>
                      <Select.Option value="Ukranie">Ukranie</Select.Option>
                      <Select.Option value="Australia">Australia</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="HasFinancialImpact" label="Has Financial Impact" initialValue="False" rules={[{ required: true }]}>
                    <Select placeholder="Select Value" size="large">
                      <Select.Option value="True">Yes</Select.Option>
                      <Select.Option value="False">No</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify="space-between">
                <Col span={24}>
                  <Form.Item name="ReportingDate" label="Reporting Date" initialValue={moment().format('MM/DD/YYYY')}>
                    <Input placeholder="" size="large" disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  {formData.Country !== "KSA" && formData.HasFinancialImpact === "True" && <Form.Item 
                    name="Amount" 
                    label={<>Amount (<b>SAR</b>)</>} 
                    hasFeedback 
                    help={<span style={{color: 'red'}}>Note : amount should be in <b>SAR</b> and greater than <b>100K</b></span>} 
                    rules={[{ required: true }]}
                    initialValue={0}
                  >
                    <InputNumber size="large" min={0} step={1} style={{width: '100%'}} />
                  </Form.Item>}
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col span={24}>
              {formData.Country !== "KSA" && formData.Amount < 100000 && <Alert
                message="WARNING!"
                description="As there is no financial impact, no need to submit an incident report."
                type="warning"
                showIcon
              />}
            </Col>
            
            <Col span={24}>
              {(formData.Country === "KSA" || formData.Amount >= 100000) && <Row gutter={25}>
                <Col md={24} lg={12}>
                  <Form.Item name="IncidentDate" label="Incident Date" rules={[{ required: true }]}>
                    <DatePicker size="large" format="MM/DD/YYYY" />
                  </Form.Item>
                </Col>
                <Col md={24} lg={12}>
                  <Form.Item name="DiscoveryDate" label="Discovery Date" rules={[{ required: true }]}>
                    <DatePicker size="large" format="MM/DD/YYYY" />
                  </Form.Item>
                </Col>
                <Col md={24} lg={12}>
                  <Form.Item name="RiskType" label="Risk Type" rules={[{ required: true }]}>
                    <Select placeholder="Select Country" size="large">
                      {riskType?.map((row, i) => <Select.Option key={i} value={row.Type}>{row.Name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={24} lg={12}>
                  <Form.Item name="IncidentType" label="Incident Type" rules={[{ required: true }]}>
                    <Select placeholder="Select Country" size="large">
                      {values?.map((row, i) => <Select.Option key={i} value={row.id}>{row.name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Divider />
                <Col span={24}>
                  <Form.Item name="Descriptions" label="Descriptions" rules={[{ required: true }]}>
                    <TextArea rows={6} placeholder='A detailed description of the incident' />
                  </Form.Item>
                </Col>
                <Divider />
                <div style={{margin: '10px auto'}}>
                  <SubmitCancel loaderState={loading} backTo="/incidents-center" />
                </div>
              </Row>}
            </Col>
          </Row>
        </Form>
      </FormPageTemplate>
    </>
  )
}

export default NewIncidentReport


var riskType = [
  {
      'Incident': [
          {
              id : 1,
              name : 'Employee Relations'
          },
          {
              id : 2,
              name : 'Any miss use of the assets safe'
          },
          {
              id : 3,
              name : 'Unsafe Enviroment'
          },
          {
              id : 4,
              name : 'Diversity & Discrimination'
          },
          {
              id : 5,
              name : 'Compensation'
          },
          {
              id : 6,
              name : 'Health & Safety'
          }
      ],
      'Name' : 'Employment Practices & workplace Safety',
      'Type' : '1'
  },
  {
      'Incident': [
          {
              id : 1,
              name : 'Improper business/market practices [Antitrust]'
          }
      ],
      'Name' : 'Business Practices',
      'Type' : '2'
  },{
      'Incident': [
          {
              id : 1,
              name : 'Disaster and other events'
          },
          {
              id : 2,
              name : 'Deep sea internet cable cut'
          },
          {
              id : 3,
              name : 'Operational failure at outsourced operations'
          },
          {
              id : 4,
              name : 'Building fire / Rain floods'
          }
      ],
      'Name' : 'Damage to Physical Assets',
      'Type' : '3'
  },{
      'Incident': [
          {
              id : 1,
              name : 'Hardware / Software / Telecommunication'
          },
          {
              id : 2,
              name : 'Integrity Of Data'
          },
          {
              id : 3,
              name : 'System Virus'
          },
          {
              id : 4,
              name : 'Utility disruption'
          }
      ],
      'Name' : 'Business disruption & system failures',
      'Type' : '4'
  },
  {
      'Incident': [
          {
              id : 1,
              name : 'Counter parties, venders, suppliers'
          },
          {
              id : 2,
              name : 'Delivery failure to external party'
          },
          {
              id : 3,
              name : 'Disagreement with external party'
          },
          {
              id : 4,
              name : 'Data entry errors'
          },
          {
              id : 5,
              name : 'Failed mandatory reporting'
          }
      ],
      'Name' : 'Execution Delivery & Process Management',
      'Type' : '5'
  }
];