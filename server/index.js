const Koa = require('koa')
const session = require('koa-session')
const logger = require('koa-logger')
const router = require('./routes')
const app = new Koa()

app.keys = ['hi yishuo']

app.use(logger())
app.use(session(app))
app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    let n = ctx.session.views || 0
    ctx.session.views = ++n
    ctx.body = `${n}次`
  } else if (ctx.path === '/hi') {
    ctx.body = 'hi yishuo'
  } else {
    ctx.body = '404'
  }
})
app.listen(3333)
