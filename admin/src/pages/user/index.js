import React, { Component } from 'react'
import { Layout, Breadcrumb, Table, Switch } from 'antd';
import { connect } from 'react-redux'


import moment from 'moment'

const { Content } = Layout;

import { actionCreator } from './store'
import { formatDate } from 'utils'
import './index.less'
import CustomLayout from 'components/custom-layout'

class User extends Component {
    componentDidMount() {
        this.props.handlePage(1)
    }
    render() {
        const { list, current, total, pageSize, handlePage, isFecthing, handleUpdateIsActive } = this.props
        const dataSource = list
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
                render: isAdmin => isAdmin ? '是' : '否'
            },
            {
                title: '是否有效用户',
                dataIndex: 'isActive',
                key: 'isActive',
                render: (isActive, record) => <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={isActive == 1 ? true : false}
                    onChange={(checked) => {
                        console.log(record)
                        handleUpdateIsActive(record._id, checked ? '1' : 0, current)
                    }}
                />
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
                render: createdAt => formatDate(createdAt)
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
                        <Table
                            rowKey='_id'
                            dataSource={dataSource}
                            columns={columns}
                            pagination={{
                                current: current,
                                PageSize: pageSize,
                                total: total,
                                showSizeChanger: false,
                            }}
                            onChange={(pagination) => { handlePage(pagination.current) }}
                            loading={{
                                spinning: isFecthing,
                                tip: '数据加载中...'
                            }}
                        />;
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    list: state.get('user').get('list'),
    current: state.get('user').get('current'),
    total: state.get('user').get('total'),
    pageSize: state.get('user').get('pageSize'),
    isFecthing: state.get('user').get('isFecthing')
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPagesAction(page))
    },
    handleUpdateIsActive: (id, newIsActive, page) => {
        dispatch(actionCreator.UpdateIsActiveAction(id, newIsActive, page))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(User)