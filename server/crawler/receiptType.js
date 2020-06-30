// https://www.ecook.cn/caipu/
// 获取列表数据
const puppeteer = require('puppeteer')
const url = 'https://www.ecook.cn/caipu/'
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
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 6000*1000
  }) // 页面加载完成
  // await sleep(3000)
  // await page.waitForSelector('.pagetion') // 直到页面出现.more class

  const result = await page.evaluate(() => {
    console.info(2323)
    const $ = window.$
    const items = $('.mainContent .subClassContent .subTitleContent')
    const types = []
    console.info('items', items)
    if (items.length > 0) {
      items.each((index, item) => {
        const firstName = $(item).find('.suboneTitle').text()
        const childs = $(item).find('.subAllContent .subContent')
        const secondTypes = []
        let type = 0
        childs.each((idx, v) => {
          type++
          const secondName = $(v).text()
          const linkId = $(v).attr('href')
          secondTypes.push({
            secondName,
            linkId,
            type
          })
        })
        types.push({
          type: index+1,
          firstName,
          secondTypes
        })
      })
    }
    return types
  })
  // datas.push(...result)
  // browser.close()
  // insertData(result)
  // console.info(result.length, 'result....', datas)
  console.info('执行结束', result)
}
const datas = []
;(async() => {
  await getPageData()
  console.info(datas, '结束了')
})()