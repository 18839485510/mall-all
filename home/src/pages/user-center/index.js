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
    },
    renderSide: function () {
        _side.render('user-center')
    },
    loadUserinfo: function () {
        api.getUserinfo({
            success: function (result) {
                var user = result.data
                user.registerTime = new Date(user.createdAt).toLocaleString()
                var html = utils.render(tpl, user)
                $('.side-content').html(html)
            }
        })
    }

}

$(function () {
    page.init()
})