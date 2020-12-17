require('pages/common/logo')
require('pages/common/footer')
require('./index.less')
var _utils = require('utils')
var api = require('api')
const utils = require('../../utils')

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
        this.handleTimer()
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
        //点击获取验证码
        $('#btn-verify-code').on('click', function () {
            if ($(this).hasClass('disable-btn')) {
                return
            }
            $('.captcha-box').show()
            _this.getCaptcha()
        })
        //刷新验证码
        $('.captcha-img').on('click', function () {
            _this.getCaptcha()
        })

    },
    submit: function () {

        //1获取表单数据
        var formData = {
            phone: $('input[name="phone"]').val(),
            verifyCode: $('input[name="verify-code"]').val(),
            password: $('input[name="password"]').val(),
            repassword: $('input[name="repassword"]').val(),
        }

        //2验证
        var result = this.validate(formData)
        if (result.status) {
            //3验证成功
            formErr.hide()
            //向后台发送请求
            api.register({
                data: formData,
                success: function (result) {
                    utils.goResult('register')
                },
                error: function (msg) {
                    formErr.show(msg)
                }
            }
            )
        } else {
            //验证失败
            formErr.show(result.msg)
        }
    },
    validate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        //必须验证
        if (!_utils.validate(formData.phone, 'require')) {
            result.msg = '手机号不能为空'
            return result
        }
        //格式验证
        if (!_utils.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确'
            return result
        }
        if (!_utils.validate(formData.verifyCode, 'require')) {
            result.msg = '手机验证码不能为空'
            return result
        }

        if (!_utils.validate(formData.verifyCode, 'verifyCode')) {
            result.msg = '手机验证码格式不正确'
            return result
        }
        if (!_utils.validate(formData.password, 'require')) {
            result.msg = '密码不能为空'
            return result
        }

        if (!_utils.validate(formData.password, 'password')) {
            result.msg = '密码格式不正确'
            return result
        }
        if (formData.password !== formData.repassword) {
            result.msg = '两次密码不一致'
            return result
        }
        result.status = true
        return result
    },
    getCaptcha: function () {
        var _this = this
        api.getCaptcha({
            success: function (result) {
                $('.captcha-img').html(result.data)
            }
        })
        $('#btn-captcha-code').on('click', function () {
            _this.getVerifyCodeRequest()
        })
    },
    getVerifyCodeRequest: function () {
        var _this = this
        var phone = $('input[name="phone"]').val()
        var captchaCode = $('input[name="captcha-code"]').val()
        //必须验证
        if (!_utils.validate(phone, 'require')) {
            formErr.show('手机号不能为空')
            return
        }
        //格式验证
        if (!_utils.validate(phone, 'phone')) {
            formErr.show('手机号格式不正确')
            return
        }
        //必须验证
        if (!_utils.validate(captchaCode, 'require')) {
            formErr.show('图形验证码不能为空')
            return
        }
        //格式验证
        if (!_utils.validate(captchaCode, 'captchaCode')) {
            formErr.show('图形验证码格式不正确')
            return
        }
        formErr.hide()

        api.getRegisterVerifyCode({
            data: {
                phone: phone,
                captchaCode: captchaCode
            },
            success: function (result) {
                //弹出结果
                utils.getAlertSuccessMsg(result.message)
                //隐藏验证码框
                $('.captcha-box').hide()
                //清空图形验证码
                $('input[name="captcha-code"]').val('')
                window.localStorage.setItem('getVerifyCodeTime', Date.now())
                //获取验证码按键变为不可操作状态
                _this.handleTimer()
            },
            error: function (msg) {
                formErr.show(msg)
            }
        })
    },
    handleTimer: function () {
        var _this = this
        var $btn = $('#btn-verify-code')
        var getVerifyCodeTime = window.localStorage.getItem('getVerifyCodeTime') //获取手机验证码成功的时间
        if (getVerifyCodeTime) {
            var totalSecond = 20 //总倒计时
            var passSecond = parseInt((Date.now() - getVerifyCodeTime) / 1000)
            var restSecond = totalSecond - passSecond
            if (restSecond > 0) {
                $btn.addClass('disable-btn').text(restSecond + 's后重发')
                _this.timer = setInterval(function () {
                    var passSecond = parseInt((Date.now() - getVerifyCodeTime) / 1000)
                    var restSecond = totalSecond - passSecond
                    if (restSecond <= 0) {
                        $btn.removeClass('disable-btn').text('获取验证码')
                    } else {
                        $btn.text(restSecond + 's后重发')
                    }
                }, 1000)
            } else {
                clearInterval(_this.timer)
                window.localStorage.removeItem('getVerifyCodeTime')
            }




        }
    }
}

$(function () {
    page.init()
})