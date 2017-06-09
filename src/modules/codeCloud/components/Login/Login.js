import React, { Component } from 'react';
import userModel from './../../models/AbstractModel.js';
import './Login.css';
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      mobilePhoneNumber: '',
      password: '',
    }
    this.userNmaehandleChange = this.userNmaehandleChange.bind(this);
    this.pwdhandleChange = this.pwdhandleChange.bind(this);
    this.loginFn = this.loginFn.bind(this);
  }
  componentWillMount() {
    const isLogin = userModel.getCurrentUser();
    if (isLogin) this.props.history.push('myAccount');   
  }
  // 获取用户名
  userNmaehandleChange(event) {
    this.setState({mobilePhoneNumber: event.target.value});
  }

  // 获取密码
  pwdhandleChange(event) {
    this.setState({password: event.target.value});
  }
  // 点击登录
  loginFn() {
    const {
      mobilePhoneNumber,
      password
    } = this.state;

    if (mobilePhoneNumber === '') {
      alert('用户名不能为空');
      return;
    }

    if (password === '') {
      alert('密码不能为空');
      return;
    }
    const params = {
      mobilePhoneNumber,
      password,
    };
    console.log(params);
    userModel.userLogin(params, (data) => {
      this.props.history.push('myAccount');
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    return (<div className="Login">
       {/*<p><span>用户名:</span><input type="number" placeholder="输入手机号" onChange={this.userNmaehandleChange} /></p>
              <p><span>密码:</span><input type="password" placeholder="输入密码" onChange={this.pwdhandleChange} /></p>
              <div className="login-btn"><button type="button" onClick={this.loginFn}>登录</button><b type="button">注册</b></div>*/}
    
    <div className="container">

      <ul className="tabs">
        <li><a href="#" id="1">登录</a></li>
        <li><a href="#" id="2">注册</a></li>
      </ul>


      <div className="form">
        <div className="input-container">
           <div className="input">
              <input className="main-form" type="text" name="usrname" placeholder=" 用户名" onChange={this.userNmaehandleChange}/>
           </div>

          <div className="input">
              <input className="main-form" type="password" name="password" placeholder=" 密码" onChange={this.pwdhandleChange}/>
          </div>

          <div className="input">
              <input className="main-form btn" type="button" name="usrname" value = "登录" onClick={this.loginFn}/>
          </div>

          <div className="input">
            <label className="pull-right">
              <a href="#" id="3" className="forget-password">忘记密码 ?</a>
            </label>
          </div>
        </div>
      </div>

    </div>

    </div>);
  }
}
export default Login;