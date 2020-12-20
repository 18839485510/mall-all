var Hogan = require('hogan.js')
var modal = require('./modal')

module.exports = {
    validate: function (value, type) {
        if (type == 'require') {
            return !!value
        }
        //电话号码格式验证
        if (type == 'phone') {
            return /^1[35789]\d{9}$/.test(value)
        }
        //验证手机验证码
        if (type == 'verifyCode') {
            return /^\d{6}$/.test(value)
        }
        //验证密码
        if (type == 'password') {
            return /^\w{3,6}$/.test(value)
        }
        //验证验验证码
        if (type == 'captchaCode') {
            return /^[a-zA-Z0-9]{4}$/.test(value)
        }
        //验证用户名
        if (type == 'username') {
            return /^[a-z0-9][a-z0-9_]{2,10}$/.test(value)
        }
    },
    goLogin: function () {
        window.location.href = '/user-login.html'
    },
    getAlertSuccessMsg: function (msg) {
        alert(msg)
    },
    goResult: function (type) {
        window.location.href = './result.html?type=' + type
    },
    getParamFromUrl: function (key) {
        var query = window.location.search.substr(1)
        var reg = new RegExp('(^|&)' + key + '=' + '([^&]*)(&|$)')
        var result = query.match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    render: function (tpl, data) {
        var template = Hogan.compile(tpl)
        var html = template.render(data)
        return html
    },
    showErrorMsg: function (msg) {
        modal.showError(msg)
    },
    showSuccessMsg: function (msg) {
        modal.showSuccess(msg)
    },
    showConfirm: function (options) {
        modal.confirm(options)
    },
}