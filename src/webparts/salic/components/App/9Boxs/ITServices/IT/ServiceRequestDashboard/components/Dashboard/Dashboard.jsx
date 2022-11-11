import React from 'react';
import { Col, Row } from 'antd';
import UserSRSummary from './UserSRSummary/UserSRSummary';
import TypesSRSummary from './TypesSRSummary/TypesSRSummary';
import DepartmentSRSummary from './DepartmentSRSummary/DepartmentSRSummary';

function Dashboard(props) {
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}}>
          <UserSRSummary
            DataForUser={props.DataForUser}
            summaryByStatus={props.summaryByStatus}
            summaryByPriority={props.summaryByPriority}
          />
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}}>
          <DepartmentSRSummary
            DataForUser={props.DataForUser}
            summaryByDepartment={props.summaryByDepartment}
          />
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}}>
          <TypesSRSummary
            DataForUser={props.DataForUser}
            summaryByRequestType={props.summaryByRequestType}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard