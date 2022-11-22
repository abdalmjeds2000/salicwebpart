import React, { useState } from 'react';
import '../searchStyle.css';
import { Col, Row, Segmented, Tooltip, Typography } from 'antd';
import moment from 'moment';
import FileIcon from '../../Global/RequestsComponents/FileIcon';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import UserColumnInTable from '../../Global/UserColumnInTable/UserColumnInTable';
const { Title, Text } = Typography;


const FileCard = ({ icon, name, parent, creatorName, creatorEmail, createdDate, FilePath }) => {
  return (
    <div className='file-card' onClick={() => FileCard ? window.open(FilePath): null}>
      <div style={{marginBottom: '12px', fontSize: '2.5rem'}}>{icon}</div>
      <Tooltip title={moment(createdDate).format('MM/DD/YYYY hh:mm')}>
      <Title level={5} style={{marginBottom: '15px', fontWeight: '400'}}>{name}<Text type='secondary'>, {parent}</Text></Title>
      </Tooltip>
      {creatorName && <Row align="middle">
        {/* <Col><Avatar src={`/sites/newsalic/_layouts/15/userphoto.aspx?size=S&username=${creatorEmail}`} size="small"  /></Col> */}
        <Col>
          <Text type="secondary">{creatorName}</Text>
          {/* <Text type="secondary">{moment(createdDate).format('MM/DD/YYYY hh:mm')}</Text> */}
        </Col>
      </Row>}
    </div>
  )
}



const FileRow = ({ icon, name, parent, creatorName, creatorEmail, createdDate, FilePath, fileSize }) => {
  return (
    // <Tooltip title={moment(createdDate).format('MM/DD/YYYY hh:mm')}>
      <div className='file-card file-row'>
        <div style={{fontSize: '1.2rem', marginRight: '12px'}}>{icon}</div>
        <Title level={5} style={{width: '38%'}} onClick={() => FileCard ? window.open(FilePath): null}>{name}</Title>
        <Text type='secondary' style={{width: '15%'}}>{moment(createdDate).format('MM/DD/YYYY hh:mm')}</Text>
        <Text style={{width: '12%'}}>{parent}</Text>
        <div style={{width: '22%'}}>
          <UserColumnInTable Mail={creatorEmail} DisplayName={creatorName} />
        </div>
        <Text type='secondary' style={{width: '10%'}}>{fileSize}</Text>
      </div>
    // </Tooltip>
  )
}

const Result = () => {
  const [viewMode, setViewMode] = useState('Cards');

  return (
    <>
      <Row justify="end" align="middle" style={{marginBottom: 20}}>
          <Segmented
            onChange={value => setViewMode(value)}
            defaultValue="Cards"
            options={[
              {label: 'List', value: 'List', icon: <BarsOutlined />}, 
              {label: 'Cards', value: 'Cards', icon: <AppstoreOutlined />}
            ]} 
          />
      </Row>
      {viewMode === "Cards" && <Row gutter={[20, 20]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="folder" FileName="KSA Folder" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC Gate"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="MDM"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="folder" FileName="KSA Folder" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC Gate"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="doc" FileName="KSA Folder" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC Gate"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="ppt" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Ali Khalid Ali"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="folder" FileName="KSA Folder" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC Gate"
            creatorName="Omar Mahmoud"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="pdf" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC Gate"
            creatorName="Ali Khalid"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="jpg" FileName="KSA Folder" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC"
            creatorName="Khalifa Mohammed"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="rar" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC"
            creatorName="Ahmad Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <FileCard
            icon={<FileIcon FileType="ppt" FileName="KSA Folder" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="SALIC"
            creatorName="Abdullah Ahmad"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
          />
        </Col>
      </Row>}


      {viewMode === "List" && <Row gutter={[0, 8]} justify="center" style={{overflow: 'auto'}}>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
        <Col sm={24}>
          <FileRow
            icon={<FileIcon FileType="docx" FileName="KSA docx" IconWidth={40} />}
            name="KSA Edible Oil Overview Jul 2022"
            parent="dev"
            creatorName="Akmal Eldahdouh"
            creatorEmail="stsadmin@salic.onmicrosoft.com"
            createdDate="2022-11-22T08:16:40.184Z"
            FilePath="https://google.com" 
            fileSize="15.35MB"
          />
        </Col>
      </Row>}
    </>
  )
}

export default Result