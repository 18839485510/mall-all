import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { DownOutlined,LogoutOutlined,HomeOutlined,UserAddOutlined,MenuUnfoldOutlined } from '@ant-design/icons';

import { getUsername } from 'utils'
import './index.less'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Home extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => { console.log('logout...') }}><LogoutOutlined />退出</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className='home'>
                <Layout>
                    <Header className="header">
                        <div className="logo">SortMall</div>
                        <div className='logout'>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {getUsername()} <DownOutlined />
                                </a>
                            </Dropdown>,
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="1"><HomeOutlined />首页</Menu.Item>
                                <Menu.Item key="2"><UserAddOutlined />用户管理</Menu.Item>
                                <Menu.Item key="3"><MenuUnfoldOutlined />分类管理</Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                Content
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>,
            </div>
        )
    }
}
export default Home