import React, { useContext, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Timeline, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { AppCtx } from '../../../../App';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import GetMyItServiceRequests from '../../API/GetITRequest';
import FileIcon from '../../../../Global/RequestsComponents/FileIcon';
import Section from '../../../../Global/RequestsComponents/Section';
import SenderImg from '../../../../Global/RequestsComponents/SenderImg';
import Reply from '../../../../Global/RequestsComponents/Reply';
import moment from 'moment';

function PreviewITServiceRequest() {
  let { id } = useParams();
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [requestData, setRequestData] = useState({});
  const [replys, setReplys] = useState([]); // list of conversation from (requestData)
  let assigneeHistory = []; // list of referingHistory from (requestData)



  // Get Content Request by {id} and display it on preview
  async function GetRequest() {
    setBtnLoader(true);
    const response = await GetMyItServiceRequests(user_data.Data.Mail, id);        
    if(response.data.Status === 200) {
      const resData = response.data.Data;
      document.title = `.:: SALIC Gate | ${resData.Subject} ::.`;
      assigneeHistory = resData.referingHistory;
      setRequestData(resData);
      // const FormatConversation = 
      //   resData.Conversation.map(reply => {
      //     reply.Body = JSON.parse(reply.Body);
      //     const FormatAttachments = reply.Body.Attachment.map(r => ({
      //       fileType: r.File.split(".")[r.File.split(".").length-1],
      //       fileName: r.OriginalFile,
      //       path: `https://salicapi.com/File/${r.File}`
      //     }))
      //     reply.Attachments = FormatAttachments;
      //     return {...reply}
      //   });
      setReplys(resData.Conversation);
    } else {
      console.log("ERROR :: Get IT Service Request");
    }
    setBtnLoader(false);
  } 
  // Send Get's Requests (when page is rendered)
  useEffect(() => {
    if(id) {
      setLoading(true);
      GetRequest()
      .then(() => setLoading(false));
    } else {
      navigate(defualt_route + '/it-services/services-request');
      message.info("Error ::: Not Found Request")
    }
  }, []);



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/it-services`)}>IT Service Center</a>
        <p>Preview It Service Request</p>
      </HistoryNavigation>
        
      <div className='preview-request-container'>
        <div className="header">
          <h1>It Service Request: [#{requestData?.Id || '###'}]</h1>
        </div>
        {
          !loading
          ? (
              <div className='content'>
                <div className='timeline'>
                  <Timeline>
                    <div className="request-reply">
                      <Timeline.Item dot={<SenderImg Email={requestData.Requester.Mail} Name={requestData.Requester.DisplayName} />}>
                        <Reply
                          Title={<>RE: {requestData?.Subject}</>}
                          Description={`${requestData.Requester.DisplayName} @ ${moment(requestData?.CreatedAt).format('MM/DD/YYYY hh:mm:ss')}`} 
                        >
                          <div dangerouslySetInnerHTML={{__html: requestData.Description}}></div>
                        </Reply>
                      </Timeline.Item>
                    </div>

                    {
                      replys?.map((reply, i) => {
                        reply.Body = JSON.parse(reply.Body);
                        return (
                          <div className={(reply.CreatedBy?.Mail === user_data.Data?.Mail) ? "my-reply" : ""}>
                            <Timeline.Item key={i} dot={<SenderImg Email={reply.CreatedBy?.Mail} Name={reply.CreatedBy?.DisplayName} />} >
                              <Reply 
                                Title={reply.CreatedBy?.DisplayName} 
                                Description={new Date(reply.CreatedAt).toLocaleString()}
                                // Files={reply.Attachments}
                                IsReason={reply.IsResult}
                                RequestStatus={reply.ResultStatus}
                              >
                                {reply.Body?.Body}
                              </Reply>
                            </Timeline.Item>
                          </div>
                        )
                      })
                    }
                  </Timeline>
                </div>
                <div className='properties'>
                  <Section SectionTitle="Issue Category">
                    <Typography.Text>{requestData.Category}</Typography.Text>
                  </Section>
                  <Section SectionTitle="Issue Type">
                    <Typography.Text>{requestData.IssueType}</Typography.Text>
                  </Section>
                  <Section SectionTitle="Attached Files">
                      <div className='attachments-container'>
                          {requestData.Files.map((file,i) => {
                            return (
                              <FileIcon
                                key={i} 
                                FileType={file.FileName.split(".")[file.FileName.split(".").length-1]}
                                FileName={file.FileName}
                                FilePath={`https://salicapi.com/File/${file.Guid}`}
                                IconWidth='50px'
                              />
                            )
                          })}
                          {
                              requestData.Files.length === 0
                              ? <Typography.Text disabled>No Attachments</Typography.Text>
                              : null
                          }

                          {/* <FilePdfOutlined /><FileJpgOutlined /><FileWordOutlined /> */}
                      </div>
                  </Section>
              </div>
              </div>
            )
          : <div style={{display: 'flex', justifyContent: 'center'}}>
              <Spin indicator={<LoadingOutlined spin />} />
            </div>
        }
      </div>
    </>
  )
}

export default PreviewITServiceRequest