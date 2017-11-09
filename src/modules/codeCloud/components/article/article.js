import React, { Component } from 'react';
import userModel from './../../models/AbstractModel.js';
import PageManager from './../../core/PageManager.js';

import './article.css';
class article extends PageManager {

  constructor(props){
    super(props)

  }

  vocabulary(){
    this.props.history.push('vocabulary');
  }
  render() {


    return (
      <div className="article">

<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
  <div className="container">
    <a className="navbar-brand" href="index.html">Asia Tech</a>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">

      </ul>
    </div>
  </div>
</nav>



<header className="masthead">
  <div className="overlay"></div>
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
        <div className="post-heading">
          <h1>亚洲科技观察</h1>
          <h2 className="subheading">韩国、东南亚、印度</h2>
          <span className="meta">Posted by
            <a href="#" className="author">孙和</a>
            2017-11-03 18:11</span>              
        </div>
      </div>
    </div>
  </div>
</header>



<article>
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
        <p>我们的征途是星辰大海</p>

        <p></p>



        <a href="#">
          <img className="img-fluid" src={require('./post-image.jpg')} alt="" />
        </a>
        <span className="caption text-muted"></span>

      </div>
    </div>
  </div>
</article>

<hr />

<footer>
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
        <p className="copyright text-muted">Copyright &copy; He Sun 2017</p>
      </div>
    </div>
  </div>
</footer>
       
      </div>
    
    );
  }
}
export default article;
