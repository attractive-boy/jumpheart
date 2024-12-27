import React from 'react'
import { TabBar } from 'antd-mobile'


// 添加样式
const tabBarStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'url(/nav-bg1.png) no-repeat center bottom',
  backgroundSize: 'cover',
  backgroundColor: '#020041 !important',
  borderTop: '1px solid #eee',
  zIndex: 100,
  color: '#fff',
  fontSize: '16px'
}

interface BottomTabBarProps {
  activeKey?: string;
  onChange?: (key: string) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ 
  activeKey = 'home',
  onChange 
}) => {
  const tabs = [
    {
      key: 'home',
      title: (active: boolean) => (
        <span style={{ 
          fontSize: '15px',
          color: '#fff'
        }}>首页</span>
      ),
      icon: <img src="/home.svg" alt="首页" style={{ filter: 'brightness(0) invert(1)' }} />,
    },
    {
      key: 'rules', 
      title: (active: boolean) => (
        <span style={{ fontSize: '15px', color: '#fff' }}>规则</span>
      ),
      icon: <img src="/rule.svg" alt="规则" style={{ filter: 'brightness(0) invert(1)' }} />,
    },
    {
      key: 'ranking',
      title: (active: boolean) => (
        <span style={{ fontSize: '15px', color: '#fff' }}>排行</span>
      ),
      icon: <img src="/ranking.svg" alt="排行" style={{ filter: 'brightness(0) invert(1)' }} />,
    },
  ]

  return (
    <TabBar activeKey={activeKey} onChange={onChange} style={tabBarStyle}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} style={{ fontSize: '16px' }} />
      ))}
    </TabBar>
  )
}
