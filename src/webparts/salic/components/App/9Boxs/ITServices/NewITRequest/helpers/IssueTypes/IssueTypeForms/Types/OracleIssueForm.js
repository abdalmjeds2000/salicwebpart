import { DatePicker, Form, Radio, Select } from 'antd'
import React, { useContext, useState } from 'react'
import { AppCtx } from '../../../../../../../App';

function OracleIssueForm() {
  const { oracle_form_data } = useContext(AppCtx);
  const [selectedModule, setSelectedModule] = useState("");

  let _data = oracle_form_data.filter(r=>r.Process === 'Oracle');
  const moduels = new Set();
  var uniqueModuels = _data.filter(m=> {
    if(moduels.has(m.Module)) {
      return false
    } 
    moduels.add(m.Module);
    return true
  });
  var rules = oracle_form_data.filter(r=> r.Module === selectedModule);
  console.log(_data)
  console.log(moduels)
  console.log(uniqueModuels)
  return (
    <>
      <Form.Item name="Environment" label="Environment" initialValue="1">
          <Radio.Group value="1">
            <Radio value="1">Production</Radio>
            <Radio value="2">Staging</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="NewAccount" label="New Account" initialValue="1">
          <Radio.Group value="1">
            <Radio value="1">Yes</Radio>
            <Radio value="2">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="TemporaryAccess" label="Temporary Access">
          <DatePicker.RangePicker format="MM-DD-YYYY" />
        </Form.Item>
        <Form.Item name="Module" label="Module">
          <Select value={selectedModule} onChange={value => setSelectedModule(value)}>
            {uniqueModuels.map(m => <Select.Option value={m.Module}>{m.Module}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item name="Rules" label="Roles">
          <Select placeholder="Select the Module first" size="large">
            {rules.map(rule => <Select.Option value={rule.Rule}>{rule.Rule}</Select.Option>)}
          </Select>
        </Form.Item>
    </>
  )
}

export default OracleIssueForm