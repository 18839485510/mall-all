import React, { Component } from 'react'
import { Layout, Breadcrumb, Card, Row, Col } from 'antd';
import { connect } from 'react-redux'

const { Content } = Layout;

import './index.less'
import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store';
class Home extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.handleCounts()
    }
    render() {
        const { usernum, ordernum, productnum } = this.props
        return (
            <div className='home'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Row>
                            <Col span={8}>
                                <Card title="用户数" bordered={false} style={{ width: 300 }}>
                                    <p>{usernum}</p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="商品数" bordered={false} style={{ width: 300 }}>
                                    <p>{productnum}</p>
                                </Card></Col>
                            <Col span={8}>
                                <Card title="订单数" bordered={false} style={{ width: 300 }}>
                                    <p>{ordernum}</p>
                                </Card></Col>
                        </Row>
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        usernum: state.get('home').get('usernum'),
        ordernum: state.get('home').get('ordernum'),
        productnum: state.get('home').get('productnum')
    })
}
const mapDispatchToProps = (dispatch) => ({
    handleCounts: () => {
        dispatch(actionCreator.getCountsAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)