require('pages/common/logo')
require('pages/common/footer')
require('./index.less')
var _utils = require('utils')
var api = require('api')

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
    },
    bindEvent: function () {
        var _this = this
        $('#btn-submit').on('click', function () {
            _this.submit()
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
                    console.log(result)
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
    }
}

$(function () {
    page.init()
})