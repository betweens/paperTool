import React, { Component } from 'react';
import userModel from './../../models/AbstractModel.js';
import './Login.css';
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.userNmaehandleChange = this.userNmaehandleChange.bind(this);
    this.pwdhandleChange = this.pwdhandleChange.bind(this);
    this.loginFn = this.loginFn.bind(this);
  }
  componentWillMount() {
    const isLogin = userModel.getCurrentUser();
    if (isLogin) {
      this.props.history.push('myAccount');
    } else {
      this.props.history.push('register');
    }
  }
  // 获取用户名
  userNmaehandleChange(event) {
    this.setState({username: event.target.value});
  }

  // 获取密码
  pwdhandleChange(event) {
    this.setState({password: event.target.value});
  }
  // 点击登录
  loginFn() {
    const {
      username,
      password
    } = this.state;

    if (username === '') {
      alert('用户名不能为空');
      return;
    }

    if (password === '') {
      alert('密码不能为空');
      return;
    }
    const params = {
      username,
      password,
    };
    userModel.userLogin(params, (data) => {
      this.props.history.push('main');
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    return (<div className="Login">
       <p><span>用户名:</span><input type="text" placeholder="输入用户名" onChange={this.userNmaehandleChange} /></p>
       <p><span>密码:</span><input type="password" placeholder="输入密码" onChange={this.pwdhandleChange} /></p>
       <div className="login-btn"><button type="button" onClick={this.loginFn}>登录</button><b type="button">注册</b></div>
    </div>);
  }
}
export default Login;