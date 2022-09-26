import React, { useContext } from 'react'
import { Button, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App';

function SubmitCancel(props) {
  const navigate = useNavigate();
  const { defualt_route } = useContext(AppCtx);
  return (
    <Row gutter={10} justify="center">
      <Col>
        <Button type="primary" htmlType='submit' disabled={props.loaderState ? true : false} onClick={props.formSubmitHandler}>
          {props.isUpdate ? "Update" : "Submit"}
        </Button>
      </Col>
      <Col>
        <Button type="ghost" onClick={() => navigate(`${defualt_route}/admin-services`)}>
          Cancel
        </Button>
      </Col>
    </Row>
  )
}

export default SubmitCancel