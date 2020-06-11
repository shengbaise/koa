const doSync = (sth, time) => new Promise(resolve => {
  setTimeout(() => {
    console.info(`${sth}用了，${time}秒`)
    resolve()
  }, time)
})

const doAsync = (sth, time,cb) => {
  setTimeout(() => {
    console.info(`${sth}用了，${time}秒`)
    cb && cb()
  }, time)
}

const doElse = (sth) => {
  console.info(sth)
}

const XiaoMing = { doSync, doAsync, doElse }
const XiaoHong = { doSync, doAsync, doElse }

;(async() => {
  console.info('case1: 小红来到门口--------------')
  await XiaoMing.doSync('小明刷牙', 1000)
  console.info('小红一直在等待')
  await XiaoHong.doSync('小红洗澡', 3000)
  XiaoHong.doElse('小红去干别的了')

  console.info('case2: 小红来到门口--------------')
  XiaoMing.doAsync('小明刷牙', 1000, () => {
    console.info('小明忙完了')
    XiaoHong.doAsync('小红洗澡', 3000)
  })
  XiaoHong.doElse('小红去干别的了')
})()
