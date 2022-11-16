import React, { useEffect, useState, useContext } from 'react'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../App';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import GetResearchPulse from '../../API/GetResearchPulse';
import Card from '../Card/Card';


function PulseCardsPage() {
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  
  const FetchData = async () => {
    const response = await GetResearchPulse();
    if(response) {
      setData(response)
    }
    setLoading(false);
  }
  useEffect(() => {
      FetchData();
  }, []);

  const filtered_data = data.filter(row => row.Title?.toLowerCase().includes(textSearch?.toLowerCase()))

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-center')}>Research Library</a>
        <p>Pulse</p>
      </HistoryNavigation>

      {
        !loading
        ? (
            <div className='standard-page'>
              <Row justify="space-between" align="middle" wrap={true}>
                <Col flex={8}>
                  <Typography.Title level={2} style={{lineHeight: 2.5}}>Pulse</Typography.Title>
                </Col>
                <Col flex={1}>
                  <Input placeholder="Type To Search" style={{width: '100%'}} value={textSearch} onChange={e => setTextSearch(e.target.value)} prefix={<SearchOutlined />} />
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                {
                  filtered_data.map((pulse, i) => {
                    let _CardImg = '';
                    let _CardDocument = '';
                    pulse.AttachmentFiles?.forEach(file => {
                      if(["jpeg", "jpg", "png", "gif", "tiff", "raw", "webp", "avif", "bpg", "flif"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                        _CardImg = file?.ServerRelativePath?.DecodedUrl;
                      } else if(["pdf", "doc", "docx", "html", "htm","xls", "xlsx", "txt", "ppt", "pptx", "ods"].includes(file.FileName?.split('.')[file.FileName?.split('.').length-1]?.toLowerCase())) {
                        _CardDocument = "https://salic.sharepoint.com" + file?.ServerRelativePath?.DecodedUrl;
                      }
                      if(_CardDocument === '' && pulse.AttachmentLink != null) _CardDocument = pulse.AttachmentLink
                    });
                    return (
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Card 
                          key={i} 
                          imgSrc={_CardImg} 
                          title={pulse.Title} 
                          openFile={() => _CardImg.length > 0 ? window.open(_CardDocument) : null} 
                        />
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
          )
        : <div style={{display: 'flex', justifyContent: 'center', margin: '100px 25px 25px 25px'}}>
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
      }
      
    </>
  )
}

export default PulseCardsPage