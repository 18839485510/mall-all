import React, { Component } from 'react'
import { Layout, Breadcrumb, Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const { Content } = Layout;
import CustomLayout from 'components/custom-layout'


import api from 'api'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 8 },
};
class Pwd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pwdValidate: {
                help: '',
                validateStatus: ''
            }
        }
        this.formRef = React.createRef()
        this.handleValidate = this.handleValidate.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
    }
    handleValidate() {
        this.setState({
            pwdValidate: {
                help: '两次密码不一致',
                validateStatus: 'error'
            }
        })
    }
    async handleFinish(values) {
        console.log(values)
        const { password, rePassword } = values
        if (!rePassword) {
            this.setState({
                pwdValidate: {
                    help: '请再次输入密码',
                    validateStatus: 'error'
                }
            })
            return
        }
        if (password != rePassword) {
            this.handleValidate()
        } else {
            this.setState({
                pwdValidate: {
                    help: '',
                    validateStatus: ''
                }
            })
            const result = await api.getUpdatePwd({
                password: password
            })
            if (result.code == 0) {
                message.success('密码修改成功')
            } else {
                message.error(result.message)
            }
        }
    }
    render() {
        const { pwdValidate } = this.state
        return (
            <div className='pwd'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>密码</Breadcrumb.Item>
                        <Breadcrumb.Item>修改密码</Breadcrumb.Item>
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
                            ref={this.formRef}
                        >
                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码'
                                    },
                                    {
                                        pattern: /^\w{3,6}$/,
                                        message: '密码须为3-6位字符'
                                    }
                                ]}
                            >
                                <Input.Password
                                    placeholder="请输入密码"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="rePassword"
                                label="再次输入密码"
                                {...pwdValidate}
                                required={true}
                            >
                                <Input.Password
                                    placeholder="请再次输入密码"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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

export default Pwd
