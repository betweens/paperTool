import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './public/style.js';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import MyWordList from './components/MyWordList';
import Vocabulary from './components/Vocabulary';
import EditProfile from './components/EditProfile';
import Moments from './components/Moments';
import ViewPersonalAccount from './components/ViewPersonalAccount';
import AllMoments from './components/AllMoments';
//说明：login 和 register之后，都进入myAccount,myAccount查wordLists表，并关联File表，列出当前用户的所有wordList和每个wordList的PDF链接
//点击相应的单词表，进入wordList页面，列出每个wordList的所有单词
//在myAccount页面点击上传，将PDF存储起来，将返回的wordList存入wordLists表，并和File建立关联，>>>>跳转到wordList页面，列出当前wordList的所有单词
const BasicExample = () => (
  <Router>
    <div className="container-fluid">
      <Route exact path="/" component={Login}/>
      <Route path="/login" component={Login} />
      <Route path="/myAccount" component={MyAccount} />
      <Route path="/myWordList/:paperId" component={MyWordList} />
      <Route path="/vocabulary" component={Vocabulary} />
      <Route path="/editProfile" component={EditProfile} />
      <Route path="/moments" component={Moments} />
      <Route path="/viewPersonalAccount" component={ViewPersonalAccount} />
      <Route path="/allMoments" component={AllMoments} />
    </div>
  </Router>
)
ReactDOM.render(<BasicExample /> , document.getElementById('app'));
