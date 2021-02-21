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
// let data = {
//   'Taro': '09-000-0000-0000',
//   'Hanako': '08-000-0000-0000',
//   'Sachiko': '07-000-0000-0000',
//   'Ichiro': '6-000-0000-0000',
// }
// let data2 = {
//   'Taro': ['taro@yamada', '09-000-0000-0000', 'Tokyo'],
//   'Hanako': ['hanako@flower', '08-000-0000-0000', 'Yokohama'],
//   'Sachiko': ['sachi@happy', '07-000-0000-0000', 'Nagoya'],
//   'Ichiro': ['ichi@baseball', '06-000-0000-0000', 'USA'],
// }

let data = { msg: 'no message...' };

/* indexアクセス時処理 */
function response_index(request, response) {
  // POSTアクセス時の処理
  if (request.method == 'POST') {
    let body = '';

    // データ受信のイベント処理
    request.on('data', (data) => {
      body += data;
    });

    // データ受信終了のイベント処理
    request.on('end', () => {
      data = qs.parse(body);
      // クッキー保存
      setCookie('msg', data.msg, response);
      write_index(request, response);
    });
  } else {
    write_index(request, response);
  }
}

/* indexの表示の作成 */
function write_index(request, response) {
  var msg = "※伝言を表示します。"
  var cookie_data = getCookie('msg', request);
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
    cookie_data: cookie_data,
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
}

/* クッキーの値を設定 */
function setCookie(key, value, response) {
  let cookie = escape(value);
  response.setHeader('Set-Cookie', [key + '=' + cookie]);
}
/* クッキーの値を設定 */
function getCookie(key, request) {
  var cookie_data =
      request.headers.cookie != undefined ?
      request.headers.cookie : '';
  var data = cookie_data.split(';');
  for (var i in data) {
    if (data[i].trim().startsWith(key + '=')) {
      var result = data[i].trim().substring(key.length + 1);
      return unescape(result);
    }
  }
  return '';
}

/* otherアクセス時処理 */
// function response_other(request, response) {
//   let msg = 'これはOtherページです。';
//   let content = ejs.render(other_page, {
//     title: 'otherページ',
//     content: msg,
//     data: data2,
//     filename: 'data_item'
//   });
//   response.writeHead(200, {'Content-Type': 'text/html'});
//   response.write(content);
//   response.end();
// }
