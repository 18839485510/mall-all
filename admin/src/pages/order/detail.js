import React, { Component } from 'react'
import { Layout, Breadcrumb, Button } from 'antd';

import { Link } from 'react-router-dom'

const { Content } = Layout;
import CustomLayout from 'components/custom-layout'

class OrderDetail extends Component {
    render() {
        return (
            <div className="orderDetail">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                        <Breadcrumb.Item>订单详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div style={{fontSize:24}}>hello,this is orderList detail page</div>
                    </Content>
                </CustomLayout>
            </div >
        )
    }
}
export default OrderDetail