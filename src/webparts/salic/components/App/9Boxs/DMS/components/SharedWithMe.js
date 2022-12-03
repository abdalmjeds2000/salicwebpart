import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumb, Col, Row, Segmented, Typography } from 'antd';
import { AppCtx } from '../../../App';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';
import FileCard from '../../../Global/FileCard/FileCard';
import FileIcon from '../../../Global/RequestsComponents/FileIcon';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import FileCardRow from '../../../Global/FileCard/FileCardRow';


function SharedWithMe() {
  const { sp_context } = useContext(AppCtx);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('Cards');

  const fetchRoot = async () => {
    setLoading(true);
    let items = await sp_context.msGraphClientFactory
      .getClient('3')
      .then((client) => {
        client
          .api('/me/drive/sharedWithMe')
          .get()
          .then((response) => setData(response.value))
          .then(() => setLoading(false))
          .catch(err => console.log(err))
      }).catch(err => console.log(err));
  }


  const fetchChildren = async (driveId, itemId) => {
    setLoading(true);
    let items = await sp_context.msGraphClientFactory
      .getClient('3')
      .then((client) => {
        client
          .api(`/drives/${driveId}/items/${itemId}/children`)
          .get()
          .then((response) => setData(response.value))
          .then(() => setLoading(false))
          .catch(err => console.log(err))
      }).catch(err => console.log(err));
  }



  useEffect(() => {
    document.title = '.:: SALIC Gate | Shared With Me ::.';
    fetchRoot();
  }, []);


  // if(loading) {
  //   return <AntdLoader />
  // }

  return (
    <div style={{padding: '20px'}}>
      <Row align="middle" justify="end" style={{marginBottom: 20}}>
        {/* <Typography.Title level={3}>Shared With Me</Typography.Title> */}
        <Segmented
          onChange={value => setViewMode(value)}
          defaultValue="Cards"
          options={[
            {label: 'List', value: 'List', icon: <BarsOutlined />}, 
            {label: 'Cards', value: 'Cards', icon: <AppstoreOutlined />}
          ]} 
        />
      </Row>
      <Row style={{marginBottom: 10}}>
        <Breadcrumb style={{fontSize: '1.2rem'}}>
          <Breadcrumb.Item onClick={fetchRoot}><a>Shared With Me</a></Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      
      {loading ? <AntdLoader customStyle={{margin: '25px'}} /> : null}

      <div>
        {
          viewMode === "Cards"
          ? (
            <Row gutter={[20, 20]} justify="center">
              {
                data.map((row, i) => {
                  return (
                    <Col key={i} xs={24} sm={12} md={12} lg={6} xl={6} xxl={4}>
                    <FileCard
                      icon={<FileIcon FileType={row.folder ? 'folder' : row.name?.split('.')[row.name?.split('.')?.length-1]} FileName={row.name} IconWidth={40} />}
                      name={row.name}
                      creatorName={row.createdBy?.user?.displayName}
                      createdDate={row.createdDateTime}
                      FilePath={row.webUrl}
                      isFolder={row.folder}
                      canOpen={row.folder ? true : false}
                      onClick={e => fetchChildren(row.remoteItem?.parentReference?.driveId || row.parentReference?.driveId, row.id)}
                    />
                    </Col>
                  )
                })
              }
            </Row>
          ) : (
            <Row gutter={[0, 8]} justify="center" style={{overflow: 'auto'}}>
              <Col span={24} style={{padding: '5px 10px 5px 62px', minWidth: '650px', display: 'flex', alignItems: 'center'}}>
                <Typography.Text type='secondary' style={{width: '43.3%'}}>Name</Typography.Text>
                <Typography.Text type='secondary' style={{width: '18.4%'}}>Created At</Typography.Text>
                <Typography.Text type='secondary' style={{width: '26%'}}>Shared By</Typography.Text>
                <Typography.Text type='secondary' style={{width: '12%'}}>Size</Typography.Text>
              </Col>
              {
                data.map((row, i) => {
                  return (
                    <Col key={i} span={24}>
                      <FileCardRow
                        icon={<FileIcon FileType={row.folder ? 'folder' : row.name?.split('.')[row.name?.split('.')?.length-1]} FileName={row.name} IconWidth={40} />}
                        name={row.name}
                        creatorName={row.createdBy?.user?.displayName}
                        creatorEmail={null}
                        createdDate={row.createdDateTime}
                        filePath={row.webUrl}
                        sizeType={row.folder ? "items" : "size"}
                        fileSize={row.folder ? row.folder.childCount : row.size}
                        isFolder={row.folder}
                        canOpen={row.folder ? true : false}
                        onClick={e => fetchChildren(row.remoteItem?.parentReference?.driveId || row.parentReference?.driveId, row.id)}
                      />
                    </Col>
                  )
                })
              }
            </Row>
          )
        }
        
      </div>
    </div>
  )
}

export default SharedWithMe