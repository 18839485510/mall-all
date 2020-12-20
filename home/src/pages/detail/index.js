require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.less')
var _err = require('pages/common/err')
var utils = require('utils')
var api = require('api')
var tpl = require('./index.tpl')

var page = {
    productsDetailPrarms: {
        id: utils.getParamFromUrl('productId')
    },
    init: function () {
        this.$elem = $('.detail-box')
        this.loadProductDetail()
        this.bindEvent()
    },
    loadProductDetail: function () {
        if (!this.productsDetailPrarms.id) {
            return
        }
        var _this = this
        api.getProductsDetail({
            data: _this.productsDetailPrarms,
            success: function (result) {
                var product = result.data
                if (product) {
                    //缓存库存,为了增加数量时验证
                    _this.stock = product.stock
                    product.images = product.images.split(',')
                    console.log(product.images)
                    // product.activeImage = product.images[0]
                    product.activeImage = product.mainImage
                    product.attrsList = product.attrs.map(function (attr) {
                        return {
                            key: attr.key,
                            values: attr.value.split(',')
                        }
                    })
                    var html = utils.render(tpl, product)
                    _this.$elem.html(html)
                    $('.info>.attr-val-item:nth-child(1)').addClass('active')
                } else {
                    _this.$elem.html(_err.getEmpty())
                }
            },
            error: function (result) {
                console.log(result)
            }
        })

    },
    bindEvent: function () {
        var _this = this
        this.$elem.on('mouseenter', '.product-small-img-item', function () {

            //小图切换样式
            var $this = $(this)
            $this.addClass('active').siblings('.product-small-img-item').removeClass('active')

            //大图图片地址切换显示
            var imgSrc = $this.find('img').attr('src')
            $this.on('click', function () {
                $('.product-main-img').find('img').attr('src', imgSrc)
                $('.product-large-box').find('img').attr('src', imgSrc)
            })

        })
        this.$elem.on('mouseover', '.product-main-img', function (ev) {
            var $box = $('.product-img-box')
            var $mask = $('.product-img-box .mask')
            var $largeBox = $('.product-img-box .product-large-box')
            var $largeBoxImg = $('.product-img-box .product-large-box img')
            var $this = $(this)
            $mask.show()
            $largeBox.show()

            $this.on('mousemove', function () {
                var l = ev.clientX - $box.offset().left - $mask.width() * 0.5
                var t = ev.clientY - $box.offset().top - $mask.height() * 0.5 + document.documentElement.scrollTop
                console.log()
                if (l < 0) {
                    l = 0
                } else if (l > $this.width() - $mask.width()) {
                    l = $this.width() - $mask.width()
                }
                if (t < 0) {
                    t = 0
                } else if (t > $this.height() - $mask.height()) {
                    t = $this.height() - $mask.height()
                }
                $mask.css({
                    left: l + 'px',
                    top: t + 'px'
                })
                var percentX = l / ($this.width() - $mask.width());
                var percentY = t / ($this.height() - $mask.height());

                $largeBoxImg.css({
                    left: percentX * ($largeBox.width() - $largeBoxImg.width()) + 'px',
                    top: percentY * ($largeBox.height() - $largeBoxImg.height()) + 'px'
                })
            })
        })
        this.$elem.on('mouseout', function () {
            var $mask = $('.mask')
            var $largeBox = $('.product-img-box .product-large-box')
            $mask.hide()
            $largeBox.hide()
        })
        //3.处理购买数量
        this.$elem.on('click', '.count-btn', function () {
            var $this = $(this)
            var $input = $('.count-input')
            var current = parseInt($input.val())
            //增加
            if ($this.hasClass('plus')) {
                $input.val(current == _this.stock ? _this.stock : current + 1)
            }
            //减少
            else if ($this.hasClass('minus')) {
                $input.val(current == 1 ? 1 : current - 1)
            }
        })
        //4.处理属性选择
        this.$elem.on('click', '.attr-val-item', function () {
            var $this = $(this)
            $this.siblings().removeClass('active')
            $this.addClass('active')
        })
        //5.添加购物车
        this.$elem.on('click', '.add-cart-btn', function () {
            var attr = ''
            $('.attr-val-item.active').each(function () {
                attr += $(this).parent().siblings('.attr-key').html() + $(this).html() + ";"
            })
            api.addCarts({
                data: {
                    productId: _this.productsDetailPrarms.id,
                    count: $('.count-input').val(),
                    attr: attr
                },
                success: function () {
                    utils.goResult('addCart')
                }
            })
        })
    }
}

$(function () {
    page.init()
})