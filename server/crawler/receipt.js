const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient; 
const puppeteer = require('puppeteer')
const url = 'https://www.ecook.cn/caipu/fenlei7136465/?page=1'

const config = {
  mongoDB: {
    database: 'menu',
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 27017
  }
}

const sleep = time => new Promise((resolve) => {
  setTimeout(resolve, time)
})

;(async () => {
  console.info('开始执行')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    devtools: true,
    slowMo: 3000
  })

  const page = await browser.newPage() // 打开一个新的页面
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 60*1000
  }) // 页面加载完成
  // await sleep(3000)
  await page.waitForSelector('.pagetion') // 直到页面出现.more class

  // for (let i = 0; i < 1; i++) {
  //   await sleep(3000)
  //   await page.click('.more')
  // }
  const result = await page.evaluate(() => {
    console.info(2323)
    const $ = window.$
    const items = $('.menu_list li')
    const links = []
    console.info('items', items)
    if (items.length > 0) {
      items.each((index, item) => {
        const it = $(item)
        const id = it.find('a').attr('href').replace('/caipu/', '')
        const imgUrl = it.find('.origin_mark_father img').attr('src')
        const title = it.find('.txt a h4').text()
        const desc = it.find('.txt a .pbm').text()
        const author = it.find('.txt .detail .writer a').text()
        links.push({
          imgUrl,
          id,
          title,
          desc,
          author
        })
      })
    }
    return links
  })
  browser.close()
  console.info(result, 'result....')
  console.info('执行结束')

  let mongoUrl = "mongodb://" + config.mongoDB.host + ":" + config.mongoDB.port + "/" + config.mongoDB.database;
  MongoClient.connect(mongoUrl,{ useNewUrlParser: true }, function(err, db) {
    if (err) {
      console.info(err)
      return
    }
    console.info(db.receiptList, db.collection("receiptList").insert(result))
    db.receiptList.insert(result)
  })
  
  // process.send({result})
  // process.exit(0)
})()
