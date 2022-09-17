import React from 'react'
import { Button, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom';

function SubmitCancel(props) {
  const navigate = useNavigate();

  return (
    <Row gutter={10} justify="center">
      <Col>
        <Button type="primary" htmlType='submit' disabled={props.loaderState ? true : false} onClick={props.formSubmitHandler}>
          {props.isUpdate ? "Update" : "Submit"}
        </Button>
      </Col>
      <Col>
        <Button type="ghost" onClick={() => navigate( props.isUpdate ? -2 : -1)}>
          Cancel
        </Button>
      </Col>
    </Row>
  )
}

export default SubmitCancel