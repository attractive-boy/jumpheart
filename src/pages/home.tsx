import React, { useState } from 'react'
import { BottomTabBar } from '@/components/BottomTabBar'

// 添加页面容器样式
const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#020041',
  color: '#fff'
}

export default () => {
  const [activeKey, setActiveKey] = useState('todo')

  return (
    <div style={containerStyle}>
      <BottomTabBar activeKey={activeKey} onChange={setActiveKey} />
    </div>
  )
}