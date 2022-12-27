import React from "react";
import { Descriptions } from "antd";
import moment from "moment";


export function GetFormDataOracle({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} >
        <Descriptions.Item label="Enviroment">{formDate.Enviroment == 1 ? 'Production' : 'Staging' || ' - '}</Descriptions.Item>
        <Descriptions.Item label="New Access">{formDate.NewAccount == 1 ? 'Yes' : 'No' || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Access From">{formDate.AccessFrom || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Access To">{formDate.AccessTo  || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Module">{formDate.Module || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Roles">{formDate.Rules || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}


export function GetFormDataSharedEmail({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} >
        <Descriptions.Item label="Business Owner">{formDate.BusinessOwner || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Email Name">{formDate.SenderName || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Email Address">{formDate.EmailAddress || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Members">{formDate.Members ? formDate.Members.map(r => <> {r} <br/></>) : (formDate.Members || ' - ')}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}


export function GetFormDataUSB({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} >
        <Descriptions.Item label="Access Type">{formDate.USBAccessType == 1 ? 'Permenant' : 'Temporary' || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Access From">{formDate.USBAccessFrom || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Access To">{formDate.USBAccessTo || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}



export function GetFormDataDMS({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} >
        <Descriptions.Item label="Permission Type">{formDate.PermissionType || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Main Folder">{formDate.MainFolder || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}


export function GetFormDataPhone({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} >
        <Descriptions.Item label="Scope">{formDate.Scope || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Extensions">{formDate.Extensions || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}

export function GetFormDataSoftwareLic({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} >
        <Descriptions.Item label="Software Name">{formDate.SoftwareName || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}










export function GetFormDataNewAccount({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} >
        <Descriptions.Item label="First Name">{formDate.FirstName || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{formDate.LastName || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Company">{formDate.Company || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Job Title">{formDate.JobTitle || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Nationality">{formDate.Nationality || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Department">{formDate.departments || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Mobile #">{formDate.Mobile || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Phone #">{formDate.Phone || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Manager">{formDate.Manager || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Hire Date">{formDate.DateOfEmployee !== '' && formDate.DateOfEmployee !== '0' ? moment(formDate.DateOfEmployee, 'MM/DD/YYYY').format('MMM DD, YYYY') : ' - '}</Descriptions.Item>
        <Descriptions.Item label="Grade">{formDate.Grade || ' - '}</Descriptions.Item>
        <Descriptions.Item label="National ID\IQAMA">{formDate.IQAMA || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Start Date">{formDate.NewUserStartDate ? moment(formDate.NewUserStartDate, 'MM/DD/YYYY').format('MMM DD, YYYY') : ' - '}</Descriptions.Item>
        <Descriptions.Item label="End Data">{formDate.NewUserEndDate ? moment(formDate.NewUserEndDate, 'MM/DD/YYYY').format('MMM DD, YYYY') : ' - '}</Descriptions.Item>
        <Descriptions.Item label="With Laptop">{formDate.WithLaptop || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Gender">{formDate.Gender || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}








export function GetFormDataGLAccount({ request }) {
  const formDate = request.FormData;
  return (
    <>
      <Descriptions bordered title="" size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} >
        <Descriptions.Item label="Account Type">{formDate.GLAccountType || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Account Code">{formDate.AccountCode || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Account Description">{formDate.AccountDescription || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Summary">{formDate.Summary || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Allow Posting">{formDate.AllowPosting || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Allow Budgeting">{formDate.AllowBudgeting || ' - '}</Descriptions.Item>
        <Descriptions.Item label="GL Parent Code">{formDate.GLParentCode || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Intercompany Account">{formDate.IntercompanyAccount || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Elimination Required">{formDate.EliminationRequired || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Financial Statement">{formDate.FinancialStatement || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Mapping Under FSLI">{formDate.MappingUnderFSLI || ' - '}</Descriptions.Item>
        <Descriptions.Item label="Description">{request.Description || ' - '}</Descriptions.Item>
      </Descriptions>
    </>
  )
}