// 2.宏任务macrotask：

// （事件队列中的每一个事件都是一个macrotask）

// 优先级：主代码块 > setImmediate > MessageChannel > setTimeout / setInterval

// 比如：setImmediate指定的回调函数，总是排在setTimeout前面

// 3.微任务包括：

// 优先级：process.nextTick > Promise > MutationObserver


const {readFile} = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}
const yy = new EE()

yy.on('event', () => {
  console.log('执行事件A啊')
})

setTimeout(() => {
  console.log('执行0毫秒后的set time out')
}, 0)

setTimeout(() => {
  console.log('执行1000毫秒后的set time out')
}, 1000)

setTimeout(() => {
  console.log('执行2000毫秒后的set time out')
}, 2000)

readFile('../../package.json', 'utf-8', data => {
  console.info('读取文件package.json')
})

readFile('../../README.md', 'utf-8', data => {
  console.info('读取文件README.md')
})

setImmediate(() => {
  console.info('执行setImmediate')
})

process.nextTick(() => {
  console.info('执行process.nextTick第一次回调')
})

Promise.resolve().then(() => {
  yy.emit('event')
  process.nextTick(() => {
    console.info('执行process.nextTick第二次回调')
  })
  console.info('promse的第一次回调')
})
.then(() => {
  console.info('promse的第二次回调')
})

// 执行process.nextTick第一次回调
// 执行事件A啊
// 执行process.nextTick第二次回调
// promse的第一次回调
// promse的第二次回调
// 执行0毫秒后的set time out
// 执行1000毫秒后的set time out
// 执行2000毫秒后的set time out
// 执行setImmediate

