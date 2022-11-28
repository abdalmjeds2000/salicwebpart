import React, { useContext, useState } from 'react'
import './Number.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Modal, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../../App';


function Number(props) {
  const navigate = useNavigate();
  const { defualt_route } = useContext(AppCtx);
  const [openPerformanceModal, setOpenPerformanceModal] = useState(false)
  const [openEventsModal, setOpenEventsModal] = useState(false)
  
  return (
    <div className="number-box-container">
      <div className="circular-progress-bar" onClick={() => (props.numberType === 'performance' && props.PerformanceDataTable.length > 0) ? setOpenPerformanceModal(true) : null}>
        <CircularProgressbar
          value={props.value}
          text={props.text}
          minValue={props.minValue}
          maxValue={props.maxValue}
          strokeWidth={props.strokeWidth}
          styles={buildStyles({
            pathColor: props.pathColor,
            trailColor: '#EEF3FF',
            textSize: '2rem',
            textColor: props.textColor,
          })
          }
        />
      </div>
      <div className="number-box-info">
        <h3 onClick={() => {
          props.numberType === 'performance'/*  && props.PerformanceDataTable.length > 0  */
          ? navigate(defualt_route + '/performance-managment') /* setOpenPerformanceModal(true) */
          : props.numberType === 'events' && props.EventsDataTable.length > 0
          ? setOpenEventsModal(true)
          : null
        }}>
          {props.header}
        </h3>
        <p onClick={() => navigate(defualt_route + '/performance-managment')}>{props.description}</p>
      </div>


      <Modal
        title="Performance KPI’s"
        open={openPerformanceModal}
        onCancel={() => setOpenPerformanceModal(false)}
        okButtonProps={{ style: {display: 'none'}}}
        className="more-width-antd-modal"
      >
        <div style={{overflowX: 'auto'}}>
          <Table 
            columns={props.PerformanceColumns} 
            dataSource={props.PerformanceDataTable}
            pagination={false}
          />
        </div>
      </Modal>
      <Modal
        title="Next Events"
        open={openEventsModal}
        onCancel={() => setOpenEventsModal(false)}
        okButtonProps={{ style: {display: 'none'}}}
        // className="more-width-antd-modal"
      >
        <div style={{overflowX: 'auto'}}>
          <Table 
            columns={props.EventsColumns} 
            dataSource={props.EventsDataTable?.filter(nextEvnt => new Date(nextEvnt.Date).getTime() > new Date().getTime()).slice(0, 5)}
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Number