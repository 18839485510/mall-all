import React, { Component } from 'react'
import { Layout, Breadcrumb, Table, Button, Input, Switch, InputNumber } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const { Content } = Layout;

import { actionCreator } from './store'
import CustomLayout from 'components/custom-layout'

class CategoryList extends Component {
    componentDidMount() {
        this.props.handlePage(1)
    }
    render() {
        const {
            list,
            current,
            total,
            pageSize,
            handlePage,
            isFecthing,
            handleUpdateName,
            handleUpdateMobileName,
            handleUpdateIsShow,
            handleUpdateIsFloor,
            handleUpdatOrder
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                render: (name, record) => <Input
                    style={{ width: "60%" }}
                    defaultValue={name}
                    onBlur={(ev) => {
                        if (ev.target.value !== name) {
                            handleUpdateName(record._id, ev.target.value)
                        }
                    }}
                >
                </Input>
            },
            {
                title: '手机分类名称',
                dataIndex: 'mobileName',
                key: 'mobileName',
                width: '20%',
                render: (mobileName, record) => <Input
                    style={{ width: "60%" }}
                    defaultValue={mobileName}
                    onBlur={(ev) => {
                        if (ev.target.value !== mobileName) {
                            handleUpdateMobileName(record._id, ev.target.value)
                        }
                    }}
                >
                </Input>
            },
            {
                title: '手机图标',
                dataIndex: 'icon',
                key: 'icon',
                width: '15%',
                render: icon => <img width="60px" height="60px" style={{ borderRadius: "10%" }} src={icon}></img>
            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                key: 'isShow',
                width: '10%',
                render: (isShow, record) => <Switch
                    checkedChildren="显示"
                    unCheckedChildren="隐藏"
                    checked={isShow == 1 ? true : false}
                    onChange={(checked) => {
                        handleUpdateIsShow(record._id, checked ? '1' : 0)
                    }}
                />
            },
            {
                title: '是否是楼层',
                dataIndex: 'isFloor',
                key: 'isFloor',
                width: '10%',
                render: (isFloor, record) => {
                    return record.level == '1' ? <Switch
                        checkedChildren="显示"
                        unCheckedChildren="隐藏"
                        checked={isFloor == 1 ? true : false}
                        onChange={(checked) => {
                            handleUpdateIsFloor(record._id, checked ? '1' : 0)
                        }}
                    /> : null
                }
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                width: '15%',
                render: (order, record) => <InputNumber
                    style={{ width: "40%" }}
                    defaultValue={order}
                    onBlur={(ev) => {
                        if (ev.target.value !== order) {
                            handleUpdatOrder(record._id, ev.target.value)
                        }
                    }}
                >
                </InputNumber>
            },
            {
                title: '操作',
                width: '10%',
                render: (text, record) => <span>
                    <Link to={'/category/save/' + record._id}>修改</Link>
                </span>

            },
        ];
        return (
            <div className="category-list">
                <CustomLayout>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        lineHeight: "53px"
                    }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                            <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                        </Breadcrumb>
                        <Link to='/category/save'>
                            <Button type="primary">新增</Button>
                        </Link>
                    </div>
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
    list: state.get('category').get('list'),
    current: state.get('category').get('current'),
    total: state.get('category').get('total'),
    pageSize: state.get('category').get('pageSize'),
    isFecthing: state.get('category').get('isFecthing')
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPagesAction(page))
    },
    handleUpdateName: (id, newName) => {
        dispatch(actionCreator.getUpdateNameAction(id, newName))
    },
    handleUpdateMobileName: (id, newName) => {
        dispatch(actionCreator.getUpdateMobileNameAction(id, newName))
    },
    handleUpdateIsShow: (id, newIsShow) => {
        dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow))
    },
    handleUpdateIsFloor: (id, newIsFloor) => {
        dispatch(actionCreator.getUpdateIsFloorAction(id, newIsFloor))
    },
    handleUpdatOrder: (id, newOrder) => {
        dispatch(actionCreator.getUpdateOrderAction(id, newOrder))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)