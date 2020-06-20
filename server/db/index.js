//引入第三方模块mongodb并创建一个客户端
const MongoClient = require("mongodb").MongoClient;

//定义连接的地址
const url = "mongodb://127.0.0.1";

//定义连接的数据库
const db_name = "menu";

const insertData = (arr, name = 'receiptList') => {
  //客户端连接数据库
  MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    //连接db_name这个数据库并使用student这个表
    const collection = client.db(db_name).collection(name);
    
    //存入数据并退出连接
    collection.insertMany(
        arr,
        (err,result)=>{
            client.close();
        }
    )
  })
}

const find = async (name = 'receiptList') => {
  //客户端连接数据库
  MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },async (err,client)=>{
    //连接db_name这个数据库并使用student这个表
    const collection = client.db(db_name).collection(name);
    
    //存入数据并退出连接
    // collection.find(
    //     arr,
    //     (err,result)=>{
    //         client.close();
    //     }
    // )
    console.info(',<<<<<<<<<<<>>>>>>>>>>>>>')
    console.info(collection.find({}), 'collection')
    return await collection.find({}, {'id': 1}).skip(0).limit(200)
  })
}

module.exports = {insertData, find}