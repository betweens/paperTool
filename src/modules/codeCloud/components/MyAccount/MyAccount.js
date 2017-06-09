import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
  }
  componentWillMount() {
    const isLogin = userModel.getCurrentUser();
    if (!isLogin) {
      this.props.history.push('login');
      return;
    }
    this.userId = isLogin.id;
    const params = {
      objectId: this.userId,
    };
    userModel.getWordList(params, (data) => {
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
    })
  }
  uploadFile() {
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
          alert(file.attributes.url)
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
  // 推出登录
  logOutFn() {
    userModel.logOut();
    this.props.history.push('login');
  }
  render() {
    if (this.state.isDataReady) return null;
    const {
      wordLists = [],
      username,
    } = this.state;
    const list = wordLists.map((item) => {
      const itemData = item.attributes.wordList;
      const liItem = itemData.map((value, i) => {
      return (<li>
        <p><span>单词:</span><b>{value.word}</b></p>
        <p><span>释义:</span><b>{value.translation}</b></p>
        <p><span>等级:</span><b>{value.wordLevel}</b></p>
        <p><span>词频:</span><b>{value.wordFrequency}</b></p>
        </li>)     
      });
      return liItem;
    });
    return (<div className="myAccount">
      <div className="wordLists"><ul>{list}</ul></div>
 


    <div className="myAccount-timeline">

      <header>
        <div className="">
          <h1 className="logo">
            论文<span>助手</span>
            <div className="upload"><input type="file" ref="photoFileUpload" /><span onClick={this.uploadFile}>上传</span></div>
          </h1>
          <section className="social" onClick={this.logOutFn}>
            <a className="btn" href="">{username}退出登录</a>
          </section>
        </div>
      </header>

      <div className="upload-history">
        <h1 className="project-name">阅读记录</h1>
        <div id="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">


            </div>
            <div className="timeline-content">
              <h2>20170701 Capital Market</h2>
              <p>
                Apple Answer
              </p>
              <a href="#" className="btn">查看</a>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">


            </div>
            <div className="timeline-content right">
              <h2>LOREM IPSUM DOLOR</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, facilis quo. Maiores magnam modi ab libero praesentium blanditiis consequatur aspernatur accusantium maxime molestiae sunt ipsa.
              </p>
              <a href="#" className="btn">button</a>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">


            </div>
            <div className="timeline-content">
              <h2>LOREM IPSUM DOLOR</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, facilis quo. Maiores magnam modi ab libero praesentium blanditiis consequatur aspernatur accusantium maxime molestiae sunt ipsa.
              </p>
              <a href="#" className="btn">button</a>
            </div>
          </div>


          <div className="timeline-item">
            <div className="timeline-icon">


            </div>
            <div className="timeline-content right">
              <h2>LOREM IPSUM DOLOR</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, facilis quo. Maiores magnam modi ab libero praesentium blanditiis consequatur aspernatur accusantium maxime molestiae sunt ipsa.
              </p>
              <a href="#" className="btn">button</a>
            </div>
          </div>


          <div className="timeline-item">
            <div className="timeline-icon">


            </div>
            <div className="timeline-content">
              <h2>LOREM IPSUM DOLOR</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, facilis quo. Maiores magnam modi ab libero praesentium blanditiis consequatur aspernatur accusantium maxime molestiae sunt ipsa.
              </p>
              <a href="#" className="btn">button</a>
            </div>
          </div>

        </div>
      </div>

    </div>

    </div>);
  }
}
export default MyAccount;