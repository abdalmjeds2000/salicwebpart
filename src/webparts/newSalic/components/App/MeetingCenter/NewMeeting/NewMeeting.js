import React, { useContext, useState } from 'react'
import './NewMeeting.css'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation'
import SimpleUserPanel from '../../Global/SimpleUserPanel/SimpleUserPanel'

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { NavLink } from 'react-router-dom';
import WorldBG from '../../../../assets/images/world.svg';
import { AppCtx } from '../../App';
import { Form, Input, DatePicker, Transfer, Select, Slider, Row, Col, Button } from 'antd';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




const mockData = Array.from({
  length: 5,
}).map((_, i) => ({
  key: i.toString(),
  title: `meeting room ${i + 1}`,
  description: `description of content${i + 1}`,
}));
const initialTargetKeys = mockData.filter((item) => Number(item.key) === 1).map((item) => item.key);


function NewMeeting() {

  const [editorState, setEditorState] = useState('');
  const [reminder, setReminder] = useState('None');
  const [reminderOther, setReminderOther] = useState(0);
  

  // Start Transfer
  const { user_data, notifications_count, mail_count } = useContext(AppCtx);
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };
  // End Transfer




  return (
    <>
      <HistoryNavigation>
        <NavLink to="/book-meeting-room">Meetings Center</NavLink>
        <p>Reserve Meeting Room</p>
      </HistoryNavigation>
      <div className='meetings-center-container'>
        <img src={WorldBG} className='img-bg' alt="world background" />

        <SimpleUserPanel
          userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
          userName={user_data.Data?.DisplayName}
          notificationsCount={notifications_count}
          mailCount={mail_count}
        />

        <div className='content'>
          <div className="header">
            <h1>Reserve Meeting Room</h1>
          </div>
          <div className='form'>
            
            


          <Form
            {...layout} 
            colon={false}
            labelWrap 
            name="business-gate" 
            onFinish={values => console.log(values)} /* validateMessages={validateMessages} */
            layout="horizontal"
          >
            
            <Form.Item name="Title" label="Title">
              <Input placeholder='Add a title for the meeting' size='large' />
            </Form.Item>
            <Form.Item name="Location" label="Location">
              <Input defaultValue="SALIC HQ - Business Gate" size='large' disabled />
            </Form.Item>

            <Form.Item name="Start and End Time" label="Start and End Time">
              <DatePicker.RangePicker showTime format="YYYY/MM/DD HH:mm" size='large' />
            </Form.Item>

            <Form.Item name="Rooms" label="Rooms">
              <Transfer
                dataSource={mockData}
                titles={['Source', 'Target']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
                render={(item) => item.title}
              />
            </Form.Item>


            <Form.Item name="Agenda" label="Agenda">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
              />
            </Form.Item>

            <Form.Item name="Attendees" label="Attendees">
              <Select
                showSearch
                size="large"
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                // onChange={v => console.log(v)}
                // onSearch={v => console.log(v)}
              >
                <Select.Option value="user1">user1</Select.Option>
                <Select.Option value="user2">user2</Select.Option>
                <Select.Option value="user3">user3</Select.Option>
              </Select>
            </Form.Item>


            <Form.Item name="Recurrance" label="Recurrance">
              <Select defaultValue="Never" onChange={selectedV => console.log(selectedV)} size="large">
                <Select.Option value="Never">Never</Select.Option>
                <Select.Option value="Daily">Daily</Select.Option>
                <Select.Option value="Weekly">Weekly</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item name="Reminder" label="Reminder">
              <Select defaultValue="None" onChange={selectedV => setReminder(selectedV)} size="large" >
                <Select.Option value="None">None</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
              {
                reminder === 'Other' && (
                  <>
                    <Slider
                      min={0}
                      max={30}
                      onChange={v => setReminderOther(v)}
                      value={typeof reminderOther === 'number' ? reminderOther : 0}
                    />
                    <p style={{color: '#a7a7a7'}}>{reminderOther} min</p>
                  </>
                )
              }
            </Form.Item>



            <Row gutter={10} justify="center">
              <Col>
                <Button type="primary" htmlType='submit'>
                  Submit
                </Button>
              </Col>
            </Row>

          </Form>

          </div>
        </div>
      </div>
    </>
  )
}

export default NewMeeting