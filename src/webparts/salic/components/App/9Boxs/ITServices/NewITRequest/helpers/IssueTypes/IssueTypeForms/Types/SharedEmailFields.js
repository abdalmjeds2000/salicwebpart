import React from "react";
import { Form, Input, Select } from "antd";

function SharedEmailFields() {

  return (
    <>
      <Form.Item name="BusinessOwner" label="Business Owner" rules={[{ required: true, message: false }]}>
        <Select placeholder="Employee Name">
          <Select.Option value="emp1">emp1</Select.Option>
          <Select.Option value="emp2">emp2</Select.Option>
          <Select.Option value="emp3">emp3</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="SenderName" label="Email Name" rules={[{ required: true, message: false }]}>
        <Input placeholder="Sender Name" />
      </Form.Item>
      <Form.Item name="EmailAddress" label="Email Address" rules={[{ required: true, message: false }]}>
        <Input placeholder="email@salic.com" />
      </Form.Item>
      <Form.Item name="Members" label="Members" rules={[{ required: true, message: false }]}>
        <Select mode="tags" style={{width: '100%',}} placeholder="email@salic.com" />
      </Form.Item>
    </>
  );
}

export default SharedEmailFields;
