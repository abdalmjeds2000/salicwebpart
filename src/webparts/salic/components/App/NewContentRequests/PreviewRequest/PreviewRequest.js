import React, { useContext, useEffect, useState } from 'react';
import './PreviewRequest.css';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../App'
import { Button, Col, Form, message, Radio, Row, Select, Space, Timeline, Upload, Input, Steps, Spin, Modal, Alert } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CaretRightOutlined, CheckOutlined, CloseOutlined, FileJpgOutlined, FileOutlined, FilePdfOutlined, FileWordOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
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
import { faRefresh } from '@fortawesome/free-solid-svg-icons';





function PreviewRequest() {
    let { id } = useParams();

    const { user_data, defualt_route } = useContext(AppCtx);
    const navigate = useNavigate();

    const [fileList, setFileList] = useState([]);
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    
    const [newReplyText, setNewReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [btnLoader, setBtnLoader] = useState(false);
    const [requestData, setRequestData] = useState({});
    const [replys, setReplys] = useState([]);
    const [assigneeHistoryData, setAssigneeHistoryData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [actionValue, setActionValue] = useState(false);
    const [actionNote, setActionNote] = useState('')

    // check if there files is uploading...
    let isFilesFinishUpload = true;
    const attachmentsList = fileList.map(file => {
        if(file.status === "uploading") isFilesFinishUpload = false
        return {
            fileType: file.name.split(".")[file.name.split(".").length-1],
            fileName: file.name, 
            path: file.response?.uploadedFiles[0]?.Path
        }
    });

    // Get Content Request by {id} and display it on preview
    async function GetRequest(id) {
        setBtnLoader(true);
        const response = await GetContentRequest(id);        
        if(response) {
            document.title = `.:: SALIC Gate | ${response.Title} ::.`;
            response.AttachmentsRows = JSON.parse(response.AttachmentsRows);
            setRequestData(prev => {return {...response}});
        } else {
            console.log("ERROR :: Get Content Request");
        }
        setBtnLoader(false);
    } 
    // Get All Replys for {id} request
    async function GetAllReplys(id) {
        const response = await GetReplys(id);
        if(response) {
            setReplys(response);
        } else {
            console.log("ERROR :: Get All Replys", response);
        }
    }
    // Get Assignee For Request of id === {id}
    async function GetRequestAssigneeHistory(id) {
        const AssigneeHistory = await GetContentRequestAssigneeHistory(id);
        if(AssigneeHistory) {
            setAssigneeHistoryData(AssigneeHistory);
            console.log(AssigneeHistory);
        } else {
            console.log("ERROR :: Get Assignee History", AssigneeHistory);
        }
    }
    // Add New Reply
    async function AddReply(ReplyText, IsResult, ResultStatus) {
        setBtnLoader(true);
        if(ReplyText && isFilesFinishUpload) {
            const replyJSON = {
                Title: `reply for item[${requestData.Title}].`,
                RequestIDId: id,
                Descriptions: ReplyText,
                AttachmentsRows: JSON.stringify(attachmentsList),
                IsResult: IsResult,
                ResultStatus: ResultStatus
            }
            const response = await AddNewReply(replyJSON)
            if(response.data) {
                let res = response.data;
                res.Author = {
                    EMail: user_data.Data.Mail,
                    Title: user_data.Data.DisplayName
                }
                setReplys(prev => [...prev, res]);
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
    // Add New Action (Approved or Rejected)
    async function AddAction(status) {
        setBtnLoader(true);
        if(isFilesFinishUpload) {
            const data = {Status: status, ActionDate: new Date()}
            const response = await UpdateAssignee(data, assigneeHistoryData[assigneeHistoryData.length-1].Id)
            if(response) {
                GetRequestAssigneeHistory(id);
                setAssigneeHistoryData(prev => { prev[prev.length-1].Status = status; return prev })
                AddReply(actionNote, true, status);
                message.success(`The request has been ${status}.`, 3)
                setOpenModal(false);
                // if(status === "Rejected" || assigneeHistoryData.length === 2) {
                //     setRequestData(prev => { prev.Status = status; return {...prev} });
                // }
            } else {
                message.error("Failed Add Action!")
            }
        } else {
            message.error("Wait for Uploading...")
        }
        setBtnLoader(false);
    }
    // Add Submit
    async function AddSubmit() {
        setBtnLoader(true);
        if(isFilesFinishUpload) {
            const data = {Status: "Approved"}
            const response = await UpdateAssignee(data, assigneeHistoryData[assigneeHistoryData.length-1].Id)
            if(response) {
                GetRequestAssigneeHistory(id);
                AddReply(actionNote);
                message.success(`Submitted Seccessfully`, 3);
                setOpenModal(false);
            } else {
                message.error("Failed Submit!")
            }
        } else {
            message.error("Wait for Uploading...")
        }
        setBtnLoader(false);
    }
    // Send Get's Requests
    useEffect(() => {
        if(id) {
            setLoading(true);
            GetRequest(id)
            .then(() => {
                GetRequestAssigneeHistory(id);
                GetAllReplys(id);
            })
            .then(() => setLoading(false));
        } else {
            navigate(defualt_route + '/content-requests/new-request');
            message.info("Not Found Item")
        }
    }, []);
    // Edit Some Style on replys
    useEffect(() => {
        if(!loading && assigneeHistoryData.length > 0) {
            let elements = document.getElementsByClassName("ant-timeline-item-content");
            elements[0].style = "background-color: #ffecd3; margin: 0 0 0 40px; width: auto;";
            if(requestData.Status === "Submitted") {
                elements[elements.length-1]?.style = "margin: 0 0 0 40px; width: auto;";
            }
        }
    }, [assigneeHistoryData])

    // Replys Uploader Component
    const ReplyUploader = (
        <Upload 
            action="https://salicapi.com/api/uploader/up"
            fileList={fileList}
            onChange={handleChange}
        >
            <Button type='ghost' size='middle' icon={<UploadOutlined />}>Attach Files</Button>
        </Upload>
    )

    // Action Modal Component
    const ActionModal = (action) => (
        <Modal
            title={action==="Approved" ? 'Write a note before Approve.' : action==="Rejected" ? 'Write Rejection Reason' : 'Submit Your Action'}
            visible={openModal}
            onCancel={() => setOpenModal(false)}
            okButtonProps={{ style: {display: 'none'}}}
        >
            <TextArea value={actionNote} onChange={e => setActionNote(e.target.value)} placeholder='write something' />
            <div style={{margin: '10px 0'}}>
                {ReplyUploader}
            </div>
            <Button type="primary" danger={action==="Rejected" && true} onClick={() => action !== "Submit" ? AddAction(action, true) : AddSubmit()} disabled={actionNote.length === 0 && true}>
                {action==="Approved" ? 'Approve Request' : action==="Rejected" ? 'Rejected Request' : 'Submit'}
            </Button>
        </Modal>
    )


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
                    assigneeHistoryData[assigneeHistoryData.length-1]?.Status === "Pending"
                    ?   (
                            assigneeHistoryData[assigneeHistoryData.length-1]?.ToUser?.EMail === user_data.Data?.Mail
                            && assigneeHistoryData[assigneeHistoryData.length-1]?.Action === "Approve"
                                ?   <div>
                                        <Button onClick={() => {setOpenModal(true); setActionValue("Approved")}} type="primary" disabled={btnLoader}>Approve</Button>
                                        <Button onClick={() => {setOpenModal(true); setActionValue("Rejected")}} type="primary" disabled={btnLoader} danger>Reject</Button>
                                        {ActionModal(actionValue)}
                                    </div>
                            : assigneeHistoryData[assigneeHistoryData.length-1]?.ToUser?.EMail === user_data.Data?.Mail
                                && assigneeHistoryData[assigneeHistoryData.length-1]?.Action === "Submit"
                                ?   <div>
                                        <Button onClick={() => setOpenModal(true)} type="primary" disabled={btnLoader}>Submit</Button>
                                        {ActionModal("Submit")}
                                    </div>
                            :   null
                        )
                    :   null
                }
                
            </div>
        {
            !loading
            ?   (
                    assigneeHistoryData?.length > 0
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
                                                        IsReason={reply.IsResult}
                                                        RequestStatus={reply.ResultStatus}
                                                    >
                                                        {reply.Descriptions}
                                                    </Reply>
                                                </Timeline.Item>
                                            )
                                        })
                                    }
                                    {
                                        requestData?.Status === "Submitted" && 
                                        <Timeline.Item dot={<SenderImg Email={user_data.Data.Mail} Name={user_data.Data.DisplayName} />}>
                                            <Row gutter={[10, 10]}>
                                                <Col span={24}>                            
                                                    <TextArea rows={4} placeholder="Add Reply" maxLength={500} value={newReplyText} onChange={e => setNewReplyText(e.target.value)} />
                                                </Col>
                                                <Col span={24}>
                                                    {!openModal ? ReplyUploader : null}
                                                </Col>
                                                <Col span={24} style={{marginTop: '15px'}}>
                                                    <Button type='primary' onClick={() => AddReply(newReplyText, false)} disabled={btnLoader}>Add Feedback</Button>
                                                </Col>
                                            </Row>
                                        </Timeline.Item>
                                    }
                                </Timeline>
                            </div>

                            <div className='properties'>
                                <Section SectionTitle="Request Type">
                                    <div>
                                        {requestData.RequestType}
                                    </div>
                                </Section>
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
                                <Section SectionTitle="Requset Status">
                                    <Steps 
                                        direction="vertical"
                                        size="small" 
                                        status={requestData.Status === "Rejected" ? "error" : "process"} 
                                        current={assigneeHistoryData[assigneeHistoryData.length-1].Status === "Pending" ? assigneeHistoryData.length : assigneeHistoryData.length+1}
                                    >
                                        {
                                            assigneeHistoryData.length === 0 
                                            ? <Steps.Step title="Submitting" description="Your request is being sent." />
                                            :  (
                                                    <>
                                                        <Steps.Step 
                                                            title="Submitted"
                                                            subTitle={`at ${new Date(requestData.Created).toLocaleString()}`}
                                                            // description="Request has been submitted." 
                                                        />
                                                        {assigneeHistoryData.map((row, i) => {
                                                            return <Steps.Step 
                                                                        key={i}
                                                                        title={<b><CaretRightOutlined />{row.ToUser?.Title}</b>} 
                                                                        subTitle={<>at {new Date(row.Created).toLocaleString()}</>}
                                                                        description={row.Action !== "Submit" ? (row.ActionDate ? <>{row.ToUser?.Title} <b>{row.Status}</b> this Request at {new Date(row.ActionDate).toLocaleString()}</> : "Request is now being Reviewed.") : null}
                                                                    />
                                                        })}
                                                        {
                                                            ["Approved", "Rejected"].includes(requestData?.Status) &&
                                                            <Steps.Step 
                                                                title={<b>{requestData.Status}</b>} 
                                                                // subTitle={`at ${new Date(assigneeHistoryData[assigneeHistoryData.length-1].ActionDate).toLocaleString()}`}
                                                                description={`Request #${id} has been ${requestData.Status}.`} 
                                                                progressDot={(dot, { status, index }) => (
                                                                    <span>{dot} {requestData.Status === "Approved" ? <CheckOutlined /> : <CloseOutlined />}</span>
                                                                )}
                                                            />
                                                        }
                                                    </>
                                                )
                                        }
                                    </Steps>
                                </Section>
                            </div>
                        </div>
                    :   <Alert
                            message="Your Request is being Submitted"
                            description="Please wait a few moments, then try again."
                            type="info"
                            showIcon
                            action={<Button size="small" type="primary" disabled={btnLoader} onClick={() => navigate(defualt_route+'/content-requests')}>Close</Button>}
                        />
                )
            :   <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spin indicator={<LoadingOutlined spin />} />
                </div>
        }
        </div>
    </>
    )
}

export default PreviewRequest