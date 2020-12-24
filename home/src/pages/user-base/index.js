require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
var tpl = require('./index.tpl')

require('./index.less')

var utils = require('utils')
var api = require('api')

var page = {
    init: function () {
        this.renderSide()
        this.loadUserinfo()
        this.bindEvent()
    },
    bindEvent: function () {
        //处理图像上传
        $('.side-content').on('change', '.upload-file', function () {
            var $this = $(this)
            var filePath = $this.val()
            if (filePath) {
                //判断文件类型
                var fileExt = filePath.substring(filePath.lastIndexOf(".") + 1).toLowerCase();
                if (fileExt != "jpg" && fileExt != "jpeg" && fileExt != "png" && fileExt != "gif") {
                    utils.showErrorMsg('请上传图片类型的文件')
                    return false;
                }
                //判断文件大小
                var size = $this[0].files[0].size;
                if (size > 2097152) {
                    utils.showErrorMsg('上传图片不能大于2M!')
                    return false;
                }
                var formData = new FormData()
                formData.append('avatar', $this[0].files[0])
                api.uploadUserAvatar({
                    data: formData,
                    params: {
                        processData: false, // 使数据不做处理,上传数据时用
                        contentType: false, // 不要设置Content-Type请求头,上传数据时用  
                    },
                    success: function (result) {
                        utils.showSuccessMsg('上传成功')
                        $('.side-content .header img').attr('src', result.data)
                    },
                    error: function (msg) {
                        utils.showErrorMsg('上传失败')
                    }
                })
            }
        })
        //处理修改用户名
        $('.side-content').on('click', '.btn-username', function () {
            var username = $.trim($('[name="username"]').val())
            if (!utils.validate(username, 'require')) {
                utils.showErrorMsg("用户名不能为空")
                return;
            }
            if (!utils.validate(username, 'username')) {
                utils.showErrorMsg("用户名格式不正确")
                return;
            }
            api.updateUsersUsername({
                data: {
                    username: username
                },
                success: function (result) {
                    utils.showSuccessMsg('用户名更新成功')
                },
                error: function (msg) {
                    utils.showErrorMsg(msg)
                }
            })
        })
        //处理修改邮箱
        $('.side-content').on('click', '.btn-email', function () {
            var email = $.trim($('[name="email"]').val())
            if (!utils.validate(email, 'require')) {
                utils.showErrorMsg("邮箱不能为空")
                return;
            }
            if (!utils.validate(email, 'email')) {
                utils.showErrorMsg("邮箱格式不正确")
                return;
            }
            api.updateUsersEmail({
                data: {
                    email: email
                },
                success: function (result) {
                    utils.showSuccessMsg('邮箱更新成功')
                },
                error: function (msg) {
                    utils.showErrorMsg(msg)
                }
            })
        })
    },
    renderSide: function () {
        _side.render('user-base')
    },
    loadUserinfo: function () {
        api.getUserinfo({
            success: function (result) {
                var user = result.data
                console.log(user)
                var html = utils.render(tpl, user)
                $('.side-content').html(html)
            }
        })
    }

}

$(function () {
    page.init()
})