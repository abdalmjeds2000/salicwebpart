import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Radio, Select, Space, Divider, message } from "antd";
import FormPageTemplate from "../../../components/FormPageTemplate/FormPage";
import HistoryNavigation from "../../../../Global/HistoryNavigation/HistoryNavigation";
import SubmitCancel from "../../../components/SubmitCancel/SubmitCancel";
import { useNavigate } from "react-router-dom";
import { AppCtx } from "../../../../App";
import moment from "moment";
import IssueTypeForm from "./helpers/IssueTypes/IssueTypeForms/IssueTypeForms";
import GetIssuesTypes from '../../API/GetIssuesTypes';
import DropdownSelectUser from '../../../../Global/DropdownSelectUser/DropdownSelectUser';
import AddItServiceRequest from '../../API/AddItServiceRequest';
import CustomAntUploader from '../../../../Global/CustomAntUploader/CustomAntUploader';


function NewITRequest() {
  const { user_data, defualt_route } = useContext(AppCtx);
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [issueTypes, setIssueTypes] = useState([]);
  const [categoryTypeField, setCategoryTypeField] = useState("Hardware");
  const [issueTypeField, setIssueTypeField] = useState("");

  // Get Issue Types from shrepoint
  const GetIssuesFromSP = async () => {
    const response = await GetIssuesTypes();
    return response;
  }
  // When open page Get Issue Types from shrepoint (Once)
  useEffect(() => {
    GetIssuesFromSP().then(res => setIssueTypes(res))
  }, []);

  // Get Files Nemes Uploaded & check if all files finish uploading
  let isFilesFinishUpload = true;
  const files = fileList.map((file) => {
    if (file.status === "uploading") isFilesFinishUpload = false;
    return file.response?.uploadedFiles[0]?.Name;
  }).join();
  


  // Submit It Service Form (call when no problem with what user input in fields)
  async function CreateItServiceRequest(FormData) {
    setBtnLoader(true);
    // Sub Forms Data (FormData prop => {})
    if (isFilesFinishUpload) {
      switch (issueTypeField) {
        case 'Oracle':
          const OracleFormDataProp = { Enviroment: FormData.Enviroment, NewAccount: FormData.NewAccount, Module: FormData.Module, Rules: FormData.Rules, AccessFrom: moment(FormData.TemporaryAccess[0]).format('MM/DD/YYYY'), AccessTo: moment(FormData.TemporaryAccess[1]).format('MM/DD/YYYY') };
          FormData.FormData = JSON.stringify(OracleFormDataProp);
          break;
        case 'DMS':
          const DMSFormDataProp = { PermissionType: FormData.PermissionType, MainFolder: FormData.MainFolder, };
          FormData.FormData = JSON.stringify(DMSFormDataProp);
          break;
        case 'Unlock USB':
          const USBFormDataProp = { USBAccessType: FormData.USBAccessType, USBAccessFrom: moment(FormData?.USBAccessDates[0]).format('MM/DD/YYYY'), USBAccessTo: moment(FormData?.USBAccessDates[1]).format('MM/DD/YYYY') };
          FormData.FormData = JSON.stringify(USBFormDataProp);
          break;
        case 'Software Subscription & Licenses':
          const SoftwareFormDataProp = { SoftwareName: FormData.SoftwareName };
          FormData.FormData = JSON.stringify(SoftwareFormDataProp);
          break;
        case 'Phone Extensions':
          const PhoneFormDataProp = { Extensions: FormData.Extensions, Scope: FormData.Scope };
          FormData.FormData = JSON.stringify(PhoneFormDataProp);
          break;
        case 'New Account':
          const NewAccountFormDataProp = { 
            FirstName: FormData.FirstName,
            LastName: FormData.LastName, 
            Company: FormData.Company, 
            JobTitle: FormData.JobTitle, 
            Nationality: FormData.Nationality, 
            departments: FormData.departments, 
            Mobile: FormData.Mobile, 
            Phone: FormData.Phone, 
            Manager: FormData.Manager, 
            DateOfEmployee: moment(FormData.DateOfEmployee).format('MM/DD/YYYY'), 
            Grade: FormData.Grade, 
            IQAMA: FormData.IQAMA, 
            NewUserStartDate: moment(FormData.StartEndDate[0]).format('MM/DD/YYYY'), 
            NewUserEndDate: moment(FormData.StartEndDate[1]).format('MM/DD/YYYY'), 
            WithLaptop: FormData.WithLaptop, 
            Gender: FormData.Gender
          };
          FormData.FormData = JSON.stringify(NewAccountFormDataProp);
          break;
        case 'Shared Email':
          const SharedEmailFormDataProp = { SenderName: FormData.SenderName, EmailAddress: FormData.EmailAddress, BusinessOwner: FormData.BusinessOwner, Members: FormData.Members.join() };
          FormData.FormData = JSON.stringify(SharedEmailFormDataProp);
          break;
        case 'GL Account':
          const GLAccountFormDataProp = { AccountCode: FormData.AccountCode, AccountDescription: FormData.AccountDescription, Summary: FormData.Summary, AllowPosting: FormData.AllowPosting, AllowBudgeting: FormData.AllowBudgeting, GLParentCode: FormData.GLParentCode, IntercompanyAccount: FormData.IntercompanyAccount, EliminationRequired: FormData.EliminationRequired, FinancialStatement: FormData.FinancialStatement, MappingUnderFSLI: FormData.MappingUnderFSLI, AccountType: FormData.AccountType };
          FormData.FormData = JSON.stringify(GLAccountFormDataProp);
          break;
      }
      // Final Form Data Object (this object will be send to server)
      const formData = { 
        Email: user_data?.Data?.Mail, 
        IQAMA: user_data?.Data?.Iqama || "", 
        Id: user_data?.Data?.Id.toString(), 
        Source: "WEB", 
        FileNames: files, 
        ...FormData, 
      };
      // Delete some unnecessary propraties after take need from them
      delete formData["TemporaryAccess"];
      delete formData["USBAccessDates"];
      delete formData["StartEndDate"];
      delete formData["DateOfEmployee"];
      
      const _response = await AddItServiceRequest(formData)
      console.log(_response);

      message.success("The request has been sent successfully.");
      navigate(defualt_route + '/services-requests/my-requests');
      // Reset form & attachments list
      form.resetFields();
      setFileList([]);
      setCategoryTypeField("");
      setIssueTypeField("");

      console.log(formData);
    } else {
      message.error("Wait for Uploading...");
    }
    setBtnLoader(false);
  }


  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/services-requests`)}>IT Service Center</a>
        <p>New Service Request</p>
      </HistoryNavigation>


      <FormPageTemplate
        pageTitle="Service Request"
        tipsList={[
          "Fill out required fields carefully.",
          "If Possile upload captured images for the problem.",
          "Be specific in describing the problem you are facing. Please do not write fussy words or incomplete statements.",
          "Be specific in choosing 'Issue Category' as the system will assign SR. to the appropriate team member.",
        ]}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 12 } }}
          colon={false}
          form={form}
          labelWrap
          name="service-request"
          onFinish={CreateItServiceRequest}
          onFinishFailed={() => message.error("Please, fill out the form correctly.") }
        >
          <Form.Item name="ReceivedDate" label="Date" rules={[{ required: true }]} initialValue={moment().format("MM-DD-YYYY hh:mm")} >
            <Input placeholder="Date" size="large" disabled />
          </Form.Item>
          <Form.Item label="On Behalf Of">
            <DropdownSelectUser name="onbehalf" placeholder="Select Employee" required={false} isDisabled={false} />
          </Form.Item>
          <Form.Item name="Subject" label="Subject" rules={[{ required: true }]} >
            <Input placeholder="write breif subject" size="large" />
          </Form.Item>

          <Divider />

          <Form.Item name="CategoryType" label="Issue Category" initialValue="Hardware" >
            <Radio.Group value={categoryTypeField} onChange={({ target: { value } }) => {setCategoryTypeField(value); setIssueTypeField("")}} rules={[{ required: true }]} >
              <Space direction="vertical">
                <Radio value="Hardware">
                  <span>Hardware & Devices</span> <br />
                  <p>Hardware problem such as laptop or screen broken</p>
                </Radio>
                <Radio value="Software">
                  <span>Software & Applications</span> <br />
                  <p>
                    Software issues such as Oracle, SharePoint, and Office 365
                    Suite
                  </p>
                </Radio>
                <Radio value="Access">
                  <span>Access, Permissions, and Licenses</span> <br />
                  <p>Access Issues such as Permissions to access a resource</p>
                </Radio>
                <Radio value="Security">
                  <span>Security Incident</span> <br />
                  <p>Security Incidents such as email fishing.</p>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="Priority" label="Priority" initialValue="1">
            <Select placeholder="Priority" size="large">
              <Select.Option value="1">Normal</Select.Option>
              <Select.Option value="2">Critical</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="IssueType" label="Issue Type">
            <Select
              placeholder="Select Issue Type"
              size="large"
              value={issueTypeField}
              onChange={(value) => setIssueTypeField(value)}
            >
              {issueTypes
                .filter((i) => i.Category === categoryTypeField)
                .map((option) => (
                  <Select.Option value={option.IssueType}>{option.IssueType}</Select.Option>
                ))}
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          {
            categoryTypeField === "Access" && issueTypeField !== "" &&
            <div style={{padding: '15px', borderRadius: '10px', backgroundColor: 'var(--third-color)'}}>
              <IssueTypeForm IssueType={issueTypeField} />
            </div>
          }

          <Divider />

          <Form.Item name="Description" label="Descriptions / Justifications" rules={[{ required: true }]} >
            <Input.TextArea rows={8} placeholder="write a brief description" />
          </Form.Item>
          <Form.Item label="Documents">
            <CustomAntUploader 
              fileList={fileList}
              GetFilesList={(files) => setFileList(files)}
            />
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} backTo="/services-requests" />
        </Form>
      </FormPageTemplate>
    </>
  );
}

export default NewITRequest;
