import React, { Component } from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select, InputNumber, Transfer } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;
const { Option } = Select;
import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'
import { PRODUCT_IMAGE_UPLOAD_ADDRESS } from 'api/config.js'
import { actionCreator } from './store';
import api from 'api'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 8 },
};
class ProductSave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.attrId,
            targetKeys: [],
            selectedKeys: [],
            mainImage: '',
            mainImageValidate: {
                help: '',
                validateStatus: ''
            },
            images: '',
            imagesValidate: {
                help: '',
                validateStatus: ''
            }
        }
        this.formRef = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleMainImage = this.handleMainImage.bind(this)
        this.handleImages = this.handleImages.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleFinishFailed = this.handleFinishFailed.bind(this)
    }
    handleChange(nextTargetKeys, direction, moveKeys) {
        this.setState({ targetKeys: nextTargetKeys });
    };

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    };
    handleMainImage(image) {
        this.setState({
            mainImage: image,
            mainImageValidate: {
                help: '',
                validateStatus: ''
            }
        })
    }
    handleImages(images) {
        this.setState({
            images: images,
            imagesValidate: {
                help: '',
                validateStatus: ''
            }
        })
    }
    handleFinish(values) {
        const { targetKeys, mainImage, images } = this.state
        if (targetKeys.length > 0) {
            values.attrs = targetKeys.join(',')
        }
        this.handleFinishFailed()
        if (mainImage && images) {
            values.mainImage = mainImage
            values.image = images
            this.props.handleSave(values, this.state.id)
        }

    }
    handleFinishFailed() {
        const { mainImage, images } = this.state
        if (!mainImage) {
            this.setState({
                mainImageValidate: {
                    help: '请上传封面图片',
                    validateStatus: 'error'
                }
            })
        }
        if (!images) {
            this.setState({
                imagesValidate: {
                    help: '请上传商品图片',
                    validateStatus: 'error'
                }
            })
        }
    }
    componentDidMount() {
        //获取分类数据
        this.props.handleLevelCategories()
        //获取属性
        this.props.handleAllAttrs()
    }
    render() {
        const {
            categories,
            handleSave,
            allAttrs,
        } = this.props
        const options = categories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>)
        const dataSource = allAttrs.map(attr => ({
            key: attr._id,
            title: attr.name
        }))
        const {
            targetKeys,
            selectedKeys,
            mainImageValidate,
            imagesValidate,
        } = this.state
        return (
            <div className='attr-save'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? '编辑商品' : '添加商品'}</Breadcrumb.Item>
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
                            ref={this.formRef}
                            initialValues={{
                                price: 0,
                                stock: 0,
                                payNums: 0,
                            }}
                            onFinish={this.handleFinish}
                            onFinishFailed={this.handleFinishFailed}
                        >
                            <Form.Item
                                name="category"
                                label="商品分类"
                                rules={[{
                                    required: true,
                                    message: '请选择商品分类'
                                }]}
                            >
                                <Select
                                    placeholder="请选择商品分类"
                                    onChange={(value) => { console.log(value) }}
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="商品名称"
                                rules={[{
                                    required: true,
                                    message: '请输入商品名称'
                                }]}
                            >
                                <Input placeholder='商品名称' />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="商品描述"
                                rules={[{
                                    required: true,
                                    message: '请输入商品描述'
                                }]}
                            >
                                <Input placeholder='商品描述' />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="商品价格"
                                rules={[{
                                    required: true,
                                    message: '请输入商品价格'
                                }]}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                            <Form.Item
                                name="stock"
                                label="商品库存"
                                rules={[{
                                    required: true,
                                    message: '请输入商品库存'
                                }]}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                            <Form.Item
                                name="payNums"
                                label="支付人数"
                                required={false}
                                rules={[{
                                    required: true,
                                    message: '请输入支付人数'
                                }]}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                            <Form.Item
                                name="attrs"
                                label="商品属性"
                                required={false}
                            >
                                <Transfer
                                    dataSource={dataSource}
                                    titles={['未选属性', '已选属性']}
                                    targetKeys={targetKeys}
                                    selectedKeys={selectedKeys}
                                    onChange={this.handleChange}
                                    onSelectChange={this.handleSelectChange}
                                    render={item => item.title}
                                    style={{ marginBottom: 16 }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="封面图片"
                                required={true}
                                {...mainImageValidate}
                            >
                                <UploadImage
                                    action={PRODUCT_IMAGE_UPLOAD_ADDRESS}
                                    getImageUrlList={this.handleMainImage}
                                    maxLength={1}
                                    fileList={[]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="商品图片"
                                required={true}
                                {...imagesValidate}
                            >
                                <UploadImage
                                    getImageUrlList={this.handleImages}
                                    maxLength={3}
                                    action={PRODUCT_IMAGE_UPLOAD_ADDRESS}
                                    fileList={[]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="商品详情"
                                required={false}
                                rules={[{
                                    required: false,
                                    message: '请输入商品详情'
                                }]}
                            >
                                <Input />
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
    categories: state.get('product').get('categories'),
    allAttrs: state.get('product').get('allAttrs')
})
const mapDispatchToProps = (dispatch) => ({

    handleSave: (values, id) => {
        console.log(values)
        //dispatch(actionCreator.getSaveAction(values, id))
    },
    handleLevelCategories: () => {
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    handleAllAttrs: () => {
        dispatch(actionCreator.getAllAttrsAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductSave)
