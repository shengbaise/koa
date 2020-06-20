const puppeteer = require('puppeteer')
const url = 'https://www.ecook.cn/caipu/'
const {insertData, find} = require('../db/index')
const {findData} = require('../db/mongose')
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
    // 标题
    const title = $(item).find('.cont #recipeName').text()
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
      const title = it.find('.img').attr('title')
      const stepImg = it.find('.img .step_img').attr('src')
      steps.push({detail, title, stepImg})
    })
    return {title, materials, steps}
  })
  // browser.close()
  // insertData(result, 'receiptDetail')
  console.info('执行结束', Object.assign(result, {
    receiptId: receiptId
  }))
}

;(async() => {
  const res = await findData(1, 10)
  const page = await openPage()
  console.info(res, 'resssss')
  for(let i of res) {
    await getPageData(page, i.id)
  }
  console.info('结束了')
})()
