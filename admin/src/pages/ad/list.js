import React, { Component } from 'react'
import { Layout, Breadcrumb, Table, Button, Switch, InputNumber, Image } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const { Content } = Layout;

import { actionCreator } from './store'
import CustomLayout from 'components/custom-layout'

class adList extends Component {
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
            handleUpdateIsShow,
            handleUpdatOrder
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '广告名称',
                dataIndex: 'name',
                width: '20%',
            },
            {
                title: '广告位置',
                dataIndex: 'position',
                width: '20%',
                render: (position) => position == '1' ? '电脑端首页轮播图' : '移动端首页轮播图'
            },
            {
                title: '广告缩略图',
                dataIndex: 'image',
                width: '15%',
                render: image => <Image width={50} src={image}></Image>
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
                title: '操作',
                width: '10%',
                render: (text, record) => <span>
                    <Link to={'/ad/save/' + record._id}>修改</Link>
                </span>

            },
        ];
        return (
            <div className="ad-list">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
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
                            justifyContent: "flex-end",
                            marginBottom: "20px"
                        }}>
                            <Link to='/ad/save'>
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
                            onChange={(pagination) => { handlePage(pagination.current) }}
                            loading={{
                                spinning: isFecthing,
                                tip: '数据加载中...'
                            }}
                        />;
                    </Content>
                </CustomLayout>
            </div >
        )
    }
}
const mapStateToProps = (state) => ({
    list: state.get('ad').get('list'),
    current: state.get('ad').get('current'),
    total: state.get('ad').get('total'),
    pageSize: state.get('ad').get('pageSize'),
    isFecthing: state.get('ad').get('isFecthing')
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPagesAction(page))
    },

    handleUpdateIsShow: (id, newIsShow) => {
        dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow))
    },
    handleUpdatOrder: (id, newOrder) => {
        dispatch(actionCreator.getUpdateOrderAction(id, newOrder))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(adList)