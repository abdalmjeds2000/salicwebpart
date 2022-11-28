import React, { useContext, useState } from 'react'
import './NewMeeting.css'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';
import { Form, Input, DatePicker, Transfer, Select, Slider, Row, Col, Button } from 'antd';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
const groups = [
  { id: 1, title: 'Meeting Room1' },
  { id: 2, title: 'Meeting Room2' },
  { id: 3, title: 'Meeting Room3' },
  { id: 4, title: 'Meeting Room4' },
]
const items = [
  {
    id: 1,
    group: 4,
    title: '(Organizer : Latifah Alreshoodi ) (Status : busy) 10:00 - 11:00',
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
    selectedBgColor: 'var(--main-color)',
    bgColor : 'var(--second-color)',
  },
  {
    id: 2,
    group: 2,
    title: '(Organizer : Latifah Alreshoodi ) (Status : busy) 10:00 - 11:00',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
    selectedBgColor: 'var(--main-color)',
    bgColor : 'var(--second-color)',
  },
  {
    id: 1,
    group: 1,
    title: '(Organizer : Latifah Alreshoodi ) (Status : busy) 10:00 - 11:00',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
    selectedBgColor: 'var(--main-color)',
    bgColor : 'var(--second-color)',
  },
  {
    id: 4,
    group: 3,
    title: '(Organizer : Latifah Alreshoodi ) (Status : busy) 10:00 - 11:00',
    start_time: moment().add(3, 'hour'),
    end_time: moment().add(4.5, 'hour'),
    selectedBgColor: 'var(--main-color)',
    bgColor : 'var(--second-color)',
  },
  {
    id: 5,
    group: 4,
    title: '(Organizer : Latifah Alreshoodi ) (Status : busy) 10:00 - 11:00',
    start_time: moment().add(5, 'hour'),
    end_time: moment().add(6, 'hour'),
    selectedBgColor: 'var(--main-color)',
    bgColor : 'var(--second-color)',
  },
  {
    id: 6,
    group: 1,
    title: '(Organizer : Latifah Alreshoodi ) (Status : busy) 10:00 - 11:00',
    start_time: moment().add(6.5, 'hour'),
    end_time: moment().add(7, 'hour'),
    selectedBgColor: 'var(--main-color)',
    bgColor : 'var(--second-color)',
  },
  {
    id: 7,
    group: 2,
    title: '(Organizer : Latifah Alreshoodi ) (Status : busy) 10:00 - 11:00',
    start_time: moment().add(6.5, 'hour'),
    end_time: moment().add(7, 'hour'),
    selectedBgColor: 'var(--main-color)',
    bgColor : 'var(--second-color)',
  }
]
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
  const navigate = useNavigate();

  // Start Transfer
  const { defualt_route } = useContext(AppCtx);
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
        <a onClick={() => navigate(`${defualt_route}/book-meeting-room`)}>Meetings Center</a>
        <p>Reserve Meeting Room</p>
      </HistoryNavigation>
      <div className='table-page-container'>

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


              <Form.Item name="Rooms Availablity" label="Rooms Availablity">
                <Timeline
                  groups={groups}
                  items={items}
                  defaultTimeStart={moment().add(-12, 'hour')}
                  defaultTimeEnd={moment().add(12, 'hour')}
                  minZoom={60 * 60 * 1000}
                  maxZoom={(60 * 60 * 1000) * 12}
                  canChangeGroup={false}
                  sidebarWidth={60}
                  sidebarContent={'Room Name'}
                />
              </Form.Item>


              <Form.Item name="Agenda" label="Agenda">
                {/* <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'link', 'history']
                  }}
                /> */}
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