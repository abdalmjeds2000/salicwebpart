import React, { useContext } from 'react';
import { Button, Col, Row, Timeline, Tooltip, Typography } from 'antd';
import { PictureOutlined, ReadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';

const SocialMedia = () => {
  const { defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  return (
    <div className="twitter-wid">
      <div className="header">
        <h3>Social Media</h3>
        <Row gutter={12}>
          <Col>
            <Row align="middle">
              <Tooltip title="New Content">
                <a style={{fontSize: '1.3em'}} onClick={() => navigate(defualt_route + '/content-requests')}>
                  <PictureOutlined />
                </a>
              </Tooltip>
            </Row>
          </Col>
          <Col>
            <Row align="middle">
              <Tooltip title="Al Mira Magazine">
                <a style={{fontSize: '1.3em'}} onClick={() => navigate(defualt_route + '/almira-magazine')}>
                  <ReadOutlined />
                </a>
              </Tooltip>
            </Row>
          </Col>
        </Row>
      </div>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'KSA_SALIC'
        }}
        options={{
          height: '850'
        }}
      />
    </div>
  )
}

export default SocialMedia