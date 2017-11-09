import React, { Component } from 'react';
import userModel from './../../models/AbstractModel.js';
import PageManager from './../../core/PageManager.js';

import './AsiaTech.css';
class AsiaTech extends PageManager {

  constructor(props){
    super(props)

  }

  article1(){
    this.props.history.push('article1');
  }
  render() {


    return (
<div className="AsiaTech">
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
            <div className="site-heading">
              <h1>Asia Tech</h1>
              <span className="subheading">亚洲科技观察</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          
          
          
          <div className="post-preview">
            <a href="http://www.baijingapp.com/article/13314">
              <h2 className="post-title">
                新加坡二手电商Carousell完成7000万美元C轮融资
              </h2>
              <h6 className="post-subtitle">
                新加坡创业公司 Carousell 近期完成了 7000 万至 8000 万美元的 C 轮融资。Carousell 于 2012 年由新加坡国立大学的 3 名学生创办
              </h6>
            </a>
            <p className="post-meta">Posted by
              <a href="#" className="author">孙和</a>
              2017-11-03 18:11</p>
          </div>
          <hr />

          
          <div className="post-preview" onClick={this.article1.bind(this)}>
            <span>
              <h2 className="post-title">
                亚洲科技观察
              </h2>
              <h6 className="post-subtitle">
                韩国、东南亚、印度
              </h6>
            </span>
            <p className="post-meta">Posted by
              <a href="#" className="author">He Sun</a>
              2017-11-03 18:11</p>
          </div>
          <hr />



        </div>
      </div>
    </div>

    

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
export default AsiaTech;
