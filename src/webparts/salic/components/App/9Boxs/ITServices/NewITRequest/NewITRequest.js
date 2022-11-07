import React, { useContext, useState } from "react";
<<<<<<< HEAD
import { Form, Input, Modal, Upload, Radio, Select, Space, Divider, message } from "antd";
=======
import {
  Form,
  Input,
  Modal,
  Upload,
  Radio,
  Select,
  Space,
  Divider,
  message,
} from "antd";
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
import { PlusOutlined } from "@ant-design/icons";
import FormPageTemplate from "../../components/FormPageTemplate/FormPage";
import HistoryNavigation from "../../../Global/HistoryNavigation/HistoryNavigation";
import SubmitCancel from "../../components/SubmitCancel/SubmitCancel";
import { useNavigate } from "react-router-dom";
import { AppCtx } from "../../../App";
import moment from "moment";
<<<<<<< HEAD
import { issuesTypes } from "./helpers/IssueTypes/it_json";
import IssueTypeForm from "./helpers/IssueTypes/IssueTypeForms/IssueTypeForms";


=======
import { issuesTypes } from "./helpers/IssueTypes/issuesTypesJSON";
import IssueTypeForm from "./helpers/IssueTypes/IssueTypeForms/IssueTypeForms";
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
const { Option } = Select;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function NewITRequest() {
  const { user_data, defualt_route } = useContext(AppCtx);
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const [btnLoader, setBtnLoader] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [categoryTypeField, setCategoryTypeField] = useState("Hardware");
  const [issueTypeField, setIssueTypeField] = useState("");

  let isFilesFinishUpload = true;
  const files = fileList
    .map((file) => {
      if (file.status === "uploading") isFilesFinishUpload = false;
      return file.response?.uploadedFiles[0]?.Name;
    })
    .join();

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
<<<<<<< HEAD
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
=======
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
      }

      // Final Form Data Object (this object will be send to server)
      const formData = { Email: user_data?.Data?.Mail, IQAMA: user_data?.Data?.Iqama || "", Id: user_data?.Data?.Id.toString(), Source: "WEB", FileNames: files, ...FormData, };
      delete formData["TemporaryAccess"];
      delete formData["USBAccessDates"];
<<<<<<< HEAD
      delete formData["StartEndDate"];
      delete formData["DateOfEmployee"];
=======
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
      
      // Result Submit ( After Submittion)
      message.success("The request has been sent successfully.");
      setFileList([]);
      form.resetFields();
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
        <a onClick={() => navigate(`${defualt_route}/it-services`)}>
          IT Service Center
        </a>
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
          {...layout}
          colon={false}
          form={form}
          labelWrap
          name="service-request"
          onFinish={CreateItServiceRequest}
          onFinishFailed={() =>
            message.error("Please, fill out the form correctly.")
          }
        >
          <Form.Item name="ReceivedDate" label="Date" rules={[{ required: true }]} initialValue={moment().format("MM-DD-YYYY hh:mm")} >
            <Input placeholder="Date" size="large" disabled />
          </Form.Item>
          <Form.Item name="onbehalf" label="On Behalf Of">
            <Select
              showSearch
              placeholder="employee name"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              size="large"
            >
              <Option value="name789@gmail.com">name 789</Option>
              <Option value="name456@gmail.com">name 456</Option>
              <Option value="name123@gmail.com">name 123</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Subject" label="Subject" rules={[{ required: true }]} >
            <Input placeholder="write breif subject" size="large" />
          </Form.Item>

          <Divider />

          <Form.Item name="CategoryType" label="Issue Category" initialValue="Hardware" >
<<<<<<< HEAD
            <Radio.Group value={categoryTypeField} onChange={({ target: { value } }) => setCategoryTypeField(value)} rules={[{ required: true }]} >
=======
            <Radio.Group
              value={categoryTypeField}
              onChange={({ target: { value } }) => setCategoryTypeField(value)}
              rules={[{ required: true }]}
            >
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
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
              <Option value="1">Normal</Option>
              <Option value="2">Critical</Option>
            </Select>
          </Form.Item>
          <Form.Item name="IssueType" label="Issue Type">
            <Select
              placeholder="Select Issue Type"
              size="large"
              value={issueTypeField}
              onChange={(value) => setIssueTypeField(value)}
            >
              {issuesTypes
                .filter((i) => i.Category === categoryTypeField)
                .map((option) => (
                  <Option value={option.Type}>{option.Type}</Option>
                ))}
              <Option value="Other">Other</Option>
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
            <Upload
              action="https://salicapi.com/api/uploader/up"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList?.length >= 15 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <Modal
<<<<<<< HEAD
              open={previewVisible}
=======
              visible={previewVisible}
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>

          <SubmitCancel loaderState={btnLoader} backTo="/it-services" />
        </Form>
      </FormPageTemplate>
    </>
  );
}

export default NewITRequest;
