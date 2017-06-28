import React, { Component } from 'react';
import userModel from './../../models/AbstractModel.js';
import './Login.css';
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      mobilePhoneNumber:'',
      password:'',
      registerUserName:'',
      registerMobilePhoneNumber: '',
      registerPassword: '', 
      rePassword:'',
      loginStatus:true,

    }
    this.userNmaehandleChange = this.userNmaehandleChange.bind(this);
    this.pwdhandleChange = this.pwdhandleChange.bind(this);
    this.loginFn = this.loginFn.bind(this);
    this.loginBtn=this.loginBtn.bind(this);

    this.registeruserNmaehandleChange=this.registeruserNmaehandleChange.bind(this);
    this.registerPhonehandleChange=this.registerPhonehandleChange.bind(this);
    this.registerpwdhandleChange=this.registerpwdhandleChange.bind(this);
    this.rePwdhandleChange=this.rePwdhandleChange.bind(this);
    this.registerFn = this.registerFn.bind(this);
    this.registerBtn=this.registerBtn.bind(this);

  }
  componentWillMount() {
    const isLogin = userModel.getCurrentUser();
    if (isLogin) this.props.history.push('viewPersonalAccount');   
  }
  // 获取用户名
  userNmaehandleChange(event) {
    console.log(event.target.value)
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
      window.localStorage.setItem('mobilePhoneNumber', mobilePhoneNumber);
      window.localStorage.setItem('password', password);
      this.props.history.push('viewPersonalAccount');
    }, (error) => {
      console.log(error);
    });
  }

  // 获取
  registeruserNmaehandleChange(event) {
    console.log(event.target.value)
    this.setState({registerUserName: event.target.value});

  }

  // 获取手机
  registerPhonehandleChange() {
    this.setState({registerMobilePhoneNumber: event.target.value});
  }
  // 获取输入密码
  registerpwdhandleChange() {
    this.setState({registerPassword: event.target.value});
  }
  // 获取输入确认密码
  rePwdhandleChange() {
    this.setState({rePassword: event.target.value});
  }

  registerFn() {
    const {
      registerUserName,
      registerPassword,
      rePassword,
      registerMobilePhoneNumber,
    } = this.state;
    if (registerUserName === '') {
      alert('用户名不能为空');
      return;
    }
    console.log(registerPassword)
    if (registerPassword === '') {
      alert('密码不能为空');
      return;
    }
    if (registerMobilePhoneNumber === '') {
      alert('手机号不能为空');
      return;
    }
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(registerMobilePhoneNumber))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } 
    if (registerPassword !== rePassword) {
      alert('两次输入不一样，请重新输入');
      return;
    }
    const params = {
      username:registerUserName,
      password:registerPassword,
      mobilePhoneNumber:registerMobilePhoneNumber,
    }
    userModel.registerUser(params, (data) => {
      this.props.history.push('viewPersonalAccount');
    }, () => {
      alert('注册失败');
    })
  }


  loginBtn(){
    this.setState({
      loginStatus:true
    })
  }

  registerBtn(){
    this.setState({
      loginStatus:false
    })
  }  

  
  render() {



  let login=(
      <div className="form">
        <div className="input-container">
           <div className="input">
              <input className="main-form" type="text" placeholder=" 手机号" onChange={this.userNmaehandleChange}/>
           </div>

          <div className="input">
              <input className="main-form" type="password"  placeholder=" 密码" onChange={this.pwdhandleChange}/>
          </div>

          <div className="input">
              <div className="main-form btn"  onClick={this.loginFn} >登录</div>
          </div>

{/*          <div className="input">
            <label className="pull-right">
              <a href="#" id="3" className="forget-password">忘记密码 ?</a>
            </label>
          </div>*/}
        </div>
      </div>

  );
  let register=(
      <div className="form">
        <div className="input-container">
           <div className="input">
              <input className="main-form" type="text"  placeholder="用户名"   onChange={this.registeruserNmaehandleChange}/>
           </div>

           <div className="input">
              <input className="main-form" type="text"  placeholder="手机号"  onChange={this.registerPhonehandleChange}/>
           </div>

          <div className="input">
            <input className="main-form" type="password"  placeholder="密码" onChange={this.registerpwdhandleChange}/>
          </div>

          <div className="input">
              <input className="main-form" type="password"  placeholder="确认密码" onChange={this.rePwdhandleChange}/>
          </div>

          <div className="input">
              <input className="main-form btn" type="button"  value = "注册" onClick={this.registerFn}/>
          </div>

{/*          <div className="input">
            <label className="pull-right">
              <a href="#" id="3" className="forget-password">已有账号 ?</a>
            </label>
          </div>*/}
        </div>
      </div>
  );

    return (<div className="Login">
       {/*<p><span>用户名:</span><input type="number" placeholder="输入手机号" onChange={this.userNmaehandleChange} /></p>
              <p><span>密码:</span><input type="password" placeholder="输入密码" onChange={this.pwdhandleChange} /></p>
              <div className="login-btn"><button type="button" onClick={this.loginFn}>登录</button><b type="button">注册</b></div>*/}
    
    <div>

      <ul className="tabs">
        <li onClick={this.loginBtn}>登录</li>
        <li onClick={this.registerBtn}>注册</li>
      </ul>


      {this.state.loginStatus ? login : register}



    </div>

    </div>);
  }
}
export default Login;