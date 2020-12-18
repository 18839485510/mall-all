require('./index.less')
var api = require("api")

var page = {
    init: function () {
        this.loadUsername()
        this.bindEvent()
    },
    loadUsername: function () {
        var _this = this
        api.getUsername({
            success: function (result) {
                $('.not-login').addClass('hide')
                $('.login').removeClass('hide').find('.username').text(result.data.username)
                _this.getCartCount()
                _this.handleCart()
            }
        })
    },
    getCartCount: function () {
        api.getCartsCount({
            success: function (result) {
                $('.cart-count').text(result.data)
            }
        })
    },
    handleCart: function () {
        var _this = this
        $('.cart-box').on('mouseenter', function () {
            if (_this.cartTimer) {
                clearTimeout(_this.cartTimer)
            }
            _this.cartTimer = setTimeout(function () {
                $('.cart-content').show()
                $('.cart-content').html('<div class="loader"></div>')
                api.getCarts({
                    success: function (result) {
                        if (result.code == 0) {
                            _this.renderCart(result.data.cartList)
                        } else {
                            $('.cart-content').html('<span class="empty-cart">获取购物车失败，请稍后重试！</span>')
                        }
                    },
                    error: function () {
                        $('.cart-content').html('<span class="empty-cart">获取购物车失败，请稍后重试！</span>')
                    }
                })
            }, 500)

        })
        $('.cart-box').on('mouseleave', function () {
            if (_this.cartTimer) {
                clearTimeout(_this.cartTimer)
            }
            $('.cart-content').hide()
        })
    },
    renderCart: function (list) {
        var len = list.length
        if (len > 0) {
            var html = ''
            html += '<span class="cart-tip" > 最近加入的宝贝</span>'
            html += '<ul>'
            for (var i = 0; i < len; i++) {
                html += '<li class="cart-item clearfix">'
                html += '<a href="#" target="_blank">'
                html += '<img src="' + list[i].product.mainImage + '" alt="">'
                html += '<span class="text-ellipsis">' + list[i].product.name + '</span>'
                html += '</a>'
                html += '<span class="product-count">x ' + list[i].count + ' </span><span class="product-price">' + '&yen;' + list[i].product.price + '</span>'
                html += '</li>'
            }
            html += '</ul>'
            html += '<span class="line"></span>'
            html += '<a href="/cart.html" class="btn cart-btn">查看我的购物车</a>'
            $('.cart-content').html(html)
        } else {
            $('.cart-content').html('<span class="empty-cart">购物车中还没有商品,赶紧来购买吧!</span>')
        }
    },
    bindEvent: function () {
        //退出
        $('#logout').on('click', function () {
            api.logout({
                success: function (result) {
                    window.location.reload()
                }
            })
        })
    }

}

$(function () {
    page.init()
})