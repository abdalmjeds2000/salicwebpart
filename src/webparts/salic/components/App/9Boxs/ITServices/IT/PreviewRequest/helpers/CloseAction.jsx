import React, { useState, useContext, useEffect } from 'react';
import { Button, message, Modal, Select, Space, Table, Typography, Upload } from 'antd';
import { AppCtx } from '../../../../../App';
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';



// FileUploderComponent
const CustomAntdFileUploder = (props) => {
  const [fileList, setFileList] = useState([]);
  
  return (
    <Upload
      action="https://salicapi.com/api/uploader/up"
      fileList={fileList}
      onChange={({ fileList: newFileList }) => {
        setFileList(newFileList)
        const FilesListWithTypes = newFileList.map(f => {f.FileType = props.FileType; return {...f}})
        props.GetFilesList(FilesListWithTypes)
      }}
    >
      <Button type='ghost' size='small' icon={<UploadOutlined />}>Attach Files</Button>
    </Upload>
  )
}






function CloseAction(props) {
  const { user_data } = useContext(AppCtx);
  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [classification, setClassification] = useState("Major");
  const [closeReason, setCloseReason] = useState("");
  const [fileList, setFileList] = useState([]);
  
  const [BIAFiles, setBIAFiles] = useState([]);
  const [SCRFiles, setSCRFiles] = useState([]);
  const [CONFFiles, setCONFFiles] = useState([]);
  const [UATiles, setUATiles] = useState([]);
  const [UGFiles, setUGFiles] = useState([]);




  const closeAction = () => {
    // check if there files is uploading...
    let isFilesFinishUpload = true;
    const attachmentsList = fileList.map(file => {
      if(file.status === "uploading") isFilesFinishUpload = false
      return file.response?.uploadedFiles[0]?.Name
    });

    // check if there files is uploading...
    let isCRFilesFinishUpload = true;
    const _CRFiles = [...BIAFiles, ...SCRFiles, ...CONFFiles, ...UATiles, ...UGFiles];
    const CRAttachmentsList = _CRFiles.map(file => {
      if(file.status === "uploading") isCRFilesFinishUpload = false
      return {
        Type: file.FileType, 
        Name: file.response?.uploadedFiles[0]?.Name
      }
    });

    let isAllTypesHavAttachments = true;
    if(selectedType === "CR") {
      const _CRFilesLists = [BIAFiles, SCRFiles, CONFFiles, UATiles, UGFiles];
      _CRFilesLists.forEach(list => {
        if(list.length == 0) isAllTypesHavAttachments = false
      });
    }


    if(isFilesFinishUpload && isCRFilesFinishUpload) {
      if(closeReason.length !== 0 && selectedType) {
        if(isAllTypesHavAttachments && classification) {
          const payload = {
            Email: user_data.Data.Mail,
            ServiceRequestId: props.RequestId,
            close_reason: closeReason,
            Files: attachmentsList.join(), 
            CRFiles: JSON.stringify(CRAttachmentsList),
            request_type: selectedType,
            change_classification: classification
          }
          // reset modal fields
          setOpenModal(false); setSelectedType(null); setClassification(null); setCloseReason(null); setFileList([]); setBIAFiles([]); setSCRFiles([]); setCONFFiles([]); setUATiles([]); setUGFiles([]);
          console.log('close payload', payload)
        } else message.error("Please Attach files for all Documents");
      } else message.error("Fill Field Correctly");
    } else message.error("Wait For Uploading...");
  }




  return (
    <>
      <Button size="middle" type='primary' danger onClick={() => setOpenModal(true)}>Close</Button>
      <Modal 
        title={<><SendOutlined /> Close Service Request</>}
        open={openModal} 
        onOk={closeAction} 
        onCancel={() => setOpenModal(false)}
        okButtonProps={{type: 'primary', danger: true}} 
        okText="Close"
      >
        
        <Space direction='vertical' style={{width: '100%', gap: '25pz'}}>
          <Typography.Text strong>HelpDesk Technical Feedback</Typography.Text>
          <TextArea rows={4} placeholder="HelpDesk Technical Feedback" value={closeReason} onChange={e => setCloseReason(e.target.value)} />


          <Typography.Text strong>Request Type</Typography.Text>
          <Select value={selectedType} size="middle" placeholder="Select Request Type" onChange={value => setSelectedType(value)} style={{width: '100%'}}>
            <Select.Option value="CR">Change Request</Select.Option>
            <Select.Option value="ER">Enhancement Request</Select.Option>
            <Select.Option value="HelpDesk">Help Desk</Select.Option>
            <Select.Option value="BUG">Bugs Fixing</Select.Option>
            <Select.Option value="Permission">Permissions</Select.Option>
            <Select.Option value="Incident">Incident</Select.Option>
          </Select>


          {
            selectedType === "CR"
            ? (
              <>
                <Typography.Text strong>Change Classification</Typography.Text>
                <Select defaultValue="Major" value={classification} size="middle" placeholder="Select Change Classification Type" onChange={value => setClassification(value)} style={{width: '100%'}}>
                  <Select.Option value="Major">Major</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                  <Select.Option value="Minor">Minor</Select.Option>
                </Select>

                <Typography.Text strong>Required Documents</Typography.Text>
                <Table 
                  pagination={false}
                  bordered
                  columns={[
                    {title: 'Document Name', dataIndex: 'DocumentName'},
                    {title: 'File', dataIndex: 'File'}
                  ]}
                  dataSource={[
                    { 
                      key: '1', 
                      DocumentName: 'BIA', 
                      File: <CustomAntdFileUploder FileType="bia_file" GetFilesList={files => setBIAFiles(files)} />},
                    { 
                      key: '2', 
                      DocumentName: 'Signed Change request', 
                      File: <CustomAntdFileUploder FileType="scr_file" GetFilesList={files => setSCRFiles(files)} />},
                    { 
                      key: '3', 
                      DocumentName: 'configuration Document', 
                      File: <CustomAntdFileUploder FileType="conf_file" GetFilesList={files => setCONFFiles(files)} />},
                    { 
                      key: '4', 
                      DocumentName: 'UAT', 
                      File: <CustomAntdFileUploder FileType="uat_file" GetFilesList={files => setUATiles(files)} />},
                    { 
                      key: '5', 
                      DocumentName: 'User Guide', 
                      File: <CustomAntdFileUploder FileType="user_guide_file" GetFilesList={files => setUGFiles(files)} />},
                  ]}
                />
              </>
            ) : null
          }


          <Upload
            action="https://salicapi.com/api/uploader/up"
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          >
            <Button type='ghost' size='middle' icon={<UploadOutlined />}>Attach Files</Button>
          </Upload>
        </Space>
      </Modal>
    </>
  )
}

export default CloseAction