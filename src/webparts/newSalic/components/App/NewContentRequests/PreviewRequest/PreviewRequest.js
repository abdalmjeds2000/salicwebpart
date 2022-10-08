import React, { useContext, useEffect, useState } from 'react';
import './PreviewRequest.css';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App'
import { Button, Col, Form, message, Radio, Row, Select, Space, Timeline, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FileJpgOutlined, FilePdfOutlined, FileWordOutlined, UploadOutlined } from '@ant-design/icons';
import Reply from './components/Reply';
import Section from './components/Section';
import AssigneeRecord from './components/AssigneeRecord';




function PreviewRequest() {
    const { user_data, defualt_route } = useContext(AppCtx);
    const navigate = useNavigate();
    const [newReplyText, setNewReplyText] = useState("");
    const [replys, setReplys] = useState([
        {
            Title: "RE: Code of Business Conduct", 
            Description: "Date: Sat, 2015-09-01",
            Content: "* REQUEST HERE *",
        },{
            Title: "Akmal Eldahdouh", 
            Description: "25/08/2022", 
            Content: " Create a services App services site antd layouts site.",
        },{
            Title: "Akmal Eldahdouh", 
            Description: "25/08/2022", 
            Content: "App services site antd layouts site.",
        },{
            Title: "Akmal Eldahdouh", 
            Description: "25/08/2022", 
            Content: "Remining.",
        },{
            Title: "Akmal Eldahdouh", 
            Description: "25/08/2022", 
            Content: "Just a Remining.",
        }
    ])
    const img = <img src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${user_data?.Data?.Mail}`} alt='' />;
    const uploadProps = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
    };
    
    useEffect(() => {
        let elements = document.getElementsByClassName("ant-timeline-item-content");
        console.log(elements);
        elements[0].style = "background-color: #ffecd3; margin: 0 0 0 40px; width: auto;"
        elements[elements.length-1].style = "margin: 0 0 0 40px; width: auto;"
    }, [])


    const validationReply = () => {
        if(newReplyText) {
            const replyJSON = {
                SenderId: user_data?.Data?.Id,
                Title: user_data?.Data?.DisplayName, 
                Description: new Date().toLocaleDateString(), 
                Content: newReplyText,
                Files: "",
            }
            setReplys(prev => [...prev, replyJSON])
            console.log(replyJSON);
            message.success("Done.")
        } else {
            message.error("Write Something and try again.")
        }
    }

    
    return (
    <>
        <HistoryNavigation>
            <a onClick={() => navigate(`${defualt_route}/content-requests`)}>Content Requests</a>
            <p>Preview Request</p>
        </HistoryNavigation>

        <div className='preview-request-container'>
            <div className="header">
                <h1>Request #b12f5d3</h1>
                <div>
                    <Button type="primary">Assign</Button>
                    <Button type="primary" danger>Close</Button>
                </div>
            </div>

            <div className='content'>
                <div className='timeline'>
                    
                    <Timeline>
                        {
                            replys?.map((reply, i) => {
                                return (
                                    <Timeline.Item dot={img} key={i}>
                                        <Reply 
                                            Title={reply.Title} 
                                            Description={reply.Description} 
                                            Content={reply.Content}
                                        />
                                    </Timeline.Item>
                                )
                            })
                        }
                        <Timeline.Item dot={img}>
                            <Row gutter={[10, 10]}>
                                <Col span={24}>
                                    <TextArea rows={4} placeholder="Add Reply" maxLength={500} onChange={e => setNewReplyText(e.target.value)} />
                                </Col>
                                <Col span={24}>
                                    <Upload {...uploadProps}>
                                        <Button type='ghost' size='middle' icon={<UploadOutlined />}>Attach Files</Button>
                                    </Upload>
                                </Col>
                                <Col span={24} style={{marginTop: '15px'}}>
                                    <Button type='primary' onClick={validationReply}>Add Feedback</Button>
                                </Col>
                            </Row>
                        </Timeline.Item>
                    </Timeline>

                </div>






                <div className='properties'>
                    <Form layout='vertical'>
                        <Section SectionTitle="Issue Category">
                            <Radio.Group defaultValue="Hardware & Devices">
                                <Space direction="vertical">
                                    <Radio value={1} checked>Hardware & Devices</Radio>
                                    <Radio value={2}>Software & Applications</Radio>
                                    <Radio value={3}>Access & Permissions</Radio>
                                    <Radio value={4}>Security Incident</Radio>
                                </Space>
                            </Radio.Group>
                        </Section>
                        
                        <Section>
                            <Form.Item label="Issue Type">
                                <Select style={{width: '100%'}} defaultValue="Oracle">
                                    <Select.Option key={1}>Oracle</Select.Option>
                                    <Select.Option key={2}>Oracle 2</Select.Option>
                                    <Select.Option key={3}>Oracle 3</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Priority">
                                <Select style={{width: '100%'}} defaultValue="Normal">
                                    <Select.Option key={1}>Normal</Select.Option>
                                    <Select.Option key={2}>Important</Select.Option>
                                </Select>
                            </Form.Item>
                        </Section>

                        <Section SectionTitle="Attached Files">
                            <div style={{fontSize: '1.5rem', display: 'flex', gap: '5px'}}>
                                <FilePdfOutlined /><FileJpgOutlined /><FileWordOutlined />
                            </div>
                        </Section>

                        <Section>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                <Button type="primary" size='small'>Update Request Information</Button>
                            </div>
                        </Section>

                        <Section SectionTitle="Assignee History">
                            <AssigneeRecord
                                AssignFrom="Ibrahim Basfar"
                                AssignTo="Alaa Abdeltawab"
                                AssignDate="09/07/2022 03:47 PM"
                            />
                            <AssigneeRecord
                                AssignFrom="Ibrahim Basfar"
                                AssignTo="Akmal Eldahdouh"
                                AssignDate="09/07/2022 03:47 PM"
                            />
                        </Section>
                    </Form>
                </div>
            </div>

        </div>
    </>
    )
}

export default PreviewRequest