import React, { Component } from 'react'
import { Layout, Breadcrumb, Table } from 'antd';
import { connect } from 'react-redux'

const { Content } = Layout;

import { actionCreator } from './store'
import './index.less'
import CustomLayout from 'components/custom-layout'

class User extends Component {
    componentDidMount() {
        this.props.handlePage()
    }
    render() {
        const { list } = this.props
        const dataSource = list
        /*
        const dataSource = [
            {
                key: '1',
                username: '张玉领',
                isAdmin: '否',
                isActive: '是',
                email: '256@qq.com',
                phone: '18839485510',
                wxopenid: 'afesfsefsefsadwawvrg',
                createdAt: '2020-12-07 20:48:52',
            }
        ];
        */

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '是否管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
            },
            {
                title: '是否有效用户',
                dataIndex: 'isActive',
                key: 'isActive',
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
            }, {
                title: '手机',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: '微信openid',
                dataIndex: 'wxopenid',
                key: 'wxopenid',
            },
            {
                title: '注册时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
        ];
        return (
            <div className="user">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Table dataSource={dataSource} columns={columns} />;
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    list: state.get('user').get('list')
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: () => {
        dispatch(actionCreator.getPagesAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(User)