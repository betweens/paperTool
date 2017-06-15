import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
  Loading,
  NavBar,
  WordLine,
} from './../../../../common/index.js';
import userModel from './../../models/AbstractModel.js';
import './MyAccount.css';
class MyAccount extends Component {
  constructor(props){
    super(props)
    this.state = {
      isDataReady: true,
      fileName: '',
    }
    this.userId = '';
    this.uploadFile = this.uploadFile.bind(this);
    this.logOutFn = this.logOutFn.bind(this);
    this.viewWordList = this.viewWordList.bind(this);
    this.getPaperList = this.getPaperList.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }
  componentWillMount() {
    this.getPaperList();
  }
  // 获取用户上传的论文列表
  getPaperList() {
    const isLogin = userModel.getCurrentUser();
    if (!isLogin) {
      this.props.history.push('login');
      return;
    }
    this.userId = isLogin.id;
    const params = {
      objectId: this.userId,
    };
    userModel.getPaperList(params, (data) => {

      if (data.length > 0) {
              console.log(data);
         this.setState({
          isDataReady: false,
          username: isLogin.attributes.username,
          wordLists: data,
        })
      } else {
        this.setState({
          isDataReady: false,
        })
      }
    }, (error) => {
      console.log(error);
    });
  }
  // 上传论文
  uploadFile() {
    this.setState({isDataReady: true });
    const fileInput = ReactDOM.findDOMNode(this.refs.paperFile);
    if (fileInput.files.length > 0) {
      const params ={
        localFile: fileInput.files[0],
        name: fileInput.files[0].name
      }
      userModel.uploadFile(params, (progress) => {
        console.log(progress.loaded);
      }, (file) => {
        this.savePaperFile(file.url(), file.attributes.name);
      }, (error) => {
        console.log(error);
      }) 
    }
  }
  // 保存上传的作品
  savePaperFile(fileUrl, name) {
    const params = {
      userId: this.userId,
      paperTitle: name,
      fileUrl,
    };
    userModel.savePaper(params, (data) => {
      window.localStorage.setItem('pdfUrl', fileUrl);
      //this.props.history.push('wordList');
    },(error) => {
      console.log(error);
    });
  }
  // 退出登录
  logOutFn() {
    userModel.logOut();
    this.props.history.push('login');
  }
  // 查看属于此论文的单词列表
  viewWordList(objectId){
    this.props.history.push('wordList11');//传入objectId
  }
  // 选择文件事件
  changeInput(e) {
    const obj = e.target.files;
    if (obj.length > 0) {
      this.setState({
        fileName: obj[0].name, 
      });
    }
  }
  // 打开pdf预览
  openNewView(url) {
    if(url) window.open(url,'_blank');
  }
  // 格式化日期
  formatDate(date, formater) {
    // 不是Date类型，formater不是string的一律返回空字符串
    if (!(date instanceof Date) || (typeof formater !== 'string')) {
      return '';
    }
    // 默认是'yyyy-MM-dd'格式
    formater = formater || 'yyyy-MM-dd';
    const o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds(), // millisecond
    };
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (/(y+)/.test(formater)) {
      formater = formater.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(w+)/.test(formater)) {
      formater = formater.replace(RegExp.$1, week[date.getDay()]);
    }

    for (const k of Object.keys(o)) {
      if (new RegExp('(' + k + ')').test(formater)) {
        formater = formater.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return formater;
  }
  render() {
    if (this.state.isDataReady) return <Loading />;
    const {
      fileName,
      username,
      wordLists = [],
    } = this.state;
    // 头部数据
    const navBarData = {
      title: '论文助手',
      label: {
        text: '退出登陆',
        callback: () => { this.logOutFn(); }
      },
      imgUrl: 'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png',
    };
    // 论文列表
    const wordLineData = [];
    wordLists.map(value => {
      const temp = {
        time: this.formatDate(value.createdAt, 'yyyy-MM-dd'),
        paperTitle: value.attributes.paperTitle,
        content: 'Apple penApple penApple penApple penApple penApple penApple penApple Apple penApple penApple penApple penApple penApple penApple penApple',
        btns: [{
          label: '查看全文',
          callback: () => { this.openNewView(value.attributes.fileUrl); }
        }, {
          label: '查看单词',
          callback: () => { this.viewWordList(value.id); }
        }],
      };
      wordLineData.push(temp);
    });
    return (<div className="my-account">
      <NavBar {...navBarData} />
      <section className="flex-hrz">
        <div className="left">
          <div className="user-car">
            <img className="user-img" src="http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png" />
            <h1>{username}</h1>
            <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>上海</span><span>复旦大学IMBA</span></p>
          </div>
          <ul className="flex-hrz paper-info">
            <li className="flex-full"><p>上传篇数</p><p className="number">1w</p></li>
            <li className="flex-full border-left-line"><p>单词数</p><p className="number">20w</p></li>
          </ul>
          <div className="flex-hrz upload-paper">
            <label className="flex-full">
              <span>{fileName}</span>
              <input type="file" ref="paperFile"  onChange={this.changeInput}/>
            </label>
            <div className="flex-init file-btn"><i className="iconfont icon-shangchuan1"></i><span onClick={this.uploadFile}>上传</span></div>
          </div>
        </div>
        <div className="flex-full right"><WordLine items={wordLineData} /></div>
      </section>
    </div>);
  }
}

export default MyAccount;
