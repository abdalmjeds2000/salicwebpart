import React, { useContext, useEffect, useState } from 'react';
import './PreviewRequest.css';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../App'
import { Button, Col, Form, message, Radio, Row, Select, Space, Timeline, Upload, Input, Steps, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FileJpgOutlined, FileOutlined, FilePdfOutlined, FileWordOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import Reply from './components/Reply';
import Section from './components/Section';
import AssigneeRecord from './components/AssigneeRecord';
import SenderImg from './components/SenderImg';
import GetContentRequest from '../API/GetContentRequest';
import UpdateContentRequest from '../API/UpdateContentRequest';
import GetContentRequestAssigneeHistory from '../API/GetContentRequestAssigneeHistory';
import AddNewReply from '../API/AddNewReply';
import GetReplys from '../API/GetReplys';
import FileIcon from './components/FileIcon';
import UpdateAssignee from '../API/UpdateAssignee';



function PreviewRequest() {
    const { user_data, defualt_route } = useContext(AppCtx);
    const navigate = useNavigate();

    const [fileList, setFileList] = useState([]);
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    
    const [newReplyText, setNewReplyText] = useState("");
    const [btnLoader, setBtnLoader] = useState(false);

    const [requestData, setRequestData] = useState({});
    const [replys, setReplys] = useState([]);
    const [assigneeHistoryData, setAssigneeHistoryData] = useState([]);
    
    let { id } = useParams();


    async function GetRequest(id) {
        const response = await GetContentRequest(id);        
        if(response) {
            document.title = `.:: SALIC Gate | ${response.Title} ::.`;
            response.AttachmentsRows = JSON.parse(response.AttachmentsRows);
            setRequestData(response);
        } else {
            console.log("ERROR :: Get Content Request");
        }
    } 
    async function GetAllReplys(id) {
        const response = await GetReplys(id);
        if(response) {
            setReplys(response);
        } else {
            console.log("ERROR :: Get All Replys", response);
        }
    }
    async function GetRequestAssigneeHistory(id) {
        const AssigneeHistory = await GetContentRequestAssigneeHistory(id);
        if(AssigneeHistory) {
            setAssigneeHistoryData(AssigneeHistory);
            console.log(AssigneeHistory);
        } else {
            console.log("ERROR :: Get Assignee History", AssigneeHistory);
        }
    }
    async function AddReply() {
        setBtnLoader(true);
        let isFilesFinishUpload = true;
        const attachmentsList = fileList.map(file => {
            if(file.status === "uploading") isFilesFinishUpload = false
            return {
                fileType: file.name.split(".")[file.name.split(".").length-1],
                fileName: file.name, 
                path: file.response?.uploadedFiles[0]?.Path
            }
        });
        if(newReplyText && isFilesFinishUpload) {
            const replyJSON = {
                'Title': `reply for ${requestData.Title}.`,
                'RequestIDId': id,
                'Descriptions': newReplyText,
                'AttachmentsRows': JSON.stringify(attachmentsList),
            }
            const response = await AddNewReply(replyJSON)
            if(response.data) {
                let res = response.data;
                res.Author = {
                    EMail: user_data.Data.Mail,
                    Title: user_data.Data.DisplayName
                }
                setReplys(prev => [...prev, res]);
                message.success("Done!");
                setNewReplyText('');
                setFileList([]);
            } else {
                message.error("Failed Add Reply!")
            }
        } else {
            message.error(!newReplyText ? "Write Something and try again." : "Wait for Uploading ...")
        }
        setBtnLoader(false);
    }
    async function AddAction(status) {
        setBtnLoader(true);
        const data = {Status: status}
        const response = await UpdateAssignee(data, assigneeHistoryData[0].Id)
        if(response) {
            message.success(`The request has been ${status}.`, 3)
            setRequestData(prev => { prev.Status = status; return {...prev} });
            setAssigneeHistoryData(prev => { prev[0].Status = status; return [{...prev[0]}] })
        } else {
            message.error("Failed Add Action!")
        }
        setBtnLoader(false);
    }
    useEffect(() => {
        if(id) {
            GetRequest(id)
            .then(() => {
                GetAllReplys(id);
                GetRequestAssigneeHistory(id);
            })
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


    return (
    <>
        <HistoryNavigation>
            <a onClick={() => navigate(`${defualt_route}/content-requests`)}>Content Requests</a>
            <p>Preview Request</p>
        </HistoryNavigation>

        
        <div className='preview-request-container'>
            <div className="header">
                <h1>Content Request: [#{requestData?.Id || '###'}]</h1>
                {
                    assigneeHistoryData[assigneeHistoryData.length-1]?.ToUser?.EMail === user_data.Data?.Mail
                    && requestData.Status === "Submitted"
                    ?   <div>
                            <Button onClick={() => AddAction("Approved")} type="primary" disabled={btnLoader}>Approve</Button>
                            <Button onClick={() => AddAction("Rejected")} type="primary" disabled={btnLoader} danger>Reject</Button>
                        </div>
                    :   null
                }
                
            </div>
        {
            Object.keys(requestData).length > 0
            ?   <div className='content'>
                    <div className='timeline'>
                        <Timeline>
                            <Timeline.Item dot={<SenderImg Email={requestData.Author.EMail} Name={requestData.Author.Title} />}>
                                <Reply 
                                    Title={`RE: ${requestData?.Title}`}
                                    Description={`${requestData?.RequestType}, ${new Date(requestData?.Created).toLocaleString()}`} 
                                >
                                    {requestData?.Descriptions}
                                </Reply>
                            </Timeline.Item>
                            {
                                replys?.map((reply, i) => {
                                    return (
                                        <Timeline.Item 
                                            key={i}
                                            dot={<SenderImg Email={reply.Author.EMail} Name={reply.Author.Title} />}
                                        >
                                            <Reply 
                                                Title={reply.Author?.Title} 
                                                Description={new Date(reply.Created).toLocaleString()}
                                                Files={JSON.parse(reply.AttachmentsRows)}
                                            >
                                                {reply.Descriptions}
                                            </Reply>
                                        </Timeline.Item>
                                    )
                                })
                            }
                            {
                                requestData.Status === "Submitted" && 
                                <Timeline.Item dot={<SenderImg Email={user_data.Data.Mail} Name={user_data.Data.DisplayName} />}>
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
                                            <Button type='primary' onClick={AddReply} disabled={btnLoader}>Add Feedback</Button>
                                        </Col>
                                    </Row>
                                </Timeline.Item>
                            }
                        </Timeline>
                    </div>

                    <div className='properties'>
                        <Section SectionTitle="Attached Files">
                            <div className='attachments-container'>
                                {
                                    requestData.AttachmentsRows.map((file,i) => {
                                        return (
                                            <FileIcon
                                                key={i} 
                                                FileType={file.fileType}
                                                FileName={file.fileName}
                                                FilePath={file.path}
                                                IconWidth='50px'
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
                            {
                                assigneeHistoryData.map((record, i) => {
                                    return (
                                        <AssigneeRecord
                                            key={i}
                                            RequesterEmail={requestData.Author?.EMail}
                                            RequesterName={requestData.Author?.Title}
                                            AssignTo={record.ToUser?.Title}
                                            AssignDate={new Date(record?.Created).toLocaleString()}
                                        />
                                    )
                                })
                            }
                        </Section>
                        <Section SectionTitle="Requset Status">
                            <Steps 
                                direction="vertical"
                                size="small" 
                                status={requestData.Status === "Submitted" ? "process" : requestData.Status === "Rejected" ? "error" : requestData.Status === "Approved" ? "finish" : "process"} 
                                current={requestData.Status === "Submitted" ? 1 : 2}
                            >
                                <Steps.Step title="Submitted" description="Your Request has been submitted." />
                                <Steps.Step title="In Progress" description="Your Request is now being reviewed." />
                                <Steps.Step 
                                    title={requestData.Status === "Submitted" ? "Approval or Rejection" : requestData.Status} 
                                    description={`Your Request has been ${requestData.Status}.`} />
                            </Steps>
                        </Section>
                    </div>
                </div>
            :   <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spin indicator={<LoadingOutlined spin />} />
                </div>
        }
        </div>
    </>
    )
}

export default PreviewRequest