const http = require('http');
const fs = require('fs');

// ファイルの読み込み
// http.createServer(function (req, res) {
//   fs.readFile('./file.html', 'utf8', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(3000);

// ファイルの作成
// fs.appendFile('createFile.txt','ファイルを作成します\n', function(err) {
//   if (err) throw err;
//   console.log('保存しました。');
// });

// ファイルの作成
// 2番目の引数にフラグを持っていてフラグによって
// fs.open('openFile.txt','w', function(err) {
//   if (err) throw err;
//   console.log('保存しました。');
// });

// ファイルの作成
// fs.writeFile('createFile.txt','上書きしちゃう', function(err) {
//   if (err) throw err;
//   console.log('保存しました。');
// });

// ファイルの削除
// fs.unlink('createFile.txt', function(err) {
//   if (err) throw err;
//   console.log('削除しました。');
// });

// ファイル名の変更
fs.rename('./copyFile.txt', '../renameFile.txt', function(err) {
  if (err) throw err;
  console.log('名前を変更しました。');
});

// ファイルをコピーする
// fs.copyFile('./createFile.txt', './copyFile.txt', function(err) {
//   if (err) throw err;
//   console.log('コピーしました。');
// });