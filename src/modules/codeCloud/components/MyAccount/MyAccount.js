import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';
import { Store } from 'simple_localstorage_api';
import userModel from './../../models/AbstractModel.js';
import './MyAccount.css';
const store = new Store(); // default is window.localStorage
class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
    	isDataReady: true,
    }
    this.userId = '';
    this.uploadFile = this.uploadFile.bind(this);
  }
  componentWillMount() {
    const isLogin = userModel.getCurrentUser();
    this.userId = isLogin.id;
    const params = {
      objectId: this.userId,
    };
    userModel.getWordList(params, (data) => {
      console.log(data.length );
      if (data.length > 0) {
         const wordLists = [];
         data.map((item) => {
          wordLists.push(item.attributes.wordList)
         });
         this.setState({
          isDataReady: false,
          info: false,
          wordLists,
        })
      } else {
        this.setState({
          isDataReady: false,
          info: '空',
        })
      }
    }, (error) => {
      console.log(error);
    })
    store.set('test',{key: 'ddd', id: [1,2,3,4]});
  }
  uploadFile() {
    console.log(store.find('test'));
   /* const params = {
      userId: this.userId,
      show: 1,
      paperId: 'fdfdf',
      wordList: [{
        "word": 'apple',
        "translation":"苹果",
        "wordLevel":["4","6","gre"],
        "wordFrequency":"311/2001",   
      }]
    };*/
    const fileInput = ReactDOM.findDOMNode(this.refs.photoFileUpload);
      if (fileInput.files.length > 0) {
        const params ={
          localFile: fileInput.files[0],
          name: fileInput.files[0].name
        }
        userModel.uploadFile(params, (progress) => {
          console.log(progress.loaded / progress.total);
        }, (file) => {
          console.log(file);
        }, (error) => {
          console.log(error);
        }) 
      }
  
    
  /*  userModel.saveWordLists(params, (data) => {
      this.setState({
        wordList: data.attributes.wordList,
        info: false,
      })
    }, (error) => {
      console.log(error);
    });*/
  }
 
  render() {
  	if (this.state.isDataReady) return null;
    const {
      wordList = [],
      wordLists = [],
      info,
    } = this.state;
    const list1 = wordLists.map((item, i) => {
      const liItem = item.map(value => {
        return <li key={i}><p>{item.word}</p><p>{item.translation}</p><p>{item.wordLevel}</p><p>{item.wordFrequency}</p></li>       
      });
      return liItem;
    });
    const list2 = wordList.map((item, i) => {
      return <li key={i}><p>{item.word}</p><p>{item.translation}</p><p>{item.wordLevel}</p><p>{item.wordFrequency}</p></li>
    });
    return (<div className="container-content">
      <h1>{info || null}</h1>
      <div className="wordLists"><ul>{list1}</ul></div>
      <div className="wordLists"><ul>{list2}</ul></div>
      <input type="file" ref="photoFileUpload" />
      <div className="upload" onClick={this.uploadFile}>上传</div>
    </div>);
  }
}
export default Main;