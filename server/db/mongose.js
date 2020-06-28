const path = require('path');
const mongoose = require('mongoose');    //引用mongoose模块
const config = {
  port: '3001',
  secret: 'secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mongoDB: {
    database: 'menu',
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 27017
  }
}

let url = "mongodb://" + config.mongoDB.host + ":" + config.mongoDB.port + "/" + config.mongoDB.database;
var mongo = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true }); //创建一个数据库连接

let db = {
    mongoose: mongoose,
    mongo: mongo,
    models: {}
};
// 错误
mongo.on('error', function (err) {
    console.error(new Error(err));
});
// 开启
mongo.once('open', function () {
    console.info("mongo is opened");
});
const schema = new mongoose.Schema({
  imgUrl: String,
  id: String,
  title: String,
  desc: String,
  author: String,
  type: Number
})
const ReceiptList = mongo.model('receiptList', schema, 'receiptList');

const findData = async(current, size) => {
  const res = await ReceiptList.find({}, {'id': 1, '_id': 0}).skip((current -1)*size).limit(size*1)
  console.info(res, 'gggg')
  return res
}

const updateData = async(origin, data) => {
  try {
    console.info('hahahhahahah', origin, data)
    const res = await ReceiptList.where({id: '262348435'}).update({'watchNum': 1})
    console.info(res, 'hggggggggg')
    // const res = await ReceiptList.update({},{$set: data}).exec()
  } catch (error) {
    console.info(error, 'error')
  }
}

module.exports = {findData, updateData}

updateData({id: '262348435'}, {watchNum: 0})