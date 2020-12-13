import React, { Component } from 'react'
import { Layout, Breadcrumb, Form, Input, InputNumber, Tag, Image } from 'antd';

const { Content } = Layout;
import CustomLayout from 'components/custom-layout'
import api from 'api'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.productId,
            product: {}
        }
        this.formRef = React.createRef()
    }
    async componentDidMount() {
        if (this.state.id) {
            //查看商品
            const result = await api.getProductsDetail({
                id: this.state.id
            })
            if (result.code == '0') {
                //回填数据
                const data = result.data
                this.setState({
                    product: data
                })
                this.formRef.current.setFieldsValue({
                    category: data.category.name,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    payNums: data.payNums
                })
            }
        }
    }
    render() {
        const { attrs, mainImage, images, detail } = this.state.product
        let attrTags = null
        let imagesWrap = null
        if (attrs) {
            attrTags = attrs.map((attr) => <Tag key={attr._id}>{attr.key}</Tag>)
        }
        if (images) {
            imagesWrap = images.split(',').map((src, index) => <Image key={index} width={100} src={src} />)
        }
        return (
            <div className='product-detail'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品</Breadcrumb.Item>
                        <Breadcrumb.Item>查看商品</Breadcrumb.Item>
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
                            onFinishFailed={this.handleValidate}
                        >
                            <Form.Item
                                name="category"
                                label="商品分类"
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="商品名称"

                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="商品描述"
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="商品价格"
                            >
                                <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="stock"
                                label="商品库存"
                            >
                                <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="payNums"
                                label="支付人数"
                            >
                                <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item
                                label="商品属性"
                            >
                                {attrTags}
                            </Form.Item>
                            <Form.Item
                                label="封面图片"
                            >
                                <Image
                                    width={100}
                                    src={mainImage}
                                />
                            </Form.Item>
                            <Form.Item
                                label="商品图片"
                            >
                                <Image.PreviewGroup>
                                    {imagesWrap}
                                </Image.PreviewGroup>
                            </Form.Item>
                            <Form.Item
                                label="商品详情"
                            >
                                <div
                                    style={{ marginTop: "5px" }}
                                    dangerouslySetInnerHTML={{ __html: detail }}>
                                </div>
                            </Form.Item>
                        </Form>
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
export default ProductDetail
