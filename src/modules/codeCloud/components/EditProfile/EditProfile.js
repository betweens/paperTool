import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Loading,
  NavBar,
  WordLine,
} from './../../../../common/index.js';
import userModel from './../../models/AbstractModel.js';
import PageManager from './../../core/PageManager.js';
import './EditProfile.css';
class EditProfile extends PageManager {
  constructor(props){
    super(props)
    this.state = {
      isDataReady: true,
      isShowloading: false,
      username:'',
      school:'',
      department:'',
      major:'',
      adminYear:'',
      researchField:'',
    }
   
  }
  componentWillMount() {
    const isLogin = userModel.getCurrentUser();
    this.setState({
      username:isLogin.attributes.username,
      school:isLogin.attributes.school,
      department:isLogin.attributes.department,
      major:isLogin.attributes.major,
      adminYear:isLogin.attributes.adminYear,
      researchField:isLogin.attributes.researchField,
    })
    
  }

  upgradeProfile(){
    const {
      username,
      school,
      department,
      major,
      adminYear,
      researchField,      
    }=this.state;

    const params={
      username,
      school,
      department,
      major,
      adminYear,
      researchField,
      password: window.localStorage.getItem('mobilePhoneNumber'),
      mobilePhoneNumber:window.localStorage.getItem('mobilePhoneNumber'),      
    };

    userModel.upgradeProfile(params, (data) => {

    },(error) => {
      console.log(error);
    });
  }


userNameChange(){
  this.setState({username: event.target.value});
}
schoolChange(){
  this.setState({school: event.target.value});
}
departmentChange(){
  this.setState({department: event.target.value});
}
majorChange(){
  this.setState({major: event.target.value});
}
adminYearChange(){
  this.setState({adminYear: event.target.value});
}
researchFieldChange(){
  this.setState({researchField: event.target.value});
}

  // 退出登录
  logOutFn() {
    userModel.logOut();
    this.props.history.push('login');
  }
  render() {
    const {
      username,
      isShowloading,
    } = this.state;
    // 头部数据
    const navBarData = {
      title: '论文助手',
      label: {
        text: '退出登陆',
        callback: () => { this.logOutFn(); }
      },
      imgUrl: 'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png',
    };

    let address='';
    address?address='ddd':address='输入你的地址';

    // let address='';
    // address?address='ddd':address='输入你的地址';

    // let address='';
    // address?address='ddd':address='输入你的地址';

    // let address='';
    // address?address='ddd':address='输入你的地址';

    // let address='';
    // address?address='ddd':address='输入你的地址';
                    
    return (<div className="EditProfile">
      <NavBar {...navBarData} />
{/*      <section className="flex-hrz">
            <div className="left">
              <div className="user-car">
                <img className="user-img" src="http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png" />
                <h1>{userName}</h1>
                <input className="" type="file" placeholder="上传头像" />            
                <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>复旦大学</span><span>管理学院</span></p>
                <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>IMBA</span><span>2017级</span></p>
                <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>关注领域</span><span>机器学习，金融</span></p>          
              </div>

              <div>
                    <input className="" type="text" placeholder="输入你的真实姓名" /><input type="text"/>    
                    <input className="" type="text" placeholder={address} ref='address'/>               
                    <input className="" type="text" placeholder="输入你的学校" />
                    <input className="" type="text" placeholder="输入你的学院" />
                    <input className="" type="text" placeholder="输入你的专业" />
                    <input className="" type="text" placeholder="输入你入学年份" />
                    <input className="" type="text" placeholder="输入你的研究领域" />
                    <div className="flex-init file-btn"><i className="iconfont icon-shangchuan1"></i><span onClick={this.uploadProfile.bind(this)}>更新</span></div>

              </div>
              

            </div>
      </section>*/}

      <div className="container">
        
        
        <form>
          
          <div className="group">      
            <input type="text" onChange={this.userNameChange.bind(this)} required value={this.state.username}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>姓名</label>
          </div>
            
          <div className="group">      
            <input type="text" onChange={this.schoolChange.bind(this)} required value={this.state.school}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>学校</label>
          </div>

          <div className="group">      
            <input type="text" onChange={this.departmentChange.bind(this)} required value={this.state.department}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>学院</label>
          </div>

          <div className="group">      
            <input type="text" onChange={this.majorChange.bind(this)} required value={this.state.major}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>专业</label>
          </div>

          <div className="group">      
            <input type="text" onChange={this.adminYearChange.bind(this)} required value={this.state.adminYear}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>入学年份</label>
          </div> 
          
          <div className="group">      
            <input type="text" onChange={this.researchFieldChange.bind(this)} required value={this.state.researchField}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>研究领域</label>
          </div>                                        
          
        </form>
        <div className="flex-init file-btn"  onClick={this.upgradeProfile.bind(this)}><i className="iconfont icon-shangchuan1"></i><span>更新</span></div>

      </div>
      

      {isShowloading ? <Loading /> : null}
    </div>);
  }
}

export default EditProfile;
