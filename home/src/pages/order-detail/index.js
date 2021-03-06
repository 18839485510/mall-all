require('pages/common/nav')
require('pages/common/search')
var _err = require('pages/common/err')
var _side = require('pages/common/side')
require('pages/common/footer')
var tpl = require('./index.tpl')

require('./index.less')

var utils = require('utils')
var api = require('api')
var kuaidiExpressApiId = 'd89f931d0a7f9dea79c754289d97de2c'
var page = {
    ordersDetailPrarms: {
        orderNo: utils.getParamFromUrl('orderNo') || '',
    },
    init: function () {
        this.$elem = $('.order-box')
        this.renderSide()
        this.loadOrderDetail()
        this.bindEvent()
    },
    renderSide: function () {
        _side.render('order-list')
    },
    loadOrderDetail: function () {
        var _this = this
        api.getOrdersDetail({
            data: this.ordersDetailPrarms,
            success: function (result) {
                var order = result.data
                _this.renderOrder(order)
            }
        })
    },
    renderOrder(order) {
        if (order) {
            order.createdTime = new Date(order.createdAt).toLocaleString()
            order.canPay = order.canCancel = order.status == 10
            order.canDone = order.status == 40
            //处理物流信息
            if (order.expressInfo) {
                if (order.expressInfo.code == 0) {
                    order.expressData = order.expressInfo.data
                    order.expressErrMsg = ''
                } else {
                    order.expressErrMsg = order.expressInfo.message
                    order.expressData = []
                }
            }
            var html = utils.render(tpl, order)
            this.$elem.html(html)

            //同步侧边栏的高度
            $('.side').css({
                height: $('.side-content').outerHeight()
            })
        } else {
            this.$elem.html(_err.getEmpty())
        }
    },
    bindEvent: function () {
        var _this = this
        //取消订单
        this.$elem.on('click', '.btn-cancel', function () {
            var $this = $(this)
            utils.showConfirm({
                msg: '您确定要取消该订单吗?',
                ok: function () {
                    api.updateOrdersStatus({
                        data: {
                            orderNo: $this.data('order-no'),
                            status: 20,
                        },
                        success: function (result) {
                            var order = result.data
                            _this.renderOrder(order)
                        },
                        error: function (msg) {
                            utils.showErrorMsg(msg)
                        }
                    })
                }
            })
        })
        //确认收货
        this.$elem.on('click', '.btn-done', function () {
            var $this = $(this)
            utils.showConfirm({
                msg: '您确定收到货了吗?',
                ok: function () {
                    api.updateOrdersStatus({
                        data: {
                            orderNo: $this.data('order-no'),
                            status: 50,
                        },
                        success: function (result) {
                            var order = result.data
                            _this.renderOrder(order)
                        },
                        error: function (msg) {
                            utils.showErrorMsg(msg)
                        }
                    })
                }
            })
        })
        //去支付
        this.$elem.on('click', '.btn-pay', function () {
            var $this = $(this)
            api.updateOrdersPay({
                data: {
                    orderNo: $this.data('order-no')
                },
                success: function (data) {
                    var data = result.data
                    window.location.href = data.url
                },
                error: function (msg) {
                    utils.showErrorMsg(msg)
                }
            })
        })
    }
}



$(function () {
    page.init()
})