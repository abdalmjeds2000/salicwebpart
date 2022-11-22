import React, { useState } from 'react';
import './FilterPanel.css';
import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';


function FilterPanel(props) {

  return (
    <>
      <div className={`search-center-filter-panel ${!props.openFilterPanel ? 'close-filter-panel' : ''}`}>
        <Row gutter={[0, 0]}>{props.children}</Row>
        <div>
        <Button type="primary" htmlType='submit' icon={<FilterOutlined />} style={{width: '100%'}}>
          Apply Filter
        </Button>

        {props.IsShowRemoveFilter && <Button type="primary" disabled={props.isLoading} style={{marginTop: 10}} danger onClick={props.onResetFilter} icon={<CloseOutlined />} style={{width: '100%'}}>
          Remove Filter
        </Button>}
        </div>
      </div>
    </>
  )
}

export default FilterPanel