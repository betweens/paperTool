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
        /*<li>
                  <p><span>单词:</span><b>{item.word}</b></p>
                  <p><span>释义:</span><b>{item.translation}</b></p>
                  <p><span>等级:</span><b>{item.wordLevel}</b></p>
                  <p><span>词频:</span><b>{item.wordFrequency}</b></p>
                </li>*/
  render() {
    // if (this.state.isDataReady) return null;
    const { list } = this.state;
    const li = list.map((item, key) => {
      return (
          <li>
            <input id='label-1' type='checkbox'/>
            <label for='label-1'>
              <h2>{item.word}<span>{item.translation}</span>  <span>{item.wordLevel}</span>  <span>{item.wordFrequency}</span></h2>   
            </label>
          </li>
      )


    }); 
    return (<div className="flex-hrz wordList">

<div className='view-paper'>查看原文</div>
 <div className="steps">
  <ul id="sortable">

    {li}
    <li>
      <input id='label-2' type='checkbox' checked/>
      <label for='label-2'>
        <h2>Team Session <span>Lorem ipsum dolor</span></h2>   
      </label>
    </li>
    
    <li>
      <input id='label-3' type='checkbox'/>
      <label for='label-3'>
        <h2>Watch Movie <span>Lorem ipsum dolor</span></h2>   
      </label>
    </li>
    
    <li>
    <input id='label-4' type='checkbox'/>
     <label for='label-4'>
        <h2>Date with babe <span>Lorem ipsum dolor</span></h2>   
      </label>
    </li>
    
    <li>
     <input id='label-5' type='checkbox'/>
     <label for='label-5'>
        <h2>Jogging at Ayala<span>Lorem ipsum dolor</span></h2>   
      </label>
    </li>

    <li>
     <input id='label-5' type='checkbox'/>
     <label for='label-5'>
        <h2>Jogging at Ayala<span>Lorem ipsum dolor</span></h2>   
      </label>
    </li>


    <li>
     <input id='label-5' type='checkbox'/>
     <label for='label-5'>
        <h2>Jogging at Ayala<span>Lorem ipsum dolor</span></h2>   
      </label>
    </li>
    
  </ul>
</div>







  <div className="comments-container">
    <h1>论文评论 <a href="http://creaticode.com"></a></h1>

    <ul id="comments-list" className="comments-list">
      <li>
        <div className="comment-main-level">

          <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>

          <div className="comment-box">
            <div className="comment-head">
              <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">金融</a></h6>
              <span>hace 20 minutos</span>
              <i className="fa fa-reply"></i>
              <i className="fa fa-heart"></i>
            </div>
            <div className="comment-content">
              J金融论文
            </div>
          </div>
        </div>

        <ul className="comments-list reply-list">
          <li>
  
            <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
        
            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
                <span>hace 10 minutos</span>
                <i className="fa fa-reply"></i>
                <i className="fa fa-heart"></i>
              </div>
              <div className="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
              </div>
            </div>
          </li>

          <li>

            <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>

            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
                <span>hace 10 minutos</span>
                <i className="fa fa-reply"></i>
                <i className="fa fa-heart"></i>
              </div>
              <div className="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
              </div>
            </div>
          </li>
        </ul>
      </li>

      <li>
        <div className="comment-main-level">

          <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
          <div className="comment-box">
            <div className="comment-head">
              <h6 className="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
              <span>hace 10 minutos</span>
              <i className="fa fa-reply"></i>
              <i className="fa fa-heart"></i>
            </div>
            <div className="comment-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

    </div>);
  }
}
export default WordList;