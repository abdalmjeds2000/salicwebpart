import { CaretRightOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Space, Steps, Timeline, Typography, Upload } from 'antd';
import React, { useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../../../App';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import Reply from '../../../../Global/RequestsComponents/Reply';
import SenderImg from '../../../../Global/RequestsComponents/SenderImg';
import GetITRequest from '../../API/GetITRequest';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import AddITReply from '../../API/AddITReply';
import Section from '../../../../Global/RequestsComponents/Section';
import FileIcon from '../../../../Global/RequestsComponents/FileIcon';
import UpdateRequestForm from './helpers/UpdateRequestForm';
import AssignAction from './helpers/AssignAction';
import CloseAction from './helpers/CloseAction';
import ApproveAction from './helpers/ApproveAction';
import DeleteAction from './helpers/DeleteAction';
import ReOpenAction from './helpers/ReOpenAction';
import AntdLoader from '../../../../Global/AntdLoader/AntdLoader';
import ToggleButton from '../../../../Global/ToggleButton';
import { CgMoreO } from 'react-icons/cg';
import { GetFormDataOracle, GetFormDataSharedEmail, GetFormDataUSB, GetFormDataDMS, GetFormDataPhone, GetFormDataSoftwareLic, GetFormDataNewAccount, GetFormDataGLAccount } from './helpers/RequestTabels'

const { Title, Text } = Typography;
function isEmpty(obj) {
  for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
      }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}



