import { Empty } from 'antd'
import React from 'react'

function EmptySection() {
  return (
    <Empty style={{backgroundColor: '#fff', margin: 0, padding: '25px 0'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )
}

export default EmptySection