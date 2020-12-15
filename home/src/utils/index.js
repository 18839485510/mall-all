module.exports={
    validate :function (value, type) {
        if (type == 'require') {
            return !!value
        }
        //电话号码格式验证
        if (type == 'phone') {
            return /^1[3589]\d{9}$/.test(value)
        }
        if (type == 'verifyCode') {
            return /^\d{6}$/.test(value)
        }
        if (type == 'password') {
            return /^\w{3,6}$/.test(value)
        }
    }
}