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
      fileName: '',
    }
    this.userId = '';
    this.uploadFile = this.uploadFile.bind(this);
    this.logOutFn = this.logOutFn.bind(this);
    this.viewWordList = this.viewWordList.bind(this);
    this.getPaperList = this.getPaperList.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.createxmlhttp = this.createxmlhttp.bind(this);
    this.saveWordListsFn = this.saveWordListsFn.bind(this);
  }
  componentWillMount() {
    this.getPaperList();
  }
  // 获取用户上传的论文列表
  getPaperList() {
    const isLogin = userModel.getCurrentUser();
    if (!isLogin) {
      this.props.history.push('login');
      return;
    }
    this.userId = isLogin.id;
    const params = {
      objectId: this.userId,
    };
    userModel.getPaperList(params, (data) => {
      if (data.length > 0) {
         this.setState({
          isDataReady: false,
          username: isLogin.attributes.username,
          wordLists: data,
        })
      } else {
        this.setState({
          isDataReady: false,
        })
      }
    }, (error) => {
      console.log(error);
    });
  }
  // 上传论文
  uploadFile() {
    this.setState({
      isShowloading: true,
    });
    const fileInput = ReactDOM.findDOMNode(this.refs.paperFile);
    if (fileInput.files.length > 0) {
      const params ={
        localFile: fileInput.files[0],
        name: fileInput.files[0].name
      }
      userModel.uploadFile(params, (progress) => {
        console.log(progress.loaded);
      }, (file) => {
        this.savePaperFile(file.url(), file.attributes.name);
      }, (error) => {
        console.log(error);
      }) 
    }
  }
  // 保存上传的作品
  savePaperFile(fileUrl, name) {
    const params = {
      userId: this.userId,
      paperTitle: name,
      fileUrl,
    };
    userModel.savePaper(params, (data) => {
      this.paperId = data.id;
      this.createxmlhttp(fileUrl);
    },(error) => {
      console.log(error);
    });
  }
  // 请求翻译接口
  createxmlhttp(url) {
    const self = this;
    const xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        let resultData = xmlhttp.responseText.replace(/NaN/g,'1'); //JSON.parse(xmlhttp.responseText)
         //xmlhttp.responseText.replace(/NaN/g,'1');
        window.localStorage.setItem('wordList', resultData);
        resultData = JSON.parse(resultData);
        resultData = resultData.result.wordList;
        self.saveWordListsFn(resultData);
      }
    }  
    xmlhttp.open("POST","http://218.193.131.250:54321",true);
    xmlhttp.send('p='+url);
  }
  // 保存单词
  saveWordListsFn(wordList) {
    const params = {
      userId: this.userId,
      show: true,
      paperId: this.paperId,
      wordList,
    };
    this.savPaperId(this.paperId);
    userModel.saveWordLists(params, (data) => {
      window.localStorage.setItem('WordListsId', data.id);
      this.forward('myWordList/'+ this.paperId);
    }, (error)=> {
      console.log(error);
    });
  }
  // 退出登录
  logOutFn() {
    userModel.logOut();
    this.props.history.push('login');
  }
  // 查看属于此论文的单词列表
  viewWordList(objectId){
    this.savPaperId(objectId);
    this.forward('myWordList/'+ objectId);
  }
  // 存储paperId
  savPaperId(id) {
    window.localStorage.setItem('paperId', id);
  }
  // 选择文件事件
  changeInput(e) {
    const obj = e.target.files;
    if (obj.length > 0) {
      this.setState({
        fileName: obj[0].name, 
      });
    }
  }
  // 打开pdf预览
  openNewView(url) {
    if(url) window.open(url,'_blank');
  }
  // 格式化日期
  formatDate(date, formater) {
    // 不是Date类型，formater不是string的一律返回空字符串
    if (!(date instanceof Date) || (typeof formater !== 'string')) {
      return '';
    }
    // 默认是'yyyy-MM-dd'格式
    formater = formater || 'yyyy-MM-dd';
    const o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds(), // millisecond
    };
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (/(y+)/.test(formater)) {
      formater = formater.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(w+)/.test(formater)) {
      formater = formater.replace(RegExp.$1, week[date.getDay()]);
    }

    for (const k of Object.keys(o)) {
      if (new RegExp('(' + k + ')').test(formater)) {
        formater = formater.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return formater;
  }
  vocabulary(){
    this.props.history.push('vocabulary');
  }
  uploadProfile(){
    console.log(this.refs.address)
    console.log(this.refs.address.attributes.placeholder.nodeValue)
  }
  render() {
    if (this.state.isDataReady) return <Loading />;
    const {
      fileName,
      username,
      wordLists = [],
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
                    
    return (<div className="my-account">
      <NavBar {...navBarData} />
      <section className="flex-hrz">
        <div className="left">
          <div className="user-car">
            <img className="user-img" src="http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png" />
            <h1>{username}</h1>
            <input className="" type="file" placeholder="上传头像" />            
            <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>复旦大学</span><span>管理学院</span></p>
            <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>IMBA</span><span>2017级</span></p>
            <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>关注领域</span><span>机器学习，金融</span></p>          
          </div>

          <div>
                <input className="" type="text" placeholder="输入你的真实姓名" /><input type="text"/>    
                {/*<input className="" type="text" placeholder={address} ref='address'/>*/}                
                <input className="" type="text" placeholder="输入你的学校" />
                <input className="" type="text" placeholder="输入你的学院" />
                <input className="" type="text" placeholder="输入你的专业" />
                <input className="" type="text" placeholder="输入你入学年份" />
                <input className="" type="text" placeholder="输入你的研究领域" />
                <div className="flex-init file-btn"><i className="iconfont icon-shangchuan1"></i><span onClick={this.uploadProfile.bind(this)}>更新</span></div>

          </div>
          

        </div>
        
      </section>
      {isShowloading ? <Loading /> : null}
    </div>);
  }
}

export default EditProfile;
