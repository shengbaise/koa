const Router = require('koa-router')
const router = new Router()

router.get('/movies/all', (ctx, next) => {
  ctx.body = {
    list: [
      {
        doubanId: '9812312'
      }
    ]
  }
})

module.exports = router