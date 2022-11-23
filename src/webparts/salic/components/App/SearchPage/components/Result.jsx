import React, { useState } from 'react';
import '../searchStyle.css';
import { Col, Row, Segmented, Tooltip, Typography } from 'antd';
import moment from 'moment';
import FileIcon from '../../Global/RequestsComponents/FileIcon';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import UserColumnInTable from '../../Global/UserColumnInTable/UserColumnInTable';
const { Title, Text } = Typography;


function formatSizeUnits(bytes){
  if      (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + " GB"; }
  else if (bytes >= 1000000)    { bytes = (bytes / 1000000).toFixed(2) + " MB"; }
  else if (bytes >= 1000)       { bytes = (bytes / 1000).toFixed(2) + " KB"; }
  else if (bytes > 1)           { bytes = bytes + " bytes"; }
  else if (bytes == 1)          { bytes = bytes + " byte"; }
  else                          { bytes = "0 bytes"; }
  return bytes;
}



const FileCard = ({ icon, name, parent, creatorName, createdDate, FilePath, IframLink }) => {
  return (
    <div className='file-card' onClick={() => FileCard ? window.open(FilePath): null}>
      {IframLink && <div style={{position: 'absolute', width: '100%', height: '50%', top: 0, left: 0}}>
        <iframe src={IframLink} width='100%' height='100%'></iframe>
      </div>}
      <div style={{marginBottom: '12px', fontSize: '2.5rem'}}>{icon}</div>
      {
        createdDate 
        ? <Tooltip title={moment(createdDate).format('MM/DD/YYYY hh:mm')}>
            <Title level={5} style={{marginBottom: '15px', fontWeight: '400'}}>{name}{/* <Text type='secondary'>, {parent}</Text> */}</Title>
          </Tooltip>  
        : <Title level={5} style={{marginBottom: '15px', fontWeight: '400'}}>{name}{/* <Text type='secondary'>, {parent}</Text> */}</Title>
      }
      {creatorName && <Row align="middle">
        <Col>
          <Text type="secondary">{creatorName}</Text>
        </Col>
      </Row>}
    </div>
  )
}



const FileRow = ({ icon, name, creatorName, creatorEmail, createdDate, filePath, fileSize }) => {
  return (
    // <Tooltip title={moment(createdDate).format('MM/DD/YYYY hh:mm')}>
      <div className='file-card file-row'>
        <div style={{fontSize: '1.2rem', marginRight: '12px'}}>{icon}</div>
        <Title level={5} style={{width: '42%'}} onClick={() => filePath ? window.open(filePath): null}>{name}</Title>
        <Text type='secondary' style={{width: '18%'}}>{createdDate ? moment(createdDate).format('MM/DD/YYYY hh:mm') : ''}</Text>
        {/* <Text style={{width: '12%'}}>{parent}</Text> */}
        <div style={{width: '25%'}}>
          <UserColumnInTable Mail={creatorEmail} DisplayName={creatorName} />
        </div>
        <Text type='secondary' style={{width: '12%'}}>{fileSize != 0 && fileSize ? formatSizeUnits(fileSize) : ''}</Text>
      </div>
    // </Tooltip>
  )
}

const Result = ({ data, query, totalItems }) => {
  const [viewMode, setViewMode] = useState('Cards');

  return (
    <div style={{marginBottom: 25}}>
      <Row justify="space-between" align="middle" style={{marginBottom: 20}}>
        <Text><b>{totalItems}</b> Result for <Text mark>{query}</Text></Text>
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
        {
          data?.map((row, i) => {
            const _IsDocument = row.Cells.filter(key => key.Key === "IsDocument")[0]?.Value;
            const _ContentTypeId = row.Cells.filter(key => key.Key === "ContentTypeId")[0]?.Value;
            const _FileType = row.Cells.filter(key => key.Key === "FileType")[0]?.Value;
            const FileType = _ContentTypeId?.startsWith('0x012000') ? 'folder' : _FileType ;
            const Title = row.Cells.filter(key => key.Key === "Title")[0]?.Value;
            const Author = row.Cells.filter(key => key.Key === "CreatedBy")[0]?.Value?.replace(';', ', ');
            const CreatedDate = row.Cells.filter(key => key.Key === "Created")[0]?.Value;
            const Path = row.Cells.filter(key => key.Key === "Path")[0]?.Value;
            const SiteTitle = row.Cells.filter(key => key.Key === "SiteTitle")[0]?.Value;
            
            return (
              <Col key={i} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                <FileCard
                  icon={<FileIcon FileType={FileType} FileName={Title} IconWidth={40} />}
                  name={Title}
                  parent={SiteTitle}
                  creatorName={Author}
                  // IframLink={_IsDocument == "true" ? Path : null}
                  createdDate={CreatedDate}
                  FilePath={Path}
                />
              </Col>
            )
          })
        }
      </Row>}
      {viewMode === "List" && <Row gutter={[0, 8]} justify="center" style={{overflow: 'auto'}}>
        {
          data?.map((row, i) => {
            const _ContentTypeId = row.Cells.filter(key => key.Key === "ContentTypeId")[0]?.Value;
            const FileType = _ContentTypeId?.startsWith('0x012000') ? 'folder' : row.Cells.filter(key => key.Key === "FileType")[0]?.Value;
            const Title = row.Cells.filter(key => key.Key === "Title")[0]?.Value;
            const Author = row.Cells.filter(key => key.Key === "CreatedBy")[0]?.Value?.replace(';', ', ');
            const CreatedDate = row.Cells.filter(key => key.Key === "Created")[0]?.Value;
            const Path = row.Cells.filter(key => key.Key === "Path")[0]?.Value;
            // const SiteTitle = row.Cells.filter(key => key.Key === "SiteTitle")[0]?.Value;
            const Size = row.Cells.filter(key => key.Key === "Size")[0]?.Value;
            
            return (
              <Col key={i} span={24}>
                <FileRow
                  icon={<FileIcon FileType={FileType} FileName={Title} IconWidth={40} />}
                  name={Title}
                  // parent="dev"
                  creatorName={Author}
                  creatorEmail={null}
                  createdDate={CreatedDate}
                  filePath={Path}
                  fileSize={Size}
                />
              </Col>
            )
          })
        }
      </Row>}
    </div>
  )
}

export default Result