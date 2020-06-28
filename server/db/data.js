/**
 * [limit promise并发几个进程轮询执行]
 * @param  {[type]}   arr      [description]
 * @param  {Function} fn       [description]
 * @param  {Number}   limit    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
async function limit (arr, fn, limit = 5, callback) {
  console.info('开始执行 limit', fn)
  let max = 0
  let dones = 0
  let next = 0
  function run (item, i) {
    console.info('执行 run函数', next, arr.length)
    next++
    console.info('执行 run函数', next, arr.length)
    if (next >= arr.length) return
    fn(item)
    // fn.bind(this, item, i, arr)().then(() => {
    //   console.info('1111111')
    //   return callback && typeof callback === 'function' ? callback.call(this, item, i, arr) : Promise.resolve(item, i, arr)
    // }).catch(err => {
    //   throw new Error(err)
    // }).finally(() => {
    //   console.log('next', next, arr.length)
    //   dones = dones + 1
    //   if (next < arr.length) {
    //     run(arr[next], next)
    //   }
    // })
  }
  arr.slice(0, limit).forEach((item, i) => {
    console.info('啊 哈哈哈')
    run(item, i)
  })
}

module.exports = {limit}
