import React, { useContext, useState } from 'react';
import './PreviewRequest.css';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App'
import { Button, Col, Form, Radio, Row, Select, Space, Timeline, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FileJpgOutlined, FilePdfOutlined, FileWordOutlined, UploadOutlined } from '@ant-design/icons';
import Reply from './components/Reply/Reply';




function PreviewRequest() {
    const { defualt_route } = useContext(AppCtx);
    const navigate = useNavigate();

    const img = <img src="https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=" alt='' style={{width: '30px', borderRadius: '50%'}} />;


    const uploadProps = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
          if (file.status !== 'uploading') {
            console.log(file, fileList);
          }
        },
      };
      


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
                    <Timeline.Item dot={img}>
                        <Reply 
                            Title="RE: Code of Business Conduct" 
                            Description="Date: Sat, 2015-09-01" 
                            Content="* REQUEST HERE *"
                        />
                    </Timeline.Item>
                    
                    
                    <Timeline.Item dot={img}>
                        <Reply 
                            Title="Akmal Eldahdouh" 
                            Description="2015-09-01" 
                            Content="Create a services site network problems."
                        />
                    </Timeline.Item>
                    <Timeline.Item dot={img}>
                        <Reply 
                            Title="Akmal Eldahdouh" 
                            Description="2015-09-01" 
                            Content="Create a services site network problems."
                        />
                    </Timeline.Item>
                    <Timeline.Item dot={img}>
                        <Reply 
                            Title="Akmal Eldahdouh" 
                            Description="2015-09-01" 
                            Content="Create a services site network problems."
                        />
                    </Timeline.Item>
                    <Timeline.Item dot={img}>
                        <Reply 
                            Title="Akmal Eldahdouh" 
                            Description="2015-09-01" 
                            Content="Create a services site network problems."
                        />
                    </Timeline.Item>

                    <Timeline.Item dot={img}>
                        <Row gutter={[10, 10]}>
                            <Col span={24}><TextArea rows={4} placeholder="Add Reply" maxLength={500} /></Col>
                            <Col span={24}>
                                <Upload {...uploadProps}>
                                    <Button type='ghost' size='middle' icon={<UploadOutlined />}>Attach Files</Button>
                                </Upload>
                            </Col>
                            <Col span={24} style={{marginTop: '15px'}}><Button type='primary'>Add Feedback</Button></Col>
                        </Row>
                    </Timeline.Item>
                </Timeline>
            </div>

            <div className='properties'>
                <Form layout='vertical'>
                    <h1 className="title">Issue Category</h1>
                    <Radio.Group defaultValue="Hardware & Devices">
                        <Space direction="vertical">
                            <Radio value={1} checked>Hardware & Devices</Radio>
                            <Radio value={2}>Software & Applications</Radio>
                            <Radio value={3}>Access & Permissions</Radio>
                            <Radio value={4}>Security Incident</Radio>
                        </Space>
                    </Radio.Group>
                    <hr />
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

                    <hr />

                    <h1 className="title">Attached Files</h1>
                    <div style={{fontSize: '1.5rem', display: 'flex', gap: '5px'}}>
                        <FilePdfOutlined /><FileJpgOutlined /><FileWordOutlined />
                    </div>

                    <hr />
                    
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type="primary" size='small'>Update Request Information</Button>
                    </div>

                    <hr />

                    <div>
                        <h1 className="title">Assignee History</h1>
                    </div>

                    
                </Form>
            </div>
        </div>

        </div>
    </>
    )
}

export default PreviewRequest