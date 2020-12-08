const mongoose = require('mongoose');
const UserModel = require('../models/user.js')
const hmac = require('./hmac.js')
const { getRandomNum, getRandomStr } = require('./random.js')

//启动数据库
mongoose.connect('mongodb://localhost:27017/kmallm11', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
    throw err
});

db.once('open', () => {
    console.log('DB connected....');
    const users = []
    for (let i = 0; i < 100; i++) {
        let username = getRandomNum(18839000000, 18840000000)
        users.push({
            username: username,
            phone: username,
            password: hmac(username + ''),
            isAdmin: i % 2 == 0 ? true : false,
            isActive: i % 2 == 0 ? '0' : '1',
            email: getRandomStr(6, getRandomStr.alpha) + '@qq.com',
            wxopenid: getRandomStr(10, getRandomStr.alpha)
        })
    }
    UserModel.insertMany(users)
    console.log('insert successful...')
});





