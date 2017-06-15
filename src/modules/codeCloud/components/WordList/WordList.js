import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Loading } from './../../../../common/index.js';
import userModel from './../../models/AbstractModel.js';
import './WordList.css';
class WordList extends Component {
  constructor(props){
    super(props)
    this.state = {
      isDataReady: true,
    }
    this.userId = '';
    this.createxmlhttp = this.createxmlhttp.bind(this);
    this.saveWordListsFn = this.saveWordListsFn.bind(this);
    this.initPagedata = this.initPagedata.bind(this);
  }
  componentWillMount() {
    // this.initPagedata();
  }
  initPagedata() {
    const isLogin = userModel.getCurrentUser();
    if (!isLogin) {
      this.props.history.push('login');
      return;
    }
    const pdfUrl = window.localStorage.getItem('pdfUrl');
    const paperId = window.localStorage.getItem('paperId');
    if (pdfUrl) {
       this.pdfUrl = pdfUrl;
       this.createxmlhttp(pdfUrl);
    } else if(paperId) {
      this.paperId = paperId;
      this.getWordListsFn(paperId);
    } else {
      alert('无法获取地址');
    }
  }
  getWordListsFn() {
    const params = {
      objectId: this.objectId,//当前wordList的objectId
    };
    //getThisWordList，得到当前的WordList,而不是全部的
    userModel.getThisWordList(params, (data) => {
       window.localStorage.removeItem('paperId');
      if (data.length > 0) {
         this.setState({
          isDataReady: false,
          username: isLogin.attributes.username,
          wordLists: data.attributes.wordList,
        })
      } else {
        this.setState({
          isDataReady: false,
        })
      }
    }, (error) => {
      console.log(error);
    })
  }
  createxmlhttp(url) {
    const self = this;
    const xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      window.localStorage.removeItem('pdfUrl');
      let resultData = xmlhttp.responseText.replace(/NaN/g,'1');
      resultData = JSON.parse(resultData);
      console.log(resultData);
      resultData = resultData.result.wordList;
      self.setState({
        isDataReady: false,
        wordLists: resultData,
      });
     }
    }  
    xmlhttp.open("POST","http://218.193.131.250:54321",true);
    xmlhttp.send('p='+url);
  }
 
  //保存单词
  saveWordListsFn() {
    const params = {
      userId: this.userId,
      show: true,
      paperId: this.paperId,
      wordList: this.state.wordLists,
    };
    userModel.saveWordLists(params, (data) => {
      console.log(data);
    }, (error)=> {
      console.log(error);
    });
  }
  // 找到对应的单词
  findWord(index) {
    if(index !== '') {
      const temp = this.state.wordLists[index];
      temp.familiar = true;
    }
  }   
  render() {
    //需要访问当前上传文章的wordList
    // if (this.state.isDataReady) return <Loading />;
    return (<div className="wordList">
       
    </div>);
  }
}
export default WordList;
