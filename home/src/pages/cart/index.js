require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.less')
var _nav = require('pages/common/nav')
var api = require('api')
var utils = require('utils')
var Tpl = require('./index.tpl')
var _err = require('pages/common/err')

var page = {
    init: function () {
        this.$elem = $('.cart .cart-box')
        this.loadCarts()
        this.bindEvent()
    },
    loadCarts: function () {
        var _this = this
        api.getCarts({
            success: function (result) {
                var cart = result.data
                _this.renderCart(cart)
            }
        })
    },
    renderCart: function (cart) {
        //重新加载购物车数量
        _nav.loadCartsCount()

        if (cart.cartList.length > 0) {
            //缓存总价用来提交时验证
            this.totalCartPrice = cart.totalCartPrice
            var html = utils.render(Tpl, cart)
            this.$elem.html(html)
        } else {
            this.$elem.html(_err.getEmpty())
        }

    },
    showErrorPage: function () {
        this.$elem.html(_err.getEmpty())
    },
    bindEvent: function () {
        var _this = this
        //处理单个
        this.$elem.on('click', '.select-one', function () {
            var $this = $(this)
            var productId = $this.parents('.product-item').data('product-id')
            if ($this.is(':checked')) {
                api.updateCartsChoices({
                    data: {
                        productId: productId,
                        checked: true,
                    },
                    success: function (result) {
                        var cart = result.data
                        _this.renderCart(cart)
                    },
                    error: function () {
                        _this.showErrorPage()
                    }
                })
            } else {
                api.updateCartsChoices({
                    data: {
                        productId: productId,
                        checked: false,
                    },
                    success: function (result) {
                        var cart = result.data
                        _this.renderCart(cart)
                    },
                    error: function () {
                        _this.showErrorPage()
                    }
                })
            }
        })
        //2.处理选择全部
        this.$elem.on('click', '.select-all', function () {
            var $this = $(this)
            //选中
            if ($this.is(':checked')) {
                api.updateCartsChoices({
                    data: {
                        checked: true,
                    },
                    success: function (result) {
                        var cart = result.data
                        _this.renderCart(cart)
                    },
                    error: function () {
                        _this.showErrorPage()
                    }
                })
            }
            //取消
            else {
                api.updateCartsChoices({
                    data: {
                        checked: false,
                    },
                    success: function (result) {
                        var cart = result.data
                        _this.renderCart(cart)
                    },
                    error: function () {
                        _this.showErrorPage()
                    }
                })
            }
        })
        //3.处理删除单个
        this.$elem.on('click', '.delete-one', function () {
            var $this = $(this)
            var productId = $this.parents('.product-item').data('product-id')
            //选中
            utils.showConfirm({
                msg: "您确定要删除该条商品吗?",
                ok: function () {
                    api.deleteCarts({
                        data: {
                            productId: productId,
                        },
                        success: function (result) {
                            var cart = result.data
                            _this.renderCart(cart)
                        },
                        error: function () {
                            _this.showErrorPage()
                        }
                    })
                }
            })
        })
        //4.处理删除选中
        this.$elem.on('click', '.delete-selected', function () {
            utils.showConfirm({
                msg: "您确定要删除选中的商品吗?",
                ok: function () {
                    api.deleteCarts({
                        success: function (result) {
                            var cart = result.data
                            _this.renderCart(cart)
                        },
                        error: function () {
                            _this.showErrorPage()
                        }
                    })
                }
            })
        })
        //5.处理商品数量
        this.$elem.on('click', '.count-btn', function () {
            var $this = $(this)
            var productId = $this.parents('.product-item').data('product-id')
            var $input = $this.siblings('.count-input')
            var current = parseInt($input.val())
            var stock = $input.data('stock')
            var count = current
            //减少
            if ($this.hasClass('minus')) {
                if (current == 1) {
                    utils.showErrorMsg("商品最少选择一件")
                    return
                }
                count = current - 1
            }
            //增加
            else if ($this.hasClass('plus')) {
                if (current == stock) {
                    utils.showErrorMsg("商品已经达到上限了")
                    return
                }
                count = current + 1
            }
            api.updateCartsCounts({
                data: {
                    productId: productId,
                    count: count,
                },
                success: function (result) {
                    var cart = result.data
                    _this.renderCart(cart)
                },
                error: function () {
                    _this.showErrorPage()
                }
            })
        })
        //6.处理结算跳转
        this.$elem.on('click', '.btn-submit', function () {
            if (_this.totalCartPrice > 0) {
                window.location.href = "./order-confirm.html"
            } else {
                utils.showErrorMsg("请最少选择一件商品")
            }
        })
    }
}
$(function () {
    page.init()
})