import React from 'react';
import './KPICard.css';
import { Card } from 'antd'
import { AiFillCheckCircle } from 'react-icons/ai';
import { Bullet } from '@ant-design/plots';

const KPICard = (props) => {
  const { title, description, sDate, eDate, achieveDate, maxVal, value, valueType } = props;



  const colorByRate = (number) => {
    let num = +number;
    if(num > 0 && num < 50) return "#ff4477"
    else if(num >= 50 && num < 70) return "#ffb864"
    else if(num >= 70) return "#05d17c"
    else return "#74c4ff"
  }

  const dataChart = [
    {
      title: 'KPI',
      ranges: [+maxVal+10],
      Measure: [+value],
      Target: +maxVal,
    },
  ];
  const configChart = {
    data: dataChart,
    height: 30,
    measureField: 'Measure',
    rangeField: 'ranges',
    targetField: 'Target',
    xField: 'title',
    color: {
      range: '#ffffff',
      measure: colorByRate(value),
      target: colorByRate(value),
    },
    xAxis: false,
    yAxis: false,
    legend: false,
  };


  return (
    <Card style={{height: '100%'}} bodyStyle={{backgroundColor: '#f5f5f5', height: '100%'}}>
      <div className='kpi-card-container'>
        <div>
          <div className='card-header'>
            <div className='value-type' style={{backgroundColor: colorByRate(value)}}>
              <span>{valueType}</span>
            </div>
            <div className='s-e-dates' title="Start & End Date">
              <span>{`${sDate} - ${eDate}`}</span>
            </div>
          </div>


          <div className='card-body'>
            {achieveDate ? <span className='achieve-date' title='Achieve Date' style={{color: colorByRate(value)}}><AiFillCheckCircle /> {achieveDate}</span> : null}
            <p className='title' title={title}>{title}</p>
            <p className='description' title={description}>{description}</p>
          </div>
        </div>

        <div className='card-chart'>
          <Bullet {...configChart} />
        </div>
      </div>
    </Card>
  )
}

export default KPICard