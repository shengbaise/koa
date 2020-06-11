const puppeteer = require('puppeteer')
const base = 'https://movie.douban.com/subject/30439272/?tag=%E6%9C%80%E6%96%B0&from=gaia'
const doubanId = ''
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
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  }) // 页面加载完成
  await sleep(1000)
  const result = await page.evaluate(() => {
    console.info('232323')
    const $ = window.$
    const it = $('.related-pic-video')
    console.info(it, 'it tittt')
    if (it && it.length) {
      const link = it.attr('href')
      const cover = it.find('img').attr('src')
      return {
        link, 
        cover
      }
      return {}
    }
  })
  console.info(result, 'ssss')
  const link = result.link || ''
  if (link) {
    await page.goto(link, {
      waitUntil: 'networkidle2'
    }) // 页面加载完成
    await sleep(1000)
    const video = await page.evaluate(() => {
      const $ = window.$
      const it = $('.vjs-tech source')
      if (it && it.length) {
        return it.attr('src')
      }
      return ''
    })
  }
  const data = {
    video,
    cover: result.cover,
    doubanId
  }
  browser.close()
  console.info('执行结束')
  process.send(data)
  process.exit(0)
})()
