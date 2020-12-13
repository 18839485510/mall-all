import React, { Component } from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux'
const { Option } = Select;
const { Content } = Layout;
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import { CATEGORY_ICON_UPLOAD_ADDRESS } from 'api/config.js'
import { actionCreator } from './store';
import api from 'api'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 8 },
};
class CategorySave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.categoryId,
            icon: '',
            iconValidate: {
                help: '',
                validateStatus: ''
            },
        }
        this.formRef = React.createRef()
        this.handleIcon = this.handleIcon.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
    }
    handleIcon(icon) {
        this.setState({
            icon: icon,
            iconValidate: {
                help: '',
                validateStatus: ''
            }
        })
    }
    handleValidate() {
        this.setState({
            iconValidate: {
                help: '请上传手机分类图标',
                validateStatus: 'error'
            }
        })
    }
    handleFinish(values) {
        const { icon, id } = this.state
        if (!icon) {
            this.handleValidate()
        }
        if (icon) {
            values.icon = icon
            values.id = id
            this.props.handleSave(values)
        }
    }
    async componentDidMount() {
        if (this.state.id) {
            const result = await api.getCategoriesDetail({
                id: this.state.id
            })
            if (result.code == '0') {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    pid: data.pid,
                    name: data.name,
                    mobileName: data.mobileName
                })
                this.handleIcon(data.icon)
            }
        } else {
            this.handleIcon('')
        }
        this.props.handleLevelCategories()
    }
    render() {
        const {
            categories,
        } = this.props
        const { iconValidate, icon } = this.state
        let fileList = []
        if (icon) {
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: icon
            })
        } else {
            fileList = []
        }
        const options = categories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>)
        return (
            <div className='category-save'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? '修改分类' : '添加分类'}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Form
                            {...layout}
                            name="control-hooks"
                            onFinish={this.handleFinish}
                            onFinishFailed={this.handleValidate}
                            ref={this.formRef}
                        >
                            <Form.Item
                                name="pid"
                                label="父级分类"
                                rules={[{
                                    required: true,
                                    message: '请选择父级分类'
                                }]}
                            >
                                <Select
                                    placeholder="请选择父级分类"
                                    onChange={(value) => { console.log(value) }}
                                    allowClear
                                >
                                    <Option value="0">根分类</Option>
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="分类名称"
                                rules={[{
                                    required: true,
                                    message: '请输入分类名称'
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="mobileName"
                                label="手机分类名称"
                                rules={[{
                                    required: true,
                                    message: '请输入手机分类名称'
                                }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                required={true}
                                label="手机分类图标"
                                {...iconValidate}
                            >
                                <UploadImage
                                    getImageUrlList={this.handleIcon}
                                    maxLength={3}
                                    action={CATEGORY_ICON_UPLOAD_ADDRESS}
                                    fileList={fileList}
                                />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    categories: state.get('category').get('categories'),
})
const mapDispatchToProps = (dispatch) => ({
    handleSave: (values) => {
        dispatch(actionCreator.getSaveAction(values))
    },
    handleLevelCategories: () => {
        dispatch(actionCreator.getLevelCategoriesAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)
