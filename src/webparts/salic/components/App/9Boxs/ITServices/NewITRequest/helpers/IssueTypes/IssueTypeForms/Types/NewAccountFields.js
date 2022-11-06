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
            <Input placeholder="Enter Last Name" />
          </Form.Item>
        </Form.Item>

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
  );
}

export default NewAccountFields;
