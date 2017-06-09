var path = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;
ncp.limit = 16; // 最大复制数
const del = require('del');
const readFolderNamesSync = require('./searckfolder.js');
// 定义复制目标
var soruceReact = `.${path.sep}node_modules${path.sep}react${path.sep}dist${path.sep}react.min.js`;
var soruceReactDom = `.${path.sep}node_modules${path.sep}react-dom${path.sep}dist${path.sep}react-dom.min.js`;
var soruceReactRouter =  `.${path.sep}node_modules${path.sep}react-router-dom${path.sep}umd${path.sep}react-router-dom.min.js`;

// 如果编译目录不存在，创建此编译目录
if (!fs.existsSync('./dist/')) fs.mkdirSync('./dist/',function(){ console.log('./dist/:----创建成功'); }); 

// 删除目录下的文件
del('./dist/*', { dryRun: true }).then(paths => { console.log('删除文件目录:\n', paths.join('\n')); });
/*const folder = __dirname+'/src/modules';
// 查找模块数
const  FolderNames = readFolderNamesSync(folder.replace(/tools\//, ''));
 
console.log(FolderNames);
*/
 
if (!fs.existsSync('./dist/codeCloud/')) {
  fs.mkdirSync('./dist/codeCloud',function(){ console.log('./dist/codeCloud:----创建成功'); });  
}

if (!fs.existsSync('./dist/codeCloud/libs/')) {
  fs.mkdirSync('./dist/codeCloud/libs/',function(){ console.log('./dist/codeCloud/libs/:----创建成功'); });  
}

// 定义复制目录
var destination = './dist/codeCloud/libs/';
// 复制react.min.js
ncp(soruceReact, `${destination}react.min.js`, function (err) {
 if (err) return console.error(err);
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
 if (err) return console.error(err);
  console.log('复制react-router-dom.min.js成功');
});
 
 




 


 







