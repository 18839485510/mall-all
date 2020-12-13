import React, { Component } from 'react'
import { Layout, Breadcrumb, Table, Button, InputNumber, Divider, Switch, Input } from 'antd';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const { Content } = Layout;
const { Search } = Input

import { actionCreator } from './store'
import CustomLayout from 'components/custom-layout'

class ProductList extends Component {
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
            keyword,
            handleUpdateIsShow,
            handleUpdateStatus,
            handleUpdateIsHot,
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                ellipsis: true,
                width: "45%",
                render: (name) => {
                    const reg = new RegExp(`${keyword}`, 'ig')
                    const html = name.replace(reg, `<b style="color:red">${keyword}</b>`)
                    return <span dangerouslySetInnerHTML={{ __html: html }}></span>
                }
            },
            {
                title: '是否首页显示',
                dataIndex: 'isShow',
                key: 'isShow',
                width: '10%',
                render: (isShow, record) => <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={isShow == 1 ? true : false}
                    onChange={(checked) => {
                        handleUpdateIsShow(record._id, checked ? '1' : 0)
                    }}
                />
            },
            {
                title: '上架/下架',
                dataIndex: 'status',
                key: 'status',
                width: '10%',
                render: (status, record) => <Switch
                    checkedChildren="上架"
                    unCheckedChildren="下架"
                    checked={status == 1 ? true : false}
                    onChange={(checked) => {
                        handleUpdateStatus(record._id, checked ? '1' : 0)
                    }}
                />
            },
            {
                title: '是否热卖',
                dataIndex: 'isHot',
                key: 'isHot',
                width: '10%',
                render: (isHot, record) => <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={isHot == 1 ? true : false}
                    onChange={(checked) => {
                        handleUpdateIsHot(record._id, checked ? '1' : 0)
                    }}
                />
            },
            {
                title: '排序',
                dataIndex: 'order',
                width: '15%',
                render: (order, record) => <InputNumber
                    defaultValue={order}
                    onBlur={(ev) => {
                        if (ev.target.value !== order) {
                            handleUpdateOrder(record._id, ev.target.value)
                        }
                    }}
                >
                </InputNumber>
            },
            {
                title: '操作',
                width: '10%',
                render: (text, record) => <span>
                    <Link to={'/product/save/' + record._id}>修改</Link>
                    <Divider type="vertical" />
                    <Link to={'/product/detail/' + record._id}>查看</Link>
                </span>

            },
        ];
        return (
            <div className="product-list">
                <CustomLayout>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
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
                            justifyContent: 'space-between',
                            marginBottom: "20px"
                        }}>
                            <Search
                                placeholder="请输入商品名称关键字"
                                allowClear
                                onSearch={(value) => { handlePage(1, value) }}
                                style={{ width: 400 }}
                                enterButton
                            />
                            <Link to='/product/save'>
                                <Button type="primary">新增</Button>
                            </Link>
                        </div>
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
                            onChange={(pagination) => { handlePage(pagination.current, keyword) }}
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
    list: state.get('product').get('list'),
    current: state.get('product').get('current'),
    total: state.get('product').get('total'),
    pageSize: state.get('product').get('pageSize'),
    isFecthing: state.get('product').get('isFecthing'),
    keyword: state.get('product').get('keyword'),
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: (page, keyword) => {
        dispatch(actionCreator.getPagesAction(page, keyword))
    },
    handleUpdateIsShow: (id, newIsShow) => {
        dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow))
    }, handleUpdateStatus: (id, newStatus) => {
        dispatch(actionCreator.getUpdateStatusAction(id, newStatus))
    }, handleUpdateIsHot: (id, newIsHot) => {
        dispatch(actionCreator.getUpdateIsHotAction(id, newIsHot))
    },
    handleUpdateOrder: (id, newOrder) => {
        dispatch(actionCreator.getUpdateOrderAction(id, newOrder))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)