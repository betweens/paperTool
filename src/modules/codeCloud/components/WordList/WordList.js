import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import userModel from './../../models/AbstractModel.js';
import './WordList.css';
class WordList extends Component {
  constructor(props){
    super(props)
    this.state = {
    	isDataReady: true,
    }
    this.userId = '';
  }
  componentWillMount() {
   const listData = {
    "code":"0000",
    "wordList":[{
        "word":"apple",
        "translation":"苹果",
        "wordLevel":["4","6","gre"],
        "wordFrequency":"311/2001",                 
      }, {
        "word":"apple",
        "translation":"苹果",
        "wordLevel":["4","6","gre"],
        "wordFrequency":"311/2001",       
      }, {
        "word":"apple",
        "translation":"苹果",
        "wordLevel":["4","6","gre"],
        "wordFrequency":"311/2001",    
      }]
    }

    this.setState({
      list: listData.wordList,
    })
  }

  render() {
  	// if (this.state.isDataReady) return null;
    const { list } = this.state;
    const li = list.map((item, key) => {
      return (
        <li>
          <p><span>单词:</span><b>{item.word}</b></p>
          <p><span>释义:</span><b>{item.translation}</b></p>
          <p><span>等级:</span><b>{item.wordLevel}</b></p>
          <p><span>词频:</span><b>{item.wordFrequency}</b></p>
        </li>)
    }); 
    return (<div className="wordList">

      <ul>{li}</ul>
    </div>);
  }
}
export default WordList;