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

var page = {
    init:function(){
    this.loadHomeCategories()
    this.loadSwiper()
    this.loadHotProducts()
    this.loadFloor()
    },
    loadHomeCategories:function(){
        api.getArrayCategories({
            success:function(result){
               var html =  utils.render(categoriesTpl,{
                categories:result.data
               })
               $('.parent-categories').html(html)
            }
        })
    },
    loadSwiper:function(){
        api.getPositionAds({
            data:{position:1},
            success:function(result){
               var html = utils.render(swiperTpl,{
                slides:result.data
            })
            $('.swiper-container .swiper-wrapper').html(html)
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay:true,
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                  clickable:true
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
    loadHotProducts:function(){
        api.getHotProducts({
            success:function(result){
                var html =  utils.render(hotTpl,{
                    products:result.data
                })
                $('.hot-bd').html(html)
            }
        })
    },
    loadFloor:function(){
        api.getFloors({
            success:function(result){
                //增加楼层
                console.log(result)
                var html =utils.render(floorTpl,{
                    floors:result.data,
                })
                $('.floor-wrap').html(html)
            }
        })
    }
}

$(function(){
    page.init()
})
