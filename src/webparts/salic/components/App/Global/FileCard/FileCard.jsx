import React from 'react';
import './filecard.css';
import { Col, Row, Tooltip, Typography } from 'antd';
import moment from 'moment';




const FileCard = ({ icon, name, creatorName, createdDate, FilePath, IframLink, isFolder, canOpen, onClick }) => {
  return (
    <div className='file-card' onClick={isFolder && canOpen ? (e) => onClick(e) : () => window.open(FilePath)}>
      {IframLink && <div style={{position: 'absolute', width: '100%', height: '50%', top: 0, left: 0}}>
        <iframe src={IframLink} width='100%' height='100%'></iframe>
      </div>}
      <div style={{marginBottom: '12px', fontSize: '2.5rem'}}>{icon}</div>
      {
        createdDate 
        ? <Tooltip title={moment(createdDate).format('MM/DD/YYYY hh:mm')}>
            <Typography.Title level={5} style={{marginBottom: '15px', fontWeight: '400'}}>{name}</Typography.Title>
          </Tooltip>  
        : <Typography.Title level={5} style={{marginBottom: '15px', fontWeight: '400'}}>{name}</Typography.Title>
      }
      {creatorName && <Row align="middle">
        <Col>
          <Typography.Text type="secondary">{creatorName}</Typography.Text>
        </Col>
      </Row>}
    </div>
  )
}

export default FileCard