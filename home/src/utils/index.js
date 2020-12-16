module.exports = {
    validate: function (value, type) {
        if (type == 'require') {
            return !!value
        }
        //电话号码格式验证
        if (type == 'phone') {
            return /^1[35789]\d{9}$/.test(value)
        }
        if (type == 'verifyCode') {
            return /^\d{6}$/.test(value)
        }
        if (type == 'password') {
            return /^\w{3,6}$/.test(value)
        }
        if (type == 'captchaCode') {
            return /^[a-zA-Z0-9]{4}$/.test(value)
        }
    },
    goLogin: function () {
        window.location.href = '/user-login.html'
    },
    getAlertSuccessMsg:function(msg){
        alert(msg)
    },
    goResult:function(type){
        window.location.href = './result.html?type=' + type
    },
    getParamFromUrl: function (key) {
        var query = window.location.search.substr(1)
        var reg = new RegExp('(^|&)' + key + '=' + '([^&]*)(&|$)')
        var result = query.match(reg)
        return result ? decodeURIComponent(result[2]) : null
    }
}