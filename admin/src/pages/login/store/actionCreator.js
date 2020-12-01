//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType.js'
import * as types from './actionType.js'
import axios from 'axios'
import { message } from 'antd';

import { saveUsername } from 'utils'
import api from 'api'

const getRequestStart = () => {
    return {
        type: types.REQUEST_START
    }
}
const getRequestEnd = () => {
    return {
        type: types.REQUEST_END
    }
}
const setCaptcha = (captcha) => {
    return {
        type: types.SET_CAPTCHA,
        payload: captcha
    }
}
export const getCaptchaAction = () => {
    return async function (dispatch) {

        const result = await api.getcaptcha()
        if (result.code == 0) {
            dispatch(setCaptcha(result.data))
        }
        /*
        const result = await axios({
            method: 'get',
            url: '/v1/users/captcha'
        })
         if (result.data.code == 0) {
            dispatch(setCaptcha(result.data.data))
        }
        */
    }
}
export const getLoginDateAction = (values) => {
    return async function (dispatch) {
        dispatch(getRequestStart())
        const data = {
            username: values.username,
            password: values.password,
            role: 'admin',
            captchaCode: values.captcha,
            channel: 'page'
        }
        const result = await api.login(data)
        if (result.code == 1) {
            message.error(result.message, 1);
        } else {
            message.success('登陆成功', 1)

            //保存用户登录信息，在组件直接可以进行切换
            saveUsername(result.data.username)

            //跳转至后台页面
            window.location.href = '/'
        }
        dispatch(getRequestEnd())
        /*
        const result = await axios({
            method: 'post',
            url: '/v1/users/login',
            data: {
                username: values.username,
                password: values.password,
                role: 'admin',
                captchaCode: values.captcha,
                channel: 'page'
            }
        })
        const data = result.data
        if (data.code == 1) {
            message.error(data.message, 1);
        } else {
            message.success('登陆成功', 1)

            //保存用户登录信息，在组件直接可以进行切换
            saveUsername(data.data.username)

            //跳转至后台页面
        }
        */

    }
}