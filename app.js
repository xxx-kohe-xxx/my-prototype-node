const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');

const server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');

/* クライアントからの受付処理 */
function getFromClient (request, response) {
  const url_parts = url.parse(request.url, true);
  switch (url_parts.pathname) {
    case '/':
      response_index(request, response);
      break;

    case '/other':
      response_other(request, response);
      break;

    default:
      response.writeHead(200, { 'Content-Type': 'text/plain'});
      response.end('no page...');
      break;
  }
}

/* 追加するデータ用変数 */
let data = {
  'Taro': '09-000-0000-0000',
  'Hanako': '08-000-0000-0000',
  'Sachiko': '07-000-0000-0000',
  'Ichiro': '6-000-0000-0000',
}

/* indexアクセス時処理 */
function response_index(request, response) {
  const msg = 'これはindexページです';
  const content = ejs.render(index_page, {
    title: 'Indexページ',
    content: msg,
    data: data
  });
  response.writeHead(200, { 'Content-Type': 'text/html'});
  response.write(content);
  response.end();
}

/* otherアクセス時処理 */
function response_other(request, response) {
  let msg = 'これはOtherページです。';
  
  //POSTアクセス時の処理
  if (request.method == 'POST') {
    let body = '';

    // データ受信のイベント処理
    request.on('data', (data) => {
      body += data;
    });

    // データ受信終了のイベント処理
    request.on('end', () => {
      let post_data = qs.parse(body);
      console.log(post_data);
      msg += 'あなたは,｢' + post_data.msg + '｣と書きました';
      let content = ejs.render(other_page, {
        title: 'Other',
        content: msg,
      });
      response.writeHead(200, { 'Content-Type': 'text/html'});
      response.write(content);
      response.end();
    });
  // GETアクセス時の処理
  } else {
    let msg = 'ページがありません';

    let content = ejs.render(other_page, {
      title: 'Other',
      content: msg,
    });
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(content);
    response.end();
  }
}