function PreviewITServiceRequest() {
  let { id } = useParams();
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [btnLoader, setBtnLoader] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [requestData, setRequestData] = React.useState({});
  const [replyText, setReplyText] = React.useState("");
  const [fileList, setFileList] = React.useState([]);
  

  // Get Content Request by {id} and display it on preview
  async function GetRequest() {
    setBtnLoader(true);
    const response = await GetITRequest(user_data.Data?.Mail, id);
    if(response.data.Status === 200) {
      const resData = response.data.Data;
      document.title = `.:: SALIC Gate | ${resData.Subject} ::.`;
      setRequestData(resData);
      console.log('btnLoader =>>', btnLoader)
      console.log('requestData =>>', resData)
      console.log('loading =>>', loading)
    } else {
      console.log("ERROR :: Get IT Service Request");
    }
    setBtnLoader(false);
  } 
  
  React.useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      if(id) {
        setLoading(true);
        GetRequest()
        .then(() => setLoading(false))
        .then(() => console.log("NNNNOOOOOWWWWW"))
        .then(() => correctImgs())
      } else {
        navigate(defualt_route + '/services-requests/services-request');
        message.info("Error ::: Not Found Request")
      }
    }
  }, [user_data]);

  // Add New Reply
  async function AddReply() {
    // check if there files is uploading...
    let isFilesFinishUpload = true;
    const attachmentsList = fileList.map(file => {
      if(file.status === "uploading") isFilesFinishUpload = false
      return file.response?.uploadedFiles[0]?.Name
    });
    setBtnLoader(true);
    if(replyText && isFilesFinishUpload) {
      const replyJSON = {
        Email: user_data.Data.Mail,
        Files: attachmentsList.join(),
        PendingWithRequester: "0",
        reply_body: replyText,
        ServiceRequestId: id,
      }
      const response = await AddITReply(replyJSON)
      if(response) {
        setReplyText('');
        setFileList([]);
        GetRequest();
      } else {
        message.error("Failed Add Reply!")
      }
    }
    setBtnLoader(false);
}

  var requester = requestData.Requester;
  var onbehalf = requestData.OnBehalfOf;
  if (onbehalf != null){ requester = onbehalf; }


  // Get Current Assignee for current user
  let pendingApprove = null;
  if(Object.keys(user_data).length > 0 && Object.keys(requestData).length > 0) {
    requestData?.referingHistory?.forEach(row => {
      if(row?.Action == "APPROVE" && row?.Response == "PENDING" && row?.ToUser?.Mail?.toLowerCase() === user_data.Data?.Mail?.toLowerCase()) {
        pendingApprove = row;
      }
    })
    // showApproveBtn = requestData?.referingHistory[requestData?.referingHistory?.length-1]?.ToUser?.Mail?.toLowerCase() === user_data.Data?.Mail?.toLowerCase()
  }

  // check if current user is requester or not
  let IfRequester = requester?.Mail?.toLowerCase() === user_data.Data?.Mail?.toLowerCase();
  // check if request pending with current loggin user or not
  let IsPendingWith = requestData.PendingWith?.Mail?.toLowerCase() === user_data.Data?.Mail?.toLowerCase();
  // check if current loggin user exist in EmployeesList or not
  // const IsITMember = requestData?.EmployeeList?.findIndex(e => e.Mail == user_data?.Data?.Mail);

  const correctImgs = () => {
    let imgs = document.getElementsByTagName("img");
    for (const element of imgs) {
      if(element.src.startsWith("cid")) {
        let name = element.src.split('@')[0].replace('cid:','');
        var deleteImg = document.querySelector('[title="'+name+'"]');
        let src = deleteImg.getAttribute("data-guid");
        deleteImg.style.display = "none";
        element.setAttribute('src', src)
      }
    }
  }


  // Toggle Properties Section (show and hide in mobile size)
  const propertiesSectionRef = useRef();
  const handleShowDetails = (v) => {
    propertiesSectionRef.current.style.display = 
    propertiesSectionRef.current.style.display === "block" ? "none" : "block";
  }


  let disableAssignClose = false;
  if(!requestData?.Category || requestData?.Category === "" || !requestData?.IssueType || requestData?.IssueType === "") {
    disableAssignClose = true;
  }
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/services-requests`)}>IT Service Center</a>
        <p>Preview IT Service Request</p>
      </HistoryNavigation>
      
      <div className='preview-request-container'>
        <div className="header">
          <h1>IT Service Request: [#{requestData?.Id || '###'}]</h1>
          {Object.keys(requestData).length > 0 && <div>
            {pendingApprove !== null &&
            <ApproveAction ActionId={pendingApprove.Id} handelAfterAction={GetRequest} />}
            {!["CLOSED", "Waiting For Approval"].includes(requestData?.Status) &&
            <AssignAction 
              EmployeesList={requestData.EmployeeList} 
              RequestId={requestData.Id} 
              handelAfterAction={GetRequest} 
              isDisable={disableAssignClose} 
              disableMessage={disableAssignClose ? "Please Update Ticket Information" : null}
            />}
            {!["CLOSED", "Waiting For Approval"].includes(requestData?.Status) &&
            <CloseAction 
              RequestId={requestData.Id} 
              handelAfterAction={GetRequest} 
              isDisable={disableAssignClose} 
              disableMessage={disableAssignClose ? "Please Update Ticket Information" : null}
            />}
            {user_data.Data?.Mail === 'abdulmohsen.alaiban@salic.com' &&
            <DeleteAction RequestId={requestData.Id} handelAfterAction={GetRequest} />}
            {requestData.Status === "CLOSED" && IfRequester &&
            <ReOpenAction RequestId={requestData.Id} handelAfterAction={GetRequest} />}

            <span className='properties-toggle-btn'>
              <ToggleButton 
                icon={<CgMoreO />}
                title="more information"
                callback={handleShowDetails}
              />
            </span>
          </div>}
        </div>

        <div className='content'>
          {
            !loading
            ? (
              <>
                <div className='timeline'>
                  <Timeline>
                    <div className="request-reply">
                      <Timeline.Item dot={<SenderImg Email={requester?.Mail} Name={requester?.DisplayName} />}>
                        <Reply
                          Title={<>RE: {requestData?.Subject}</>}
                          Description={<>{requestData.Requester.DisplayName} {requestData.OnBehalfOf && <><Typography.Text type="danger" strong>on behalf of</Typography.Text> {requestData.OnBehalfOf?.DisplayName}</>} @ {moment(requestData?.CreatedAt).format('MM/DD/YYYY hh:mm:ss')}</>} 
                        >

                          {
                            requestData.FormData != null && !isEmpty(requestData.FormData)
                            ? (
                              requestData.IssueType === "Oracle"
                                ? <GetFormDataOracle request={requestData} />
                              : requestData.IssueType === "Unlock USB"
                                ? <GetFormDataUSB request={requestData} />
                              : requestData.IssueType === "DMS"
                                ? <GetFormDataDMS request={requestData} />
                              : requestData.IssueType === "Phone Extensions"
                                ? <GetFormDataPhone request={requestData} />
                              : requestData.IssueType === "New Account"
                                ? <GetFormDataNewAccount request={requestData} />
                              : requestData.IssueType === "GL Account"
                                ? <GetFormDataGLAccount request={requestData} />
                              : requestData.IssueType === "Shared Email"
                                ? <GetFormDataSharedEmail request={requestData} />
                              : requestData.IssueType === "Software Subscription & Licenses"
                                ? <GetFormDataSoftwareLic request={requestData} />
                              : null
                            ) : (
                              <div dangerouslySetInnerHTML={{__html: requestData?.Description}}></div>
                            )
                          }
                          
                        </Reply>
                      </Timeline.Item>
                    </div>
                    {
                      requestData.Conversation?.map((reply, i) => {
                        let files = JSON.parse(reply.Body).Attachment;
                        let Attachments = [];
                        if(typeof files != 'undefined' && Object.keys(files).length != 0) {
                          files?.forEach(file => {
                            Attachments.push({
                              fileType: file.File.split(".")[file.File.split(".").length-1],
                              fileName: file.OriginalFile,
                              path: `https://salicapi.com/File/${file.File}`
                            })
                          })
                        }
                        return (
                          <div className={(reply.CreatedBy?.Mail === user_data.Data?.Mail) ? "my-reply" : ""}>
                            <Timeline.Item key={i} dot={<SenderImg Email={reply.CreatedBy?.Mail} Name={reply.CreatedBy?.DisplayName} />}>
                              <Reply 
                                Title={reply.CreatedBy?.DisplayName} 
                                Description={new Date(reply.CreatedAt).toLocaleString()}
                                Files={Attachments}
                              >
                                <div dangerouslySetInnerHTML={{__html: JSON.parse(reply.Body).Body}}></div>
                              </Reply>
                            </Timeline.Item>
                          </div>
                        )
                      })
                    }
                    {
                      requestData.Status === "CLOSED" && requestData.CloseReason && 
                      <div className="close-reply">
                        <Timeline.Item dot={<SenderImg Email={requestData.ClosedBy?.Mail} Name={requestData.ClosedBy?.DisplayName} />}>
                          <Reply
                            Title={requestData.ClosedBy?.DisplayName}
                            Description={moment(requestData?.UpdatedAt).format('MM/DD/YYYY hh:mm:ss')} 
                            Files={
                              (typeof JSON.parse(requestData.CloseReason).Attachment != 'undefined' && Object.keys(JSON.parse(requestData.CloseReason).Attachment).length != 0)
                              ? JSON.parse(requestData.CloseReason).Attachment.map(file => ({
                                  fileType: file.File.split(".")[file.File.split(".").length-1],
                                  fileName: file.OriginalFile,
                                  path: `https://salicapi.com/File/${file.File}`
                                }))
                              : []
                            }
                          >
                            {JSON.parse(requestData.CloseReason).Body}
                          </Reply>
                        </Timeline.Item>
                      </div>
                    }
                    {
                      requestData?.Status != "CLOSED" &&
                      <div className="add-reply">
                        <Timeline.Item dot={<SenderImg Email={user_data.Data?.Mail} Name={user_data.Data?.DisplayName} />}>
                          <Space direction='vertical' style={{width: '100%'}}>
                            <TextArea rows={4} placeholder="Add Reply" maxLength={500} value={replyText} onChange={e => setReplyText(e.target.value)} />
                            <Upload 
                              action="https://salicapi.com/api/uploader/up"
                              fileList={fileList}
                              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                            >
                              <Button type='ghost' size='middle' icon={<UploadOutlined />}>Attach Files</Button>
                            </Upload>
                            <Button type='primary' onClick={AddReply} disabled={btnLoader}>Add Feedback</Button>
                          </Space>
                        </Timeline.Item>
                      </div>
                    }
                  </Timeline>
                </div>

                <div className='properties' ref={propertiesSectionRef}>
                  <UpdateRequestForm RequestData={requestData} />
                  <Section SectionTitle="Attached Files">
                    <div className='attachments-container'>
                      {requestData.Files.map((file,i) => {
                        return (
                          <FileIcon
                            key={i} 
                            FileType={file.FileName.split(".")[file.FileName.split(".").length-1]}
                            FileName={file.FileName}
                            FilePath={`https://salicapi.com/File/${file.Guid}`}
                            IconWidth='45px'
                          />
                        )
                      })}
                      {
                        requestData.Files.length === 0
                        ? <Typography.Text disabled>No Attachments</Typography.Text>
                        : null
                      }
                    </div>
                  </Section>
                  <Section SectionTitle="Assignee History">
                    <Steps 
                      direction="vertical"
                      size="small" 
                      status="process" 
                      current={requestData.Status == "CLOSED" ? requestData?.referingHistory.length+2 : requestData?.referingHistory.length}
                    >
                      <Steps.Step title="Submitted" subTitle={`at ${new Date(requestData.CreatedAt).toLocaleString()}`} />
                      {   
                        requestData?.referingHistory?.map((assignee, i) => {
                          let ruleName = '';
                          if (assignee.Rule && assignee.Rule !== ''){
                              assignee.Rule = assignee.Rule.replaceAll('\r\n', '');
                              ruleName = `As ${JSON.parse(assignee.Rule).Name}`;
                          }
                          return (
                            <Steps.Step 
                              key={i}
                              title={<b>{assignee.ByUser?.DisplayName} <CaretRightOutlined /> {assignee.ToUser?.DisplayName} {ruleName}</b>} 
                              subTitle={<>at {new Date(assignee.CreatedAt).toLocaleString()}</>}
                              description={ 
                                assignee.Response === "APPROVED" 
                                ? <><Text strong type='success'>{assignee.Response}</Text> at {new Date(assignee.UpdatedAt).toLocaleString()}</> 
                                : assignee.Response === "REJECTED" 
                                ? <><Text strong type='danger'>{assignee.Response}</Text> at {new Date(assignee.UpdatedAt).toLocaleString()}</> 
                                : null
                              }
                            />
                          )
                        })
                      }
                      {requestData?.Status === "CLOSED"
                        ? <Steps.Step title={<>Closed By <b>{requestData?.ClosedBy?.DisplayName}</b></>} subTitle={`at ${new Date(requestData?.UpdatedAt).toLocaleString()}`} /> 
                      : null}
                    </Steps>
                  </Section>
                </div>
              </>
            )
            : <AntdLoader />
          }
        </div>
      </div>
    </>
    
  )
}

export default PreviewITServiceRequest;