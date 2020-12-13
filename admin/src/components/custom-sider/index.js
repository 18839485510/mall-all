import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, MenuUnfoldOutlined, InteractionOutlined, CheckSquareOutlined, AppstoreOutlined, NotificationOutlined, DatabaseOutlined } from '@ant-design/icons';
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
                            <NavLink to='/category'><MenuUnfoldOutlined />分类管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to='/attr'><InteractionOutlined />属性管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to='/product'><CheckSquareOutlined />商品管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <NavLink to='/order'><AppstoreOutlined />订单管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <NavLink to='/ad'><NotificationOutlined />广告管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <NavLink to='/pwd'><DatabaseOutlined />密码管理</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        )
    }
}
