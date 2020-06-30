// 获取列表数据
const puppeteer = require('puppeteer')
const url = 'https://www.ecook.cn/caipu/fenlei7136465'
const insertData = require('../db/index')
const sleep = time => new Promise((resolve) => {
  setTimeout(resolve, time)
})

const getPageData = async (current) => {
  console.info('开始执行')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    devtools: true,
    slowMo: 3000
  })

  const page = await browser.newPage() // 打开一个新的页面
  await page.goto(url+ `/?page=${current}`, {
    waitUntil: 'networkidle2',
    timeout: 6000*1000
  }) // 页面加载完成
  // await sleep(3000)
  await page.waitForSelector('.pagetion') // 直到页面出现.more class

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
  datas.push(...result)
  browser.close()
  insertData(result)
  console.info(result.length, 'result....', datas)
  console.info('执行结束')
}
const datas = []
;(async() => {
  for await (let i of [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]) {
    getPageData(i)
  }
  console.info(datas, '结束了')
})()
