import React, { useState } from 'react';
import { AutoComplete, Image, Form, Avatar } from 'antd';
import AutoCompleteUsers from './AutoCompleteUsers';

const OptionCard = ({ DisplayName, Email, JobTitle, Department }) => {
  return(
    <div style={{display: 'flex', gap: 10}}>
      <Avatar
        src={
          <Image
            width={25}
            src={`/sites/newsalic/_layouts/15/userphoto.aspx?size=S&username=${Email}`}
            preview={{src: `/sites/newsalic/_layouts/15/userphoto.aspx?size=L&username=${Email}`,}}
          />
        }
      />
      <div style={{lineHeight: 1.1}}>
        <span style={{fontSize: '0.9rem', display: 'block'}}><b>{DisplayName}</b></span>
        <span style={{fontSize: '0.75rem', display: 'block'}}>{Email}</span>
        <span style={{fontSize: '0.75rem', display: 'block'}}>{JobTitle} - {Department}</span>
      </div>
    </div>
  )
}

function DropdownSelectUser(props) {
  const [options, setOptions] = useState([]);

  const handleSearch = async (value) => {
    if(value.length >= 3) {
      const response = await AutoCompleteUsers(value);
      const values = response.data.Data.value;
      const selectOptions = values.map(value => ({
        value: value.mail, 
        label: (
          <OptionCard
            DisplayName={value.displayName}
            Email={value.mail}
            JobTitle={value.jobTitle} 
            Department={value.department}
          />
        )
      }));
      setOptions(selectOptions);
    }
  }

  return (
    <Form.Item name={props.name} style={{marginBottom: 0}} rules={[{ required: props.required, message: false }]}>
      <AutoComplete
        disabled={props.isDisabled}
        size='large'
        style={{ width: '100%' }}
        onSearch={handleSearch}
        placeholder={props.placeholder}
        options={options}
      />
    </Form.Item>
  )
}

export default DropdownSelectUser