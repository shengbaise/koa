//引入第三方模块mongodb并创建一个客户端
const MongoClient = require("mongodb").MongoClient;

//定义连接的地址
const url = "mongodb://127.0.0.1";

//定义连接的数据库
const db_name = "menu";

// //客户端连接数据库
// MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
//     //连接db_name这个数据库并使用student这个表
//     const collection = client.db(db_name).collection("receiptList");
    
//     //存入数据并退出连接
//     collection.insertMany(
//         [{
//           imgUrl: '34232',
//           id: '324242424',
//           title: 'we',
//           desc: 'e',
//           author: 'yishuo'
//         }, {
//           imgUrl: '34232',
//           id: '324242424dd',
//           title: 'we',
//           desc: 'e',
//           author: 'yishuo dssd'
//         }],
//         (err,result)=>{
//             client.close();
//         }
//     )
// })

const insertData = (arr) => {
  //客户端连接数据库
  MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    //连接db_name这个数据库并使用student这个表
    const collection = client.db(db_name).collection("receiptList");
    
    //存入数据并退出连接
    collection.insertMany(
        arr,
        (err,result)=>{
            client.close();
        }
    )
  })
}

module.exports = insertData