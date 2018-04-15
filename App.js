const Koa = require('koa');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const router = require('koa-router')();
const serve = require('koa-static');
const koaBody = require('koa-body');
const app = new Koa();

const compiler = webpack(webpackConfig);

global.log = console.log;

    
/**
 * 转码指定的html页面
 */
router.post('/decode',async (ctx,next)=>{
    let {request,response} = ctx;
    let {path,query,body} = request;
    const htmlDecode = require('./service/htmlDecode');
    let resObj = await htmlDecode(body);
    response.body = resObj;
});

app.use(koaBody());
app.use(router.routes());

// app.use(devMiddleware(compiler));
// app.use(hotMiddleware(compiler));

// app.use(serve(__dirname + "./html/", {extensions: ['html']}));

app.listen(3000, () => {
   log('app listen at 3000')
});