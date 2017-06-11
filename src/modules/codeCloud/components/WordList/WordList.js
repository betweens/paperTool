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
  }
  componentWillMount() {
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
  render() {//需要访问当前上传文章的wordList
    if (this.state.isDataReady) return <Loading />;
    const itemData = this.state.wordLists;
    const dataLength = itemData.length;

   /* for(var i=0,len = dataLength;i<len;i+=10){
      result.push(data.slice(i,i+3));
    }*/
    const liItem = itemData.map((value, i) => {
      const checked = value.familiar
    return (
        <li onClick={() => { this.findWord(i); }}>
          <input id='label-1' type='checkbox' checked={checked}/>
          <label for='label-1'>
            <h2>{value.word}<span>{value.translation}</span>  <span>{value.wordLevel}</span>  <span>{value.wordFrequency}</span></h2>   
          </label>
        </li>
    )     
    });
    return (<div className="wordList">
      <h1><a href={this.pdfUrl} target="view_window">查看原文</a><span onClick={this.saveWordListsFn}>保存</span></h1>
       <div className="steps">
        <ul id="sortable">{liItem}</ul>
      </div>
    </div>);
  }
}
export default WordList;