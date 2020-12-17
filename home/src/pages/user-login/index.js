require('pages/common/logo')
require('pages/common/footer')
require('./index.less')
var api = require('api')
var utils = require('utils')

var formErr = {
    show: function (msg) {
        $('.error-item').show().find('.error-msg').html(msg)
    },
    hide: function () {
        $('.error-item').hide().find('.error-msg').html('')
    }
}
var page = {
    init: function () {
        this.bindEvent()
        this.getCaptcha()
    },
    //获取验证码图片
    getCaptcha: function () {
        api.getCaptcha({
            success: function (result) {
                $('.captcha-img').html(result.data)
            },
            error: function (result) {
                console.log(result)
            }
        })
    },
    bindEvent: function () {
        var _this = this
        //给按钮绑定提交事件
        $('#btn-submit').on('click', function () {
            _this.submit()
        })
        //回车键提交事件
        $('input').on('keydown', function (ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })
        //点击验证码图片刷新验证码
        $('.captcha-img').on('click', function () {
            _this.getCaptcha()
        })
    },
    submit: function () {
        //1获取表单数据
        var formData = {
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val(),
            captchaCode: $('input[name="captcha-code"]').val()
        }
        //验证表单数据
        var result = this.validata(formData)
        if (result.code) {//通过验证
            formErr.hide()
            api.login({
                data: formData,
                success: function (result) {
                    window.location.href = utils.getParamFromUrl('redirect') || '/'
                },
                error: function (msg) {
                    formErr.show(msg)
                }
            })
        } else {//验证失败
            formErr.show(result.msg)
        }

    },
    validata: function (formData) {
        var result = {
            code: false,
            msg: ''
        }
        //非空
        if (!utils.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空'
            return result
        }
        //格式
        if (!utils.validate(formData.username, 'username')) {
            result.msg = '用户名格式不正确'
            return result
        }
        //非空
        if (!utils.validate(formData.password, 'require')) {
            result.msg = '密码不能为空'
            return result
        }
        //格式
        if (!utils.validate(formData.password, 'password')) {
            result.msg = '密码格式不正确'
            return result
        }
        //非空
        if (!utils.validate(formData.captchaCode, 'require')) {
            result.msg = '验证码不能为空'
            return result
        }
        //格式
        if (!utils.validate(formData.captchaCode, 'captchaCode')) {
            result.msg = '验证码格式不正确'
            return result
        }
        result.code = true
        return result
    }

}

$(function () {
    page.init()
})
