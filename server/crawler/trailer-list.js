const puppeteer = require('puppeteer')
const url = 'https://movie.douban.com/explore#!type=movie&tag=%E6%9C%80%E6%96%B0&page_limit=20&page_start=0'

const sleep = time => new Promise((resolve) => {
  setTimeout(resolve, time)
})

;(async () => {
  console.info('开始执行')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage() // 打开一个新的页面
  await page.goto(url, {
    waitUntil: 'networkidle2'
  }) // 页面加载完成
  await sleep(3000)
  await page.waitForSelector('.more') // 直到页面出现.more class

  for (let i = 0; i < 1; i++) {
    await sleep(3000)
    await page.click('.more')
  }
  const result = await page.evaluate(() => {
    const $ = window.$
    const items = $('.list-wp .item')
    const links = []
    if (items.length > 0) {
      items.each((index, item) => {
        const it = $(item)
        console.info(it.find('p'))
        const doubanId = it.find('div').data('id')
        const title = it.find('img').attr('alt')
        const rate = it.find('strong').text()*1
        const poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })
  browser.close()
  // console.info(result)
  console.info('执行结束')
  process.send({result})
  process.exit(0)
})()
