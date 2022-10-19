import React, { useState } from 'react';  
import './FolderExplorer.css';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import Organization from './components/Organization'
import PrivateFolder from './components/PrivateFolder'
import ESignFolder from './components/ESignFolder'

import { FolderOpenFilled, FolderOpenOutlined } from '@ant-design/icons';


const FolderExplorerPage = (props) => {
  const [currentItem, setCurrentItem] = useState(1);

  return (
    <>
      <HistoryNavigation>
        <p>eDocument System</p>
      </HistoryNavigation>

      <div className='folder-explorer-container'>  

        <div className='folders'>
          <div className='tabs'>
            <ul>
              <li onClick={_ => setCurrentItem(1)} className={currentItem === 1 ? 'active' : ''}>
                {currentItem === 1 ? <FolderOpenFilled /> : <FolderOpenOutlined />} Organization
              </li>
              <li onClick={_ => setCurrentItem(2)} className={currentItem === 2 ? 'active' : ''}>
                {currentItem === 2 ? <FolderOpenFilled /> : <FolderOpenOutlined />} Shared With Me
              </li>
              <li onClick={_ => setCurrentItem(3)} className={currentItem === 3 ? 'active' : ''}>
                {currentItem === 3 ? <FolderOpenFilled /> : <FolderOpenOutlined />} Private Folder
              </li>
              <li onClick={_ => setCurrentItem(4)} className={currentItem === 4 ? 'active' : ''}>
                {currentItem === 4 ? <FolderOpenFilled /> : <FolderOpenOutlined />} eSign Folder
              </li>
            </ul>
          </div>
          <div className='content'>
              
            <div style={{display: currentItem === 1 ? "block" : 'none'}}>
              <Organization />
            </div>
            <div style={{display: currentItem === 2 ? "block" : 'none'}}>
              Shared With Me
            </div>
            <div style={{display: currentItem === 3 ? "block" : 'none'}}>
              <PrivateFolder />
            </div>
            <div style={{display: currentItem === 4 ? "block" : 'none'}}>
              <ESignFolder />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default FolderExplorerPage
