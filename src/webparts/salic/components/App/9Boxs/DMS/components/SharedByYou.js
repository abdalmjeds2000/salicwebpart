import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Segmented, Typography } from 'antd';
import { AppCtx } from '../../../App';
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';
import FileCard from '../../../Global/FileCard/FileCard';
import FileIcon from '../../../Global/RequestsComponents/FileIcon';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import FileCardRow from '../../../Global/FileCard/FileCardRow';

import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';




function SharedByYou() {
  const { sp_context } = useContext(AppCtx);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('Cards');


  const fetchData = async () => {
    let items = await sp_context.msGraphClientFactory
      .getClient('3')
      .then((client) => {
        client
          .api('/me/drive/root/children')
          .get()
          .then((response) => setData(response.value))
          .then(() => setLoading(false))
          .catch(err => console.log(err))
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData();
  }, []);

  // if(loading) {
  //   return <AntdLoader />
  // }


  const apiOptions = {
    ...connectorNodeV1.apiOptions,
    apiRoot: `https://mocki.io/v1/c690a303-4820-434e-8a7a-f13ee325cebf` // Or you local Server Node V1 installation.
  }


  return (
    <div style={{ height: '480px' }}>
      <FileManager>
        <FileNavigator
          id="filemanager-1"
          api={connectorNodeV1.api}
          apiOptions={apiOptions}
          capabilities={connectorNodeV1.capabilities}
          listViewLayout={connectorNodeV1.listViewLayout}
          viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
        />
      </FileManager>
    </div>
  )
}

export default SharedByYou