import React, { Component } from 'react';
import userModel from './../../models/AbstractModel.js';
import { 
  Loading,
  NavBar,
  WordList,
  Taps,
} from './../../../../common/index.js';
import PageManager from './../../core/PageManager.js';
import './Vocabulary.css';
class Vocabulary extends PageManager {
  constructor(props){
    super(props)
    this.state = {
      isDataReady: true,
      wordType: 0,
    }
    this.userId = '';
    this.saveWordListsFn = this.saveWordListsFn.bind(this);
    this.initPagedata = this.initPagedata.bind(this);
    this.switchWordType = this.switchWordType.bind(this);
  }
  componentWillMount() {
    this.initPagedata();    
  }
  initPagedata() {
    const isLogin = userModel.getCurrentUser();
    if (!isLogin) {
      this.props.history.push('login');
      return;
    }
    this.userId=isLogin.id;
   // const wordList = window.localStorage.getItem('wordList');
   //  if (wordList) {
   //    let resultData = JSON.parse(wordList);
   //    resultData = resultData.result.wordList;
   //    this.setState({
   //      isDataReady: false,
   //      username: isLogin.attributes.username,
   //      wordLists: resultData
   //    });
   //  } else{
      this.getVocabulary(isLogin.id);
    // }
  }
  getVocabulary(userId) {
    const params = {
      userId: userId,//当前wordList的objectId
    };
    //getThisWordList，得到当前的WordList,而不是全部的
    userModel.getVocabulary(params, (data) => {
         this.setState({
          isDataReady: false,
          wordLists: data[0].attributes.VocabularyWordList,
        });
    }, (error) => {
      console.log(error);
    })
  }
  //保存单词
  saveWordListsFn() {
    const params = {
      userId: this.userId,
      wordList: this.state.wordLists,
    };
    userModel.updataVocabulary(params, (data) => {

    }, (error)=> {
      console.log(error);
    });
  }
  // 找到对应的单词
  findWord(index) {
    if(index !== '') {
      const temp = this.state.wordLists[index];
      temp.familiar?temp.familiar = false:temp.familiar = true;
      this.setState({
        wordList: this.state.wordLists,
      });
    }
  }
  // 退出登录
  logOutFn() {
    userModel.logOut();
    this.props.history.push('login');
  }
  // 移除页面
  componentWillUnmount() {
    window.localStorage.removeItem('paperId');
    window.localStorage.removeItem('wordList');
    window.localStorage.removeItem('WordListsId');
  }
  // 切换单词类型
  switchWordType(index) {
    if (index === this.state.wordType) return
      this.setState({
        wordType: index,  // 0全部  1 生词  2 熟词
      });
  }
  render() {
    //需要访问当前上传文章的wordList
    if (this.state.isDataReady) return <Loading />;
    const {
      wordLists,
      isShowloading,
      wordType,
    } = this.state;
    const tabData = {
      label: ['全部' ,'生词', '熟词'],
      callBack: (i) => {
        this.switchWordType(i);
      }
    }
    // 头部数据
    const navBarData = {
      title: '论文助手',
      label: {
        text: '退出登陆',
        callback: () => { this.logOutFn(); }
      },
      imgUrl: 'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png',
    };
    // 单词数据
    const wordListData = {
      wordLists,
      wordType: wordType,
      callback: (index) => this.findWord(index),
    }
    return (<div className="wordList">
      <NavBar {...navBarData} />
      <Taps {...tabData} />
      <WordList {...wordListData} />
      {isShowloading ? <Loading /> : null}
      <div className="save" onClick={this.saveWordListsFn}>保存</div>
    </div>);
  }
}
export default Vocabulary;
