import React,{Component} from 'react'
import axios from 'axios'

import { Form, Input, Button,Row,Col } from 'antd';
import { UserOutlined, LockOutlined,SmileOutlined} from '@ant-design/icons';

import './index.less'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            captcha:''
        }
        this.getCaptcha = this.getCaptcha.bind(this)
    }
    async getCaptcha(){
       
    const result = await axios({
        method:'get',
        url:'/v1/users/captcha'
    })
    if (result.data.code == 0) {
        console.log(this)
        this.setState({
            captcha: result.data.data
        })
    }
    }
    componentDidMount(){
        this.getCaptcha()
    }
    
    onFinish(values){
        console.log('Received values of form: ', values);
    }
    render(){
    return(
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            pattern:/^[a-zA-Z]\w{2,5}$/,
            message:'用户名须以字母开头的3-6位字符'
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
            pattern:/^\w{3,6}$/,
            message:'密码须为3-6位字符'
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
            pattern:/^[a-zA-Z0-9]{4}$/,
            message:'验证码格式不正确'
          }
        ]}
      >
        <Row>
          <Col span={12}>
            <Input
              prefix={<SmileOutlined className="site-form-item-icon"/>}
              placeholder="验证码"
          />
         </Col>
          <Col span={12}>
              <div dangerouslySetInnerHTML={{ __html:this.state.captcha}} className='captcha' onClick={this.getCaptcha}></div>
          </Col>
        </Row>
        
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
    )
}}

export default Login