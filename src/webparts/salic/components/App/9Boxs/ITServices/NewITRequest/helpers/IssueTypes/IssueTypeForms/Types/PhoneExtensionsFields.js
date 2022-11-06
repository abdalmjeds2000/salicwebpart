import React from "react";
import { Form, Input, Select } from "antd";

function PhoneExtensionsFields() {

  return (
    <>
      <Form.Item name="Scope" label="Scope" rules={[{ required: true, message: false }]}>
        <Select placeholder="Select Scope">
          <Select.Option value="Mobile Calls">Mobile Calls</Select.Option>
          <Select.Option value="International Calls">International Calls</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="Extensions" label="Extensions" rules={[{ required: true, message: false }]}>
        <Input placeholder="extensions" />
      </Form.Item>
    </>
  );
}

export default PhoneExtensionsFields;
