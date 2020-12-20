require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('swiper/dist/css/swiper.min.css')
require('./index.less')
var api = require('api')
var utils = require('utils')
import Swiper from 'swiper'
var categoriesTpl = require('./categories.tpl')
var swiperTpl = require('./swiper.tpl')
var hotTpl = require('./hot.tpl')
var floorTpl = require('./floor.tpl')
var elevatorTpl = require('./elevator.tpl')
var childCategoriesTpl = require('./childCategories.tpl')

var page = {
    init: function () {
        this.$elevator = $('#elevator')
        this.$elevatorItems = null
        this.$floor = null
        this.$backToTop = null
        this.$win = $(window)
        this.$categories = $('.categories')
        this.cache = {}
        this.loadHomeCategories()
        this.loadSwiper()
        this.loadHotProducts()
        this.loadFloor()
        this.bindEvent()
    },
    bindEvent: function () {
        var _this = this
        this.$win.on('scroll resize load', function () {
            clearTimeout(_this.$elevator.showElevatorTimer);
            _this.$elevator.showElevatorTimer = setTimeout(_this.setElevator.bind(_this), 200);
        });
        //点击电梯到达指定楼层
        this.$elevator.on('click', '.elevator-item', function () {
            var num = _this.$elevatorItems.index(this);
            $('html,body')
                .animate({
                    scrollTop: _this.$floor.eq(num).offset().top
                })
        });
        this.$elevator.on('click', '.backToTop', function () {
            $('html,body')
                .animate({
                    scrollTop: 0
                })
        })

        //分类面板处理
        this.$categories.on('mouseenter', '.keyword-item', function () {
            //显示子分类面板
            $('.child-categories').show()
            clearTimeout(_this.timer)
            var $elem = $(this)
            $('.keyword-item').removeClass('active')
            $elem.addClass('active')
            _this.timer = setTimeout(function () {
                var id = $elem.data('id')
                if (_this.cache[id]) {
                    _this.renderChildArrayCategories(_this.cache[id])
                } else {
                    api.getChildArrayCategories({
                        data: {
                            pid: id
                        },
                        success: function (result) {
                            var childArrayCategories = result.data
                            _this.cache[id] = childArrayCategories
                            _this.renderChildArrayCategories(childArrayCategories)
                        }
                    })
                }
            }, 200)
            _this.$categories.on('mouseleave', function () {
                //清空面板并且隐藏
                $('.keyword-item').removeClass('active')
                $('.child-categories').html('').hide()
            })
        })
    },
    renderChildArrayCategories(categories) {
        var categoriesHtml = utils.render(childCategoriesTpl, {
            categories: categories
        })
        $('.child-categories').html(categoriesHtml)
    },
    loadHomeCategories: function () {
        api.getArrayCategories({
            success: function (result) {
                var html = utils.render(categoriesTpl, {
                    categories: result.data
                })
                $('.parent-categories').html(html)
            }
        })
    },
    loadSwiper: function () {
        api.getPositionAds({
            data: { position: 1 },
            success: function (result) {
                var html = utils.render(swiperTpl, {
                    slides: result.data
                })
                $('.swiper-container .swiper-wrapper').html(html)
                var mySwiper = new Swiper('.swiper-container', {
                    loop: true, // 循环模式选项
                    autoplay: true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            }

        })
    },
    loadHotProducts: function () {
        api.getHotProducts({
            success: function (result) {
                var html = utils.render(hotTpl, {
                    products: result.data
                })
                $('.hot-bd').html(html)
            }
        })
    },
    loadFloor: function () {
        var _this = this
        api.getFloors({
            success: function (result) {
                //增加楼层
                var html = utils.render(floorTpl, {
                    floors: result.data,
                })
                $('.floor-wrap').html(html)
                _this.$floor = $('.floor .floor-box')
                //加载电梯
                var html = utils.render(elevatorTpl, {
                    floors: result.data
                })
                $('.elevator').html(html)
                _this.$elevatorItems = _this.$elevator.find('.elevator-item')
                _this.$backToTop = _this.$elevator.find('.backToTop')
            }
        })
    },
    //获取楼层号
    getFloorNum() {
        //默认楼层号
        var _this = this
        var num = -1;
        if (this.$floor) {
            this.$floor.each(function (index, elem) {
                num = index;
                if ($(elem).offset().top > _this.$win.scrollTop() + _this.$win.height() / 2) {
                    num = index - 1;
                    return false;
                }
            });
        }
        return num;
    },
    //设置电梯
    setElevator() {
        var num = this.getFloorNum();
        if (num == -1) {
            this.$elevator.fadeOut();
        } else {
            this.$elevator.fadeIn();
            this.$elevatorItems.removeClass('elevator-active');
            this.$elevatorItems.eq(num).addClass('elevator-active');
        }
    }

}

$(function () {
    page.init()
})
