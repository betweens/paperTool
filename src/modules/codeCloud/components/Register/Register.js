import React, { Component } from 'react';
import userModel from './../../models/AbstractModel.js';
import './Register.css';
class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      rePassword:'',
      mobilePhoneNumber: '',
    }
    this.userNmaehandleChange = this.userNmaehandleChange.bind(this);
    this.pwdhandleChange = this.pwdhandleChange.bind(this);
    this.rePwdhandleChange = this.rePwdhandleChange.bind(this);
    this.phonehandleChange = this.phonehandleChange.bind(this);
    this.registerFn = this.registerFn.bind(this);
  }
  componentWillMount(props) {
   //  console.log(this.props.history.push());
  }
  // 获取输入手机号
  userNmaehandleChange(event) {
    this.setState({username: event.target.value});
  }
  // 获取输入密码
  pwdhandleChange() {
    this.setState({password: event.target.value});
  }
  // 获取输入确认密码
  rePwdhandleChange() {
    this.setState({rePassword: event.target.value});
  }
  // 获取手机好
  phonehandleChange() {
    this.setState({mobilePhoneNumber: event.target.value});
  }
  registerFn() {
    const {
      username,
      password,
      rePassword,
      mobilePhoneNumber,
    } = this.state;
    if (username === '') {
      alert('用户名不能为空');
      return;
    }
    if (password === '') {
      alert('密码不能为空');
      return;
    }
    if (mobilePhoneNumber === '') {
      alert('手机号不能为空');
      return;
    }
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobilePhoneNumber))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } 
    if (password !== rePassword) {
      alert('两次输入不一样，请重新输入');
      return;
    }
    const params = {
      username,
      password,
      mobilePhoneNumber,
    }
    userModel.registerUser(params, (data) => {
      this.props.history.push('main');
    }, () => {
      alert('注册失败');
    })
  }
  render() {
    return (<div className="Register">
       <p><span>用户名:</span><input type="text" value={this.state.username}  onChange={this.userNmaehandleChange} /></p>
       <p><span>手机号:</span><input type="number" onChange={this.phonehandleChange} /></p>
       <p><span>密码:</span><input type="password" onChange={this.pwdhandleChange} /></p>
       <p><span>密码确认:</span><input type="password" onChange={this.rePwdhandleChange} /></p>
       <div className="login-btn"><button type="button" onClick={this.registerFn}>注册</button><b>已有帐号登录</b></div>
    </div>);
  }
}
export default Register;