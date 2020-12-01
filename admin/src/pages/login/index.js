import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import { actionCreator } from './store'

import './index.less'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.handleCaptcha()
  }

  render() {
    const { handleFinish, handleCaptcha, isLoading, captcha } = this.props
    return (
      <div className='login'>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
              {
                pattern: /^[a-zA-Z]\w{2,5}$/,
                message: '用户名须以字母开头的3-6位字符'
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                pattern: /^\w{3,6}$/,
                message: '密码须为3-6位字符'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
              {
                pattern: /^[a-zA-Z0-9]{4}$/,
                message: '验证码格式不正确'
              }
            ]}
          >
            <Row>
              <Col span={12}>
                <Input
                  prefix={<SmileOutlined className="site-form-item-icon" />}
                  placeholder="验证码"
                />
              </Col>
              <Col span={12}>
                <div dangerouslySetInnerHTML={{ __html: captcha }} className='captcha' onClick={handleCaptcha}></div>
              </Col>
            </Row>

          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
            >
              登录
        </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return ({
    isLoading: state.get('login').get('isLoading'),
    captcha: state.get('login').get('captcha')
  })
}
const mapDispatchToProps = (dispatch) => ({
  handleFinish: (values) => {
    dispatch(actionCreator.getLoginDateAction(values))
  },
  handleCaptcha: () => {
    dispatch(actionCreator.getCaptchaAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login) 