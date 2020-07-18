//https://www.jianshu.com/p/205057e6c16b

const http = require('http');
const {createReadStream} = require('fs');
const {join, extname} = require('path');

const root = join(__dirname, 'dist');

const render = require('./dist/umi.server');

const getContentType = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.png': 'image/jpeg'
};

http.createServer(async (req, res) =>
{

    const ext = extname(req.url);
    const header = {
        'Content-Type': getContentType[ext] || 'text/html'
    };
    res.writeHead(200, header);

    if (!ext)
    {
        console.log(req.url);
        // url render
        const context = {};
        const {html, error, rootContainer} = await render({
            // 有需要可带上 query
            path: req.url,
            context,
            // 可自定义 html 模板
            // htmlTemplate: defaultHtml,
            // 启用流式渲染
            // mode: 'stream',
            // html 片段静态标记（适用于静态站点生成）
            staticMarkup: true
            // 扩展 getInitialProps 在服务端渲染中的参数
            // getInitialPropsCtx: {},
            // manifest，正常情况下不需要
        });
        res.write(html);
        res.end();
    }
    else
    {
        // static file url
        const path = join(root, req.url);
        const stream = createReadStream(path);
        stream.on('error', (error) =>
        {
            console.log(error);

            res.writeHead(404, 'Not Found');
            res.end();
        });
        stream.pipe(res);
    }

}).listen(3000);