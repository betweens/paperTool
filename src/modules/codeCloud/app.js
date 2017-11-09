import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import AsiaTech from './components/AsiaTech';
import edit from './components/edit';
import article from './components/article';
import article1 from './components/article1';

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={AsiaTech}/>
      <Route path="/AsiaTech" component={AsiaTech} />
      <Route path="/edit" component={edit} />
      <Route path="/article" component={article} />
      <Route path="/article1" component={article1} />
      
    </div>
  </Router>
)
ReactDOM.render(<BasicExample /> , document.getElementById('app'));
