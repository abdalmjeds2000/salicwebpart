import React, { useContext, useEffect, useState } from 'react';
import './PreviewRequest.css';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../App'
import { Button, Col, Form, message, Radio, Row, Select, Space, Timeline, Upload, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FileJpgOutlined, FileOutlined, FilePdfOutlined, FileWordOutlined, UploadOutlined } from '@ant-design/icons';
import Reply from './components/Reply';
import Section from './components/Section';
import AssigneeRecord from './components/AssigneeRecord';
import GetContentRequest from '../API/GetContentRequest';
import UpdateContentRequest from '../API/UpdateContentRequest';
import AddNewReply from '../API/AddNewReply';


const layout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };




function PreviewRequest() {
    const { user_data, defualt_route } = useContext(AppCtx);
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const [form] = Form.useForm();

    const [newReplyText, setNewReplyText] = useState("");
    const [replys, setReplys] = useState([]);
    const [btnDisable, setBtnDisable] = useState(false);

    const img = <img src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${user_data?.Data?.Mail}`} alt='' />;
    

    const [requestData, setRequestData] = useState({});
    let { id } = useParams();


    async function GetRequest(id) {
        const response = await GetContentRequest(id);
        if(response) {
            console.log(response);
            document.title = `.:: SALIC Gate | ${response.Subject} ::.`;
            response.AttachmentsRows = JSON.parse(response.AttachmentsRows);
            setRequestData(response);
        } else {
            console.log("ERROR :: Get Content Request");
        }
    } 
    // Update Request
    // async function UpdateRequest(values, id) {
    //     const response = await UpdateContentRequest(values, id);
    //     if(response) {
    //         console.log('update response', response);
    //         setRequestData(prev => {
    //             prev.Subject = values.Subject;
    //             prev.Descriptions = values.Descriptions;
    //             return {...prev}
    //         });
    //         form.resetFields();
    //         message.success('Request has been Updated Successfully!')
    //     } else {
    //         console.log("ERROR :: Update Content Request");
    //         message.success('Error Update Request.')

    //     }
    // }

    useEffect(() => {
        if(id) {
            GetRequest(id)
            .then(() => {
                let elements = document.getElementsByClassName("ant-timeline-item-content");
                elements[0].style = "background-color: #ffecd3; margin: 0 0 0 40px; width: auto;"
                elements[elements.length-1].style = "margin: 0 0 0 40px; width: auto;"
            })
        } else {
            navigate(defualt_route + '/content-requests/new-request');
            message.info("Not Found Item")
        }
    }, [])





    async function AddReply() {
        let isFilesFinishUpload = true;
        const attachmentsList = fileList.map(file => {
            if(file.status === "uploading") isFilesFinishUpload = false
            return {
                fileName: file.name, 
                path: file.response?.uploadedFiles[0]?.Path
            }
        });
        if(newReplyText && isFilesFinishUpload) {
            setBtnDisable(true);
            const replyJSON = {
                'Title': `reply for ${requestData.Subject}.`,
                'RequestId': `${id};#${id}`,
                'Descriptions': newReplyText,
                'AttachmentsRows': JSON.stringify(attachmentsList),
            }
            const response = await AddNewReply(replyJSON)
            if(response.data) {
                setReplys(prev => [...prev, response.data]);
                console.log(replyJSON);
                message.success("Done!");
                setBtnDisable(false);
                setNewReplyText('');
            } else {
                message.error("Failed Add Reply!")
            }
        } else {
            message.error("Write Something and try again.")
        }
    }

    const onFinishFailed = () => { message.error("Please, fill out the form correctly.") }
    
    return (
    <>
        <HistoryNavigation>
            <a onClick={() => navigate(`${defualt_route}/content-requests`)}>Content Requests</a>
            <p>Preview Request</p>
        </HistoryNavigation>

        <div className='preview-request-container'>
            <div className="header">
                <h1>Request: {requestData?.Subject}</h1>
                <div>
                    <Button type="primary">Assign</Button>
                    <Button type="primary" danger>Close</Button>
                </div>
            </div>


            {
                Object.keys(requestData).length > 0 
                ?   <div className='content'>
                        <div className='timeline'>
                            <Timeline>
                                <Timeline.Item 
                                    dot={<img src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${requestData.Author.EMail}`} 
                                    title={requestData.Author.Title} />}
                                    alt=''
                                >
                                    <Reply 
                                        Title={`RE: ${requestData?.Subject}`}
                                        Description={`${requestData?.RequestType}, ${new Date(requestData?.Created).toLocaleString()}`} 
                                    >
                                        {requestData?.Descriptions}
                                    </Reply>
                                </Timeline.Item>
                                {
                                    replys?.map((reply, i) => {
                                        return (
                                            <Timeline.Item dot={img} key={i}>
                                                <Reply 
                                                    Title={reply.Title} 
                                                    Description={reply.Description} 
                                                >
                                                    {reply.Content}
                                                </Reply>
                                            </Timeline.Item>
                                        )
                                    })
                                }
                                <Timeline.Item dot={img}>
                                    <Row gutter={[10, 10]}>
                                        <Col span={24}>
                                            <TextArea rows={4} placeholder="Add Reply" maxLength={500} value={newReplyText} onChange={e => setNewReplyText(e.target.value)} />
                                        </Col>
                                        <Col span={24}>
                                            <Upload 
                                                action="https://salicapi.com/api/uploader/up"
                                                fileList={fileList}
                                                onChange={handleChange}
                                            >
                                                <Button type='ghost' size='middle' icon={<UploadOutlined />}>Attach Files</Button>
                                            </Upload>
                                        </Col>
                                        <Col span={24} style={{marginTop: '15px'}}>
                                            <Button type='primary' onClick={AddReply} disabled={btnDisable}>Add Feedback</Button>
                                        </Col>
                                    </Row>
                                </Timeline.Item>
                            </Timeline>
                        </div>



                        <div className='properties'>
                            {/* Update Request */}
                            {/* <Form
                                layout="vertical" 
                                colon={false}
                                labelWrap 
                                name="content-request" 
                                form={form} 
                                onFinish={(values) => UpdateRequest(values, id)}
                                onFinishFailed={onFinishFailed}
                                
                            >

                                <Section SectionTitle="New Subject">
                                    <Form.Item name='Subject' rules={[{required: true, message: "Please Update this Field"}]}>
                                        <Input defaultValue={requestData?.Subject} placeholder='Subject' size='large' />
                                    </Form.Item>
                                </Section>
                                
                                
                                <Section SectionTitle="New Descriptions">
                                    <Form.Item name="Descriptions" rules={[{required: true, message: "Please Update this Field"}]}>
                                        <Input.TextArea defaultValue={requestData?.Descriptions} rows={6} placeholder="write a brief description" />
                                    </Form.Item>
                                </Section>
                                

                                <Section>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                        <Button htmlType='submit' type="primary" size='middle'>Update Request Information</Button>
                                    </div>
                                </Section>
                            </Form> */}

                            <Section SectionTitle="Attached Files">
                                <div style={{fontSize: '2rem', display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                                    {
                                        requestData.AttachmentsRows.map((file,i) => {
                                            return (
                                                <FileOutlined
                                                    key={i} 
                                                    title={file.fileName} 
                                                    onClick={() => window.open(file.path, "_blank")} 
                                                />
                                            )
                                        })
                                    }
                                    {
                                        requestData.AttachmentsRows.length === 0
                                        ? <span style={{fontStyle: 'italic', color: '#aaa', fontSize: '1rem', lineHeight: 1}}>No Attachments</span>
                                        : null
                                    }

                                    {/* <FilePdfOutlined /><FileJpgOutlined /><FileWordOutlined /> */}
                                </div>
                            </Section>
                            <Section SectionTitle="Assignee History">
                                {/* <AssigneeRecord
                                    AssignFrom="Ibrahim Basfar"
                                    AssignTo="Alaa Abdeltawab"
                                    AssignDate="09/07/2022 03:47 PM"
                                />
                                <AssigneeRecord
                                    AssignFrom="Ibrahim Basfar"
                                    AssignTo="Akmal Eldahdouh"
                                    AssignDate="09/07/2022 03:47 PM"
                                /> */}
                            </Section>


                            
                            {/* <Form layout='vertical'>
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
                            </Form> */}
                        </div>
                    </div>
                : "Loading"
            }
            

        </div>
    </>
    )
}

export default PreviewRequest