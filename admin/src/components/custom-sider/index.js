import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { LogoutOutlined, HomeOutlined, UserAddOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'

import './index.less'
const { Sider } = Layout;
export default class CustomSider extends Component {
    render() {
        return (
            <div className='custom-sider'>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        style={{ height: 600, borderRight: 0 }}
                    >
                        <Menu.Item key="1">
                            <NavLink exact={true} to='/'><HomeOutlined />首页</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to='/user'><UserAddOutlined />用户管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to='/category'><UserAddOutlined /><MenuUnfoldOutlined />分类管理</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        )
    }
}
