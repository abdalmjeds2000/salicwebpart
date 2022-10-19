import React, { useEffect, useState } from 'react'
import './Number.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Modal, Table } from 'antd';
import { render } from 'react-dom';


function Number(props) {
  const [openPerformanceModal, setOpenPerformanceModal] = useState(false)
  const columns = [
    {
      title: 'KPI',
      dataIndex: 'KPI_NAME',
      width: '15%'
    },{
      title: 'Objectives',
      dataIndex: 'OBJECTIVES',
      width: '15%'
    },{
      title: '%',
      dataIndex: 'MEASURE_ACHIEVE',
      width: '10%',
      render: (val) => val ? `${val}%` : ' - '
    },{
      title: 'Target',
      dataIndex: 'TARGET',
      width: '10%'
    },{
      title: 'UOM',
      dataIndex: 'UOM',
      width: '10%',
      render: (val) => val !== '%' && val !== '#' ? val : ' - '
    },{
      title: 'Weightage',
      dataIndex: 'WEIGHTAGE',
      width: '5%'
    },{
      title: 'Manager KPI',
      dataIndex: 'Manager_KPI',
      width: '5%',
      render: (val) => val ? val : '-'
    },{
      title: 'Start Day',
      dataIndex: 'START_DATE',
      width: '10%',
      render: (val) => val ? new Date(val).toLocaleDateString() : ' - '
    },{
      title: 'End Day',
      dataIndex: 'END_DATE',
      width: '10%',
      render: (val) => val ? new Date(val).toLocaleDateString() : ' - '
    },{
      title: 'Achieve Date',
      dataIndex: 'ACHIEVE_DATE',
      width: '10%',
      render: (val) => val ? new Date(val).toLocaleDateString() : ' - '
    }
  ]
  return (
    <div className="number-box-container">
      <div className="circular-progress-bar">
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
          props.numberType === 'performance' && props.dataTable.length > 0 
          ? setOpenPerformanceModal(true) 
          : null;
        }}>
          {props.header}
        </h3>
        <p>{props.description}</p>
      </div>


      <Modal
        title="Performance KPI’s"
        visible={openPerformanceModal}
        onCancel={() => setOpenPerformanceModal(false)}
        okButtonProps={{ style: {display: 'none'}}}
        className="performance-antd-modal"
      >
        <div style={{overflowX: 'auto'}}>
          <Table 
            columns={columns} 
            dataSource={props.dataTable}
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Number