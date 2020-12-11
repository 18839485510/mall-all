import React, { Component } from 'react'
import { Layout, Breadcrumb, Form, Input, Button } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;
import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store';
import api from 'api'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 8 },
};
class AttrSave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.attrId
        }
        this.formRef = React.createRef()
    }
    async componentDidMount() {
        if (this.state.id) {
            const result = await api.getAttrsDetail({
                id: this.state.id
            })
            if (result.code == '0') {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    key: data.key,
                    name: data.name,
                    value: data.value
                })
            }
        }
    }
    render() {
        const {
            handleSave,
        } = this.props
        return (
            <div className='attr-save'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>属性</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? '修改属性' : '添加属性'}</Breadcrumb.Item>
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
                            onFinish={(values) => { handleSave(values, this.state.id) }}
                            ref={this.formRef}
                        >
                            <Form.Item
                                name="name"
                                label="属性名称"
                                rules={[{
                                    required: true,
                                    message: '请输入属性名称'
                                }]}
                            >
                                <Input placeholder='属性名称' />
                            </Form.Item>
                            <Form.Item
                                name="key"
                                label="属性键"
                                rules={[{
                                    required: true,
                                    message: '请输入属性键'
                                }]}
                            >
                                <Input placeholder='属性键' />
                            </Form.Item>
                            <Form.Item
                                name="value"
                                label="属性值"
                                rules={[{
                                    required: true,
                                    message: '请输入属性值'
                                }]}
                            >
                                <Input placeholder='属性值,多个属性用逗号分隔' />
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

    handleSave: (values, id) => {
        dispatch(actionCreator.getSaveAction(values, id))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(AttrSave)
