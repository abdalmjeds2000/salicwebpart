import React, { useContext } from "react";
import { Form, Select } from "antd";
import { AppCtx } from "../../../../../../../App";

function DMSFields() {
  const { oracle_form_data } = useContext(AppCtx);

  let _dmsFolders = oracle_form_data.filter((r) => r.Process === "DMS");
  const _dmsFoldersList = new Set();
  var uniqueDescription = _dmsFolders.filter((m) => {if (_dmsFoldersList.has(m.Description)) {return false;} _dmsFoldersList.add(m.Description); return true;});


  return (
    <div style={{transition: '0.5s'}}>
      <Form.Item name="PermissionType" label="Permission Type" initialValue="Full Control" rules={[{ required: true, message: false }]}>
        <Select>
          <Select.Option value="Full Control">Full Control</Select.Option>
          <Select.Option value="Edit">Edit</Select.Option>
          <Select.Option value="Read Only">Read Only</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="MainFolder" label="Main Folder" rules={[{ required: true, message: false }]}>
        <Select placeholder="Select Folder">
          {uniqueDescription.map(d => <Select.Option value={d.Description}>{d.Description}</Select.Option>)}
        </Select>
      </Form.Item>
    </div>
  );
}

export default DMSFields;
