var path = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;
const del = require('del');
if (!fs.existsSync('./dist/')) {
  fs.mkdirSync('./dist/',function(){
    console.log('./dist/:----创建成功');
  }); 
}

if (!fs.existsSync('./dist/codeCloud/')) {
  fs.mkdirSync('./dist/codeCloud',function(){
    console.log('./dist/codeCloud:----创建成功');
  }); 
}

del('./dist/codeCloud/*', { dryRun: true }).then(paths => {
    console.log('删除文件目录:\n', paths.join('\n'));
});

ncp.limit = 16;

var destination = './dist/codeCloud/libs/';
var soruceReact = `.${path.sep}node_modules${path.sep}react${path.sep}dist${path.sep}react.min.js`;
var soruceReactDom = `.${path.sep}node_modules${path.sep}react-dom${path.sep}dist${path.sep}react-dom.min.js`;
var soruceReactRouter =  `.${path.sep}node_modules${path.sep}react-router-dom${path.sep}umd${path.sep}react-router-dom.min.js`;
// var requestLibrary = `.${path.sep}node_modules${path.sep}superagent${path.sep}superagent.js`

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination,function(){
  	console.log('创建成功');
  });
}
// 复制react.min.js
ncp(soruceReact, `${destination}react.min.js`, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('复制react.min.js成功');
});
// 复制 react-dom.min.js
ncp(soruceReactDom, `${destination}react-dom.min.js`, function (err) {
 if (err) {
   return console.error(err);
 }
  console.log('复制react-dom.min.js成功');
});

// 复制 react-router-dom.min.js
ncp(soruceReactRouter, `${destination}react-router-dom.min.js`, function (err) {
 if (err) {
   return console.error(err);
 }
  console.log('复制react-router-dom.min.js成功');
});

/*// 复制 superagent.js
ncp(requestLibrary, `${destination}superagent.js`, function (err) {
 if (err) {
   return console.error(err);
 }
  console.log('复制superagent.js成功');
});*/