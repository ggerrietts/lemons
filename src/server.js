import koa from 'koa';
import kstatic from 'koa-static';
import path from 'path';

const app = koa();

app.use(kstatic(path.resolve(__dirname, 'public'))).listen(8888);
