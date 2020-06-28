const puppeteer = require('puppeteer')
const url = 'https://www.ecook.cn/caipu/'
const {findData, updateData} = require('../db/mongose')
const {limit} = require('../db/data')
const sleep = time => new Promise((resolve) => {
  setTimeout(resolve, time)
})
const openPage = async () => {
  console.info('开始执行')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    devtools: true,
    slowMo: 3000
  })

  const page = await browser.newPage() // 打开一个新的页面
  return page
}
const getPageData = async (page, receiptId) => {
  await page.goto(url+ receiptId, {
    waitUntil: 'networkidle2',
    timeout: 6000*1000
  }) // 页面加载完成
  // await sleep(3000)
  // await page.waitForSelector('.comment_content') // 直到页面出现.more class

  const result = await page.evaluate(() => {
    console.info(2323)
    const $ = window.$
    const item = $('.all_article')
    const menuWatchs = $(item).find('.Menu_introduction .menus_btn .menu_show .menu_watch')
    // 标题
    const title = $(item).find('.cont #recipeName').text()
    // 浏览量
    const watchNum = $(menuWatchs[0]).text()
    // 收藏
    const collectNum = $(menuWatchs[1]).text()
    // 图片
    const imgUrl = $(item).find('.main_img img').attr('src')
    // 材料
    const materialDoms = $('.all_article .material_content .material .material_li')
    const materials = []
    materialDoms.each((index, item) => {
      const it = $(item)
      const materialDetails  = it.find('.material_subul li')
      console.info(materialDetails.length, 'length')
      const name = $(materialDetails[0]).text()
      const count = $(materialDetails[1]).text()
      materials.push({count, name})
    })
    // 步骤
    const stepDoms = $('.all_article .step_content .step .step_one')
    const steps = []
    stepDoms.each((index, item) => {
      const it = $(item)
      const detail  = it.find('.step_text .step_detail').text()
      // const title = it.find('.img').attr('title')
      const stepImg = it.find('.img .step_img').attr('src')
      steps.push({detail, title, stepImg})
    })
    return {materials, steps, watchNum, collectNum}
  })
  // browser.close()
  console.info(result, 'result', receiptId)
  updateData({id: receiptId}, result)
  // console.info('执行结束', Object.assign(result, {
  //   receiptId: receiptId
  // }))
}

;(async() => {
  const res = await findData(1, 2)
  const page = await openPage()
  console.info(res, 'resssss>>>>>>>>>>>>>')
  const fn = async function (item) {
    await getPageData(page, item.id)
    console.info('执行fn')
  }
  limit(res, fn, 2, (item) => {
    console.info(item, 开始执行)
  })
  console.info('结束了')
})()
