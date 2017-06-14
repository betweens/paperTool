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
    }
    this.userId = '';
    this.uploadFile = this.uploadFile.bind(this);
    this.logOutFn = this.logOutFn.bind(this);
    this.viewWordList = this.viewWordList.bind(this);
    this.getPaperList = this.getPaperList.bind(this);
  }
  componentWillMount() {
  // this.getPaperList();
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
    const fileInput = ReactDOM.findDOMNode(this.refs.photoFileUpload);
    if (fileInput.files.length > 0) {
      const params ={
        localFile: fileInput.files[0],
        name: fileInput.files[0].name
      }
      userModel.uploadFile(params, (progress) => {
        console.log(progress.loaded);
      }, (file) => {
        console.log(file.url());
        window.localStorage.setItem('pdfUrl', file.url());
        this.props.history.push('wordList');
      }, (error) => {
        console.log(error);
      }) 
    }
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
  render() {
    // if (this.state.isDataReady) return <Loading />;
    // 头部数据
    const navBarData = {
      title: '论文助手',
      label: {
        text: '退出登陆',
        callback: () => {
          console.log('fuck12');
        }
      },
      imgUrl: 'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png',
    }
    // 论文列表
    const wordLineData = [{
      time: '16小时前',
      paperTitle: 'Apple Pen',
      content: 'Apple penApple penApple penApple penApple penApple penApple penApple Apple penApple penApple penApple penApple penApple penApple penApple',
      btns: [{
        label: '查看全文',
        callback: () => {
          console.log('查看全文');
        }
      }, {
        label: '查看单词',
        callback: () => {
          console.log('查看单词');
        }
      }],
    }, {
      time: '16小时前',
      paperTitle: 'Apple Pen',
      content: 'Apple penApple penApple penApple penApple penApple penApple penApple Apple penApple penApple penApple penApple penApple penApple penApple',
      btns: [{
        label: '查看全文',
        callback: () => {
          console.log('查看全文');
        }
      }, {
        label: '查看单词',
        callback: () => {
          console.log('查看单词');
        }
      }],
    }, {
      time: '16小时前',
      paperTitle: 'Apple Pen',
      content: 'Apple penApple penApple penApple penApple penApple penApple penApple Apple penApple penApple penApple penApple penApple penApple penApple',
      btns: [{
        label: '查看全文',
        callback: () => {
          console.log('查看全文');
        }
      }, {
        label: '查看单词',
        callback: () => {
          console.log('查看单词');
        }
      }],
    }, {
      time: '16小时前',
      paperTitle: 'Apple Pen',
      content: 'Apple penApple penApple penApple penApple penApple penApple penApple Apple penApple penApple penApple penApple penApple penApple penApple',
      btns: [{
        label: '查看全文',
        callback: () => {
          console.log('查看全文');
        }
      }, {
        label: '查看单词',
        callback: () => {
          console.log('查看单词');
        }
      }],
    }];
    return (<div className="my-account">
      <NavBar {...navBarData} />
      <section className="flex-hrz">
        <div className="left">
          <div className="user-car">
          <h1>孙和</h1>
          <p><i className="iconfont icon-coordinates_fill"></i></p>
          </div>
        </div>
        <div className="flex-full right"><WordLine items={wordLineData} /></div>
      </section>
    </div>);
  }
}

export default MyAccount;
