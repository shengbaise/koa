const cp = require('child_process')
const {resolve} = require('path')

;(async() => {
  const script = resolve(__dirname, '../crawler/receipt')
  const child = cp.fork(script, [])
  let invoke = false

  child.on('error', err => {
    if (invoke) return

    invoke = true

    console.info(err)
  })

  // 进程退出的时候
  child.on('exit', code => {
    if (invoke) return
    invoke = true
    let err = code === 0 ? null : new Error('exit code ' + code)
    console.info(err, 'err')
  })

  child.on('message', data => {
    let result = data.result
    console.info(result)
  })
})()
