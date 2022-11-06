import { DatePicker, Form, Radio, Select } from "antd";
import React, { useContext, useState } from "react";
import { AppCtx } from "../../../../../../../App";

function OracleFields() {
  const { oracle_form_data } = useContext(AppCtx);
  const [selectedModule, setSelectedModule] = useState("");

  let _data = oracle_form_data.filter((r) => r.Process === "Oracle");
  const moduels = new Set();
  var uniqueModuels = _data.filter((m) => {
    if (moduels.has(m.Module)) {
      return false;
    }
    moduels.add(m.Module);
    return true;
  });
  var rules = oracle_form_data.filter((r) => r.Module === selectedModule);

  return (
    <div style={{transition: '0.5s'}}>
      <Form.Item name="Environment" label="Environment" initialValue="1" rules={[{ required: true, message: false }]}>
        <Radio.Group value="1">
          <Radio value="1">Production</Radio>
          <Radio value="2">Staging</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="NewAccount" label="New Account" initialValue="1" rules={[{ required: true, message: false }]}>
        <Radio.Group value="1">
          <Radio value="1">Yes</Radio>
          <Radio value="2">No</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="TemporaryAccess" label="Temporary Access" rules={[{ required: true, message: false }]}>
        <DatePicker.RangePicker format="MM/DD/YYYY" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="Module" label="Module" rules={[{ required: true, message: false }]}>
        <Select
          value={selectedModule}
          onChange={(value) => setSelectedModule(value)}
          placeholder="Select the Module first"
        >
          {uniqueModuels.map((m) => (
            <Select.Option value={m.Module}>{m.Module}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="Rules" label="Roles" rules={[{ required: true, message: false }]}>
        <Select
          mode="tags"
          placeholder="Select the Module first"
          onChange={(v) => console.log(v)}
          options={rules.map((rule) => {
            return { value: rule.Rule, label: rule.Rule };
          })}
        />
      </Form.Item>
    </div>
  );
}

export default OracleFields;
