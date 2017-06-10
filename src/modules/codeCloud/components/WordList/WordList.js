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
  }
  componentWillMount() {
    const isLogin = userModel.getCurrentUser();
    if (!isLogin) {
      this.props.history.push('login');
      return;
    }
    
  /*  const params = {
      objectId: this.objectId,//当前wordList的objectId
    };
    //getThisWordList，得到当前的WordList,而不是全部的
    userModel.getThisWordList(params, (data) => {
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
    })*/
    const pdfUrl = window.localStorage.getItem('pdfUrl');
    this.createxmlhttp(pdfUrl);
  }

  createxmlhttp(url) {
    const self = this;
    const xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      let resultData = xmlhttp.responseText.replace(/NaN/g,'1');
      resultData = JSON.parse(resultData);
      resultData = resultData.result.wordList;
      console.log(resultData);
      self.setState({
        isDataReady: false,
        wordLists: resultData,
      });
     }
    }  
    xmlhttp.open("POST","http://218.193.131.250:54321",true);
    xmlhttp.send('p='+url);
  }

  viewPage(paperId){
//打开论文 URL
  }  
             
  render() {//需要访问当前上传文章的wordList
    if (this.state.isDataReady) return <Loading />;
    const itemData = this.state.wordLists;

    
    const liItem = itemData.map((value, i) => {
    return (
        <li>
          <input id='label-1' type='checkbox'/>
          <label for='label-1'>
            <h2>{value.word}<span>{value.translation}</span>  <span>{value.wordLevel}</span>  <span>{value.wordFrequency}</span></h2>   
          </label>
        </li>
    )     
    });
    return (<div className="flex-hrz wordList">
      <div className='view-paper' onClick={this.viewPage.bind()}>查看原文</div>
       <div className="steps">
        <ul id="sortable">{liItem}</ul>
      </div>
    </div>);
  }
}
export default WordList;