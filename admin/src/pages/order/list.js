import React, { Component } from 'react'
import { Layout, Breadcrumb, Button } from 'antd';

import { Link } from 'react-router-dom'

const { Content } = Layout;
import CustomLayout from 'components/custom-layout'

class OrderList extends Component {
    render() {
        return (
            <div className="ad-list">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                        <Breadcrumb.Item>订单列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "20px"
                        }}>
                            <div style={{ fontSize: 24 }}>hello,this is orderList page</div>
                            <Link to='/order/detail'>
                                <Button type="primary">详情</Button>
                            </Link>
                        </div>

                    </Content>
                </CustomLayout>
            </div >
        )
    }
}
export default OrderList