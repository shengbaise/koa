/**
 * [limit promise并发几个进程轮询执行]
 * @param  {[type]}   arr      [description]
 * @param  {Function} fn       [description]
 * @param  {Number}   limit    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
async function limit (arr, fn, limit = 5, callback) {
  let max = 0
  let dones = 0
  let next = 0
  function run (item, i) {
    next++
    if (next >= arr.length) return
    fn.bind(this, item, i, arr)().then(() => {
      return callback && typeof callback === 'function' ? callback.call(this, item, i, arr) : Promise.resolve(item, i, arr)
    }).catch(err => {
      throw new Error(err)
    }).finally(() => {
      console.log('next', next, arr.length)
      dones = dones + 1
      if (next < arr.length) {
        run(arr[next], next)
      }
    })
  }
  arr.slice(0, limit).forEach((item, i) => {
    run(item, i)
  })
}
