
require('./index.less')
var tplEmpty = require('./empty.tpl')
var _util = require('utils')

var page = {
    init: function () {
        return this
    },
    getEmpty: function () {
        return _util.render(tplEmpty)
    },
}
module.exports = page.init()