import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './public/css/reset.css';
import Login from './components/Login';
import Register from './components/Register';
import MyAccount from './components/MyAccount';
import WordList from './components/WordList';
const BasicExample = () => (
  <Router>
    <div className="container-fluid">
      <Route exact path="/" component={Login}/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/myAccount" component={MyAccount} />
      <Route path="/wordList" component={WordList} />
    </div>
  </Router>
)
ReactDOM.render(<BasicExample /> , document.getElementById('app'));
