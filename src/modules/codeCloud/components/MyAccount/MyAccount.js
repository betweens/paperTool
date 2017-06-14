import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
  Loading,
  NavBar,
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
    this.props.history.push('wordList');//传入objectId
  }
  render() {
    // if (this.state.isDataReady) return <Loading />;
    const navBarData = {
      title: '论文助手',
      label: {
        text: '退出登陆',
        callback: () => {
          console.log('fuck');
        }
      },
      imgUrl: 'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png',
    }
    return (<div className="myAccount">
      <NavBar {...navBarData} />
    </div>);
  }
}
export default MyAccount;