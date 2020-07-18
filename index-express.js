const express = require('express');
const stream = require('stream');

const app = express();
const port = 3000;

app.use(async (req, res) =>
{
    const render = require('./dist/umi.server');

    //res.setHeader('Content-Type', 'text/html');

    const context = {req, res};
    const {html, error, rootContainer} = await render({
        // 有需要可带上 query
        path: req.url,
        context
        // 可自定义 html 模板
        // htmlTemplate: defaultHtml,
        // 启用流式渲染
        // mode: 'stream',
        // html 片段静态标记（适用于静态站点生成）
        // staticMarkup: false,
        // 扩展 getInitialProps 在服务端渲染中的参数
        // getInitialPropsCtx: {},
        // manifest，正常情况下不需要
    });

    console.log(typeof html, req.url);

    if (error)
    {
        console.error(error);
    }

    if (typeof html === 'string')
    {
        console.log('Rendering string content');
        res.send(html);
    }
    else
    {
        console.log('piping...');
        res.pipe(html);
        html.on('end', () =>
        {
            res.end();
        });
    }
});

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));