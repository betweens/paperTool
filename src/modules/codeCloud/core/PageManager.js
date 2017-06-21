import React, {
  Component,
} from 'react';
 
// 页面管理类
class PageManager extends Component {
  constructor(props) {
	  super(props);
	  this.forward = this.forward.bind(this);
	  this.routerHistory = this.props.history;
	  this.routerMatch= this.props.match;
  }
  componentWillMount() {
     console.log(this);
  }
  // 页面向前跳转
  forward(viewPath, option) {
  	console.log(this);
    this.routerHistory.push(viewPath);
  }
  // 返回
  back() {
  	this.routerHistory.goBack();
  }
  getQuery() {
    return this.routerMatch.params
  }
   /**
   * 获取PageManager单例对象
   */
 /* static getInstance() {
    if (!this.instance || !(this.instance instanceof PageManager)) {
      this.instance = new this();
    }
    return this.instance;
  }*/
}

export default PageManager;