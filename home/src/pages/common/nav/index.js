require('./index.less')
var api = require("api")
var utils = require('utils')
const modal = require('../../../utils/modal')
var tpl = require('./index.tpl')

var page = {
    init: function () {
        this.$cartContent = $('.cart-content');
        this.loadUsername()
        this.loadCartsCount()
        this.bindEvent()
        return this
    },
    loadUsername: function () {
        var _this = this
        api.getUsername({
            success: function (result) {
                $('.not-login').addClass('hide')
                $('.login').removeClass('hide').find('.username').text(result.data.username)
                _this.loadCartsCount()
            }
        })
    },
    loadCartsCount: function () {
        var $cartNum = $('.nav-list .cart-count')
        api.getCartsCount({
            success: function (result) {
                $cartNum.text(result.data || 0)
            },
            error: function () {
                $cartNum.text(0)
            }
        })
    },
    render: function (cart) {
        var _this = this;
        if (cart.cartList.length == 0) {
            _this.$cartContent.html('<span class="empty-cart">购物车中还没有商品,赶紧来购买吧!</span>')
        }
        else {
            var html = utils.render(tpl, cart);
            _this.$cartContent.html(html)
        }
    },
    bindEvent: function () {
        var _this = this
        //退出
        $('#logout').on('click', function () {
            api.logout({
                success: function (result) {
                    window.location.reload()
                }
            })
        })
        //购物车
        $('.top .cart-box').hover(function () {
            _this.$cartContent.show()
            _this.$cartContent.html('<div class="loader"></div>')
            api.getCarts({
                success: function (result) {
                    var cart = result.data
                    _this.render(cart)
                },
                error: function () {
                    _this.$cartContent.html('<span class="empty-cart">获取购物车失败,请稍后再试!</span>')
                }
            })
        }, function () {
            _this.$cartContent.html('')
            _this.$cartContent.hide()
        })
    }

}

$(function () {
    page.init()
})

module.exports = page.init()