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
            id: this.props.match.params.adId,
            image: '',
            imageValidate: {
                help: '',
                validateStatus: ''
            },
        }
        this.formRef = React.createRef()
        this.handleImage = this.handleImage.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
    }

    handleValidate() {
        this.setState({
            imageValidate: {
                help: '请上传广告图片',
                validateStatus: 'error'
            }
        })
    }

    handleFinish(values) {
        const { image, id } = this.state
        if (!image) {
            this.handleValidate()
        }
        if (image) {
            values.image = image
            values.id = id
            this.props.handleSave(values)
        }
    }

    async componentDidMount() {
        if (this.state.id) {
            const result = await api.getAdsDetail({
                id: this.state.id
            })
            if (result.code == '0') {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    name: data.name,
                    link: data.link,
                    position: data.position
                })
                this.setState({
                    image: data.image
                })
            }
        } else {
            this.setState({
                image: ''
            })
        }
    }

    handleImage(image) {
        this.setState({
            image: image,
            imageValidate: {
                help: '',
                validateStatus: ''
            }
        })
    }
    render() {
        const { imageValidate, image } = this.state
        let fileList = []
        if (image) {
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: image
            })
        } else {
            fileList = []
        }
        return (
            <div className='ad-save'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>广告</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? '编辑广告' : '添加广告'}</Breadcrumb.Item>
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
                                name="name"
                                label="广告名称"
                                rules={[{
                                    required: true,
                                    message: '请输入广告名称'
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="link"
                                label="广告地址"
                                rules={[{
                                    required: true,
                                    message: '请输入广告地址'
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="position"
                                label="广告位置"
                                rules={[{
                                    required: true,
                                    message: '请选择广告位置'
                                }]}
                            >
                                <Select
                                    placeholder="请选择广告位置"
                                    onChange={(value) => { console.log(value) }}
                                    allowClear
                                >
                                    <Option value="1">电脑端首页</Option>
                                    <Option value="2">移动端首页</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                required={true}
                                label="广告图片"
                                {...imageValidate}
                            >
                                <UploadImage
                                    getImageUrlList={this.handleImage}
                                    maxLength={1}
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

})
const mapDispatchToProps = (dispatch) => ({
    handleSave: (values) => {
        dispatch(actionCreator.getSaveAction(values))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)
