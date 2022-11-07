<<<<<<< HEAD
import React, { useContext } from "react";
import { DatePicker, Form, Input, Radio, Select, Space } from "antd";
import { NationaltiesOptions } from "../../../../../../../Global/NationaltiesOptions/NationaltiesOptions";
import { AppCtx } from "../../../../../../../App";

function NewAccountFields() {
  const { salic_departments } = useContext(AppCtx);

  return (
    <div className="new-account-fields-container">
      <Form.Item name="AccountType" label="Account Type" rules={[{ required: true, message: '' }]}>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="AccountType">Email Account</Radio>
            <Radio value="AccountType">Employee Account (Active Directory)</Radio>
            <Radio value="AccountType">Contractor</Radio>
            <Radio value="AccountType">Consultant</Radio>
            <Radio value="AccountType">Trainee</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Account Information" rules={[{ required: true, message: '' }]}>
        <Form.Item rules={[{ required: true }]}>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)'}}>First Name</span>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px'}}>Last Name</span>
          <Form.Item name="FirstName" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)' }} >
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item name="LastName" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px' }} >
=======
import React from "react";
import { Form, Input, Select } from "antd";
import NationaltiesOptions from "../../../../../../../Global/NationaltiesOptions/NationaltiesOptions";

function NewAccountFields() {

  return (
    <>
      <Form.Item label="Account Information" rules={[{ required: true, message: false }]}>

        <Form.Item label="Name">
          <Form.Item name="FirstName" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} >
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item name="LastName" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }} >
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
            <Input placeholder="Enter Last Name" />
          </Form.Item>
        </Form.Item>

<<<<<<< HEAD
        <span>Company</span>
        <Form.Item name="Company" rules={[{ required: true, message: '' }]} >
          <Input placeholder="Write Here" />
        </Form.Item>
        
        <span>Job Title</span>
        <Form.Item name="JobTitle" rules={[{ required: true, message: '' }]} >
          <Input placeholder="Write Here" />
        </Form.Item>


        <Form.Item rules={[{ required: true }]}>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)'}}>Nationality</span>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px'}}>Department</span>
          <Form.Item name="Nationality" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)' }} >
            <Select placeholder="Select Country">
              {NationaltiesOptions.map(n => <Select.Option value={n.value}>{n.label}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="departments" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px' }} >
            <Select placeholder="Select Department">
              {salic_departments?.map(dep => <Select.Option value={dep}>{dep}</Select.Option>)}
            </Select>
          </Form.Item>
        </Form.Item>

        <span>Mobile #</span>
        <Form.Item name="Mobile" rules={[{ required: true, message: '' }]} >
          <Input placeholder="Write Here" />
        </Form.Item>

        <span>Phone #</span>
        <Form.Item name="Phone" rules={[{ required: true, message: '' }]} >
          <Input placeholder="Write Here" />
        </Form.Item>


        <Form.Item rules={[{ required: true }]}>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)'}}>Manager</span>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px'}}>Hire Date</span>
          <Form.Item name="Manager" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)' }} >
            <Select placeholder="Select Manager">
              {NationaltiesOptions.map(n => <Select.Option value={n.value}>{n.label}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="DateOfEmployee" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px' }} >
            <DatePicker format="MM/DD/YYYY" style={{ width: "100%" }} />
          </Form.Item>
        </Form.Item>

        <Form.Item rules={[{ required: true }]}>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)'}}>Grade</span>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px'}}>National ID\IQAMA</span>
          <Form.Item name="Grade" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)' }} >
            <Select placeholder="Select Grade">
              <Select.Option value="None">None</Select.Option>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="D">D</Select.Option>
              <Select.Option value="E">E</Select.Option>
              <Select.Option value="F">F</Select.Option>
              <Select.Option value="G">G</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="IQAMA" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px' }} >
            <Input placeholder="Write Here" />
          </Form.Item>  
        </Form.Item>

        <span>Start & End Date</span>
        <Form.Item name="StartEndDate" rules={[{ required: true, message: false }]}>
          <DatePicker.RangePicker format="MM/DD/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item rules={[{ required: true }]}>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)'}}>With Laptop</span>
          <span style={{display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px'}}>Gender</span>
          <Form.Item name="WithLaptop" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)' }} >
            <Select placeholder="With Laptop ?">
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="Gender" rules={[{ required: true, message: '' }]} style={{ display: 'inline-block', width: 'calc(50% - 5px)', margin: '0 0 0 10px' }} >
            <Select placeholder="Select Gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>  
        </Form.Item>

        
      </Form.Item>
    </div>
=======
        <Form.Item name="Company" label="Company" rules={[{ required: true }]} >
          <Input placeholder="write here" />
        </Form.Item>
        
        <Form.Item name="JobTitle" label="Job Title" rules={[{ required: true }]} >
          <Input placeholder="write here" />
        </Form.Item>

        <Form.Item name="Nationality" label="Nationality" rules={[{ required: true }]} >
          <Select placeholder="select country">
            <NationaltiesOptions />
          </Select>
        </Form.Item>

        <Form.Item name="departments" label="Department" rules={[{ required: true }]} >
          <Select placeholder="select department">
            <NationaltiesOptions />
          </Select>
        </Form.Item>

        <Form.Item name="Mobile" label="Mobile #" rules={[{ required: true }]} >
          <Input placeholder="write here" />
        </Form.Item>

        <Form.Item name="Phone" label="Phone #" rules={[{ required: true }]} >
          <Input placeholder="write here" />
        </Form.Item>
      </Form.Item>
    </>
>>>>>>> fc6a8efb549689c4138b26a601ce182f0d2dc8e3
  );
}

export default NewAccountFields;
