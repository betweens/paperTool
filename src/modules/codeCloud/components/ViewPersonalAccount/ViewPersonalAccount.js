import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Loading,
  NavBar,
  WordLine,
  Taps,
  MomentsLine,
} from './../../../../common/index.js';
import userModel from './../../models/AbstractModel.js';
import PageManager from './../../core/PageManager.js';
import './ViewPersonalAccount.css';
class ViewPersonalAccount extends PageManager {
  constructor(props){
    super(props)
    this.state = {
      isDataReady: true,
      isShowloading: false,
      fileName: '',
      accountType:0,//论文还是学术圈
      titleValue:'',
      descriptionValue:'',
      typeValue:'',
      momentText:'',
      momentLink:'',
      momentLinkDesc:'',
      momentsList:[],
      wordLists:[],
    }
    this.initialMoment=[];
    this.initialPaper=[];
    this.userId = '';
    this.uploadFile = this.uploadFile.bind(this);
    this.logOutFn = this.logOutFn.bind(this);
    this.viewWordList = this.viewWordList.bind(this);
    this.getPaperList = this.getPaperList.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.createxmlhttp = this.createxmlhttp.bind(this);
    this.saveWordListsFn = this.saveWordListsFn.bind(this);
    ['titleHandleChange','descriptionHandleChange','typeHandleChange','momentTextHandleChange','momentLinkHandleChange','momentLinkDescHandleChange'].forEach((method)=>{
      this[method]=this[method].bind(this)
    })



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

    this.setState({
        username: isLogin.attributes.username,
        school:isLogin.attributes.school,
        department:isLogin.attributes.department,
        major:isLogin.attributes.major,
        adminYear:isLogin.attributes.adminYear,
        researchField:isLogin.attributes.researchField,      
    })
    this.userId = isLogin.id;
    const params = {
      objectId: this.userId,
    };
    console.log(isLogin)
    userModel.getPaperList(params, (data) => {
      if (data.length > 0) {
         this.initialPaper=data;
         this.setState({
          isDataReady: false,
          wordLists: this.initialPaper,
        })
      } else {
        this.setState({
          isDataReady: false,
        })
      }
    }, (error) => {
      console.log(error);
    });

    const momentsParams={
      userId:this.userId
    }
    userModel.getMomentsList(momentsParams, (data) => {
      this.initialMoment=data;
      this.setState({
        momentsList:this.initialMoment
      })
    }, (error) => {
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
    //paperKeyword
    //paperDescription
    const params = {
      userId: this.userId,
      fileUrl,
      paperTitle: this.state.titleValue,
      paperDescription:this.state.descriptionValue,
      keyWords:[this.state.typeValue]
    };
    userModel.savePaper(params, (data) => {
      this.initialPaper.push(data);

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
    xmlhttp.open("POST","http://218.193.131.251:54321",true);
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

      // window.localStorage.setItem('WordListsId', data.id);
      // this.forward('myWordList/'+ this.paperId);
      // 刷新当前页面
      this.setState({
        wordLists:this.initialPaper,
        isShowloading: false,
      });

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
        titleValue: obj[0].name
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
  editProfile(){
    this.props.history.push('editProfile');
  }
  moments(){
    this.props.history.push('moments');
  }

  switchWordType(index) {
    if (index === this.state.accountType) return
    this.setState({
      accountType: index,  // 0论文  1 学术圈 
    });
  }


  titleHandleChange(){
    this.setState({titleValue: event.target.value});
  }
  descriptionHandleChange(){
    this.setState({descriptionValue: event.target.value});
  }
  typeHandleChange(){
    this.setState({typeValue: event.target.value});
  }

  momentTextHandleChange(){
    this.setState({momentText:event.target.value})
  }
  momentLinkHandleChange(){
    this.setState({momentLink:event.target.value})
  }
  momentLinkDescHandleChange(){
    this.setState({momentLinkDesc:event.target.value  })  
  }

  uploadMoment(){
    const params={
      userId: this.userId,
      momentText:this.state.momentText,
      momentLink:this.state.momentLink,
      momentLinkDesc:this.state.momentLinkDesc
    };
    if(!(this.state.momentText||this.state.momentLink||this.state.momentLinkDesc)){
      alert('请输入')
      return;
    }

    userModel.saveMoments(params, (data) => {
//刷新当前页面
// window.location.reload()




        this.initialMoment.push(data);
        this.setState({
          momentsList:this.initialMoment
        })



    },(error) => {

    });    
  }
  render() {
    if (this.state.isDataReady) return <Loading />;
    const {
      fileName,
      username,
      school,
      department,
      major,
      adminYear,
      researchField,
      wordLists = [],
      isShowloading,
      momentsList
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
    // 论文列表
    let wordLineData = [];
    wordLists.map(value => {
      const temp = {
        time: this.formatDate(value.createdAt, 'yyyy-MM-dd'),
        paperTitle: value.attributes.paperTitle,
        content: value.attributes.paperDescription,
        keyWords:value.attributes.keyWords,
        btns: [{
          label: '查看全文',
          callback: () => { this.openNewView(value.attributes.fileUrl); }
        }, {
          label: '查看单词',
          callback: () => { this.viewWordList(value.id); }
        }],
      };
      wordLineData.push(temp);
    });
    wordLineData=wordLineData.reverse()

    let momentsListData = [];
    momentsList.map(value => {
      const temp = {
        time: this.formatDate(value.createdAt, 'yyyy-MM-dd'),
        momentText: value.attributes.momentText,
        momentLink: value.attributes.momentLink,
        momentLinkDesc:value.attributes.momentLinkDesc,
      };
      momentsListData.push(temp);
    });
    
    momentsListData=momentsListData.reverse()

    const tabData = {
      label: ['论文' ,'学术圈'],
      callBack: (i) => {
        this.switchWordType(i);
      }
    }

    let userCard=(<div className="user-car">
                    <img className="user-img" src="http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047988.png" />
                    <h1>{username}</h1>
                    <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>{school}</span><span>{department}</span></p>
                    <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>{major}</span><span>{adminYear}</span></p>
                    <p className="flex-hrz"><span><i className="iconfont icon-coordinates_fill"></i>关注领域</span><span>{researchField}</span></p>
                    <p className="flex-hrz" onClick={this.editProfile.bind(this)}><span><i className="iconfont icon-coordinates_fill"></i>修改个人信息</span><span></span></p>
                  </div>);

    return (<div className="ViewPersonalAccount">
      <NavBar {...navBarData} />
      <Taps {...tabData} />      
        {!this.state.accountType?(<section className="flex-hrz"><div className="left">
          {userCard}
          {/*<ul className="flex-hrz paper-info">
                      <li className="flex-full"><p>上传篇数</p><p className="number">1w</p></li>
                      <li className="flex-full border-left-line"><p>单词数</p><p className="number">20w</p></li>
                    </ul>*/}
          <ul className="flex-hrz paper-info" onClick={this.vocabulary.bind(this)}>            
            <li className="flex-full border-left-line"><p>查看所有生词</p>{/*<p className="number">20w</p>*/}</li>
          </ul>

          <div className="flex-hrz upload-paper">
            <label className="flex-full input-selector">
              <span className="input-description">选择要上传的文件</span>
              <input type="file" ref="paperFile"  onChange={this.changeInput}/>
            </label>           
          </div> 

          {fileName?(<div className="paperInfoContainer">         
{/*                          <div><span>论文标题</span><input className="paperInfo" type="text" value={this.state.titleValue} onChange={this.titleHandleChange}/></div>                          
                          <div><input className="paperInfo" type="text" placeholder="输入论文评论" onChange={this.descriptionHandleChange}/></div>
                          <div><input className="paperInfo" type="text" placeholder="输入论文类型" onChange={this.typeHandleChange} /></div>*/}
                          
                          <div className="container">
                                                  
                            <form>
                              
                              <div className="group">      
                                <input type="text" required onChange={this.titleHandleChange} value={this.state.titleValue} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>论文标题</label>
                              </div>
                                
                              <div className="group">      
                                <input type="text" required  onChange={this.descriptionHandleChange} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>论文评论</label>
                              </div>

                              <div className="group">      
                                <input type="text" required  onChange={this.typeHandleChange} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>论文类型</label>
                              </div>                          
                                                                                            
                            </form>

                          </div>
                          <div className="flex-init file-btn" onClick={this.uploadFile} ><i className="iconfont icon-shangchuan1"></i><span>上传</span></div>
                    </div>):''}
          

        </div><div className="flex-full right">
            <WordLine items={wordLineData} />

        </div></section>):(<section className="flex-hrz"><div className="left">
                  {userCard}
                  <div className="paperInfoContainer">

                      <div className="container">
                                              
                        <form>
                          
                          <div className="group">      
                            <input type="text" required onChange={this.momentTextHandleChange} />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>输入文字</label>
                          </div>
                            
                          <div className="group">      
                            <input type="text" required  onChange={this.momentLinkHandleChange} />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>输入链接</label>
                          </div>
                                                                                        
                        </form>

                      </div>

{/*                 
                    <span>输入文字</span><input className="paperInfo" type="text" placeholder="输入文字" onChange={this.momentTextHandleChange}/>
                    <span>链接</span><input className="paperInfo" type="text" placeholder="上传链接" onChange={this.momentLinkHandleChange}/>                
                    <span>链接描述</span><input className="paperInfo" type="text" placeholder="上传链接" onChange={this.momentLinkDescHandleChange}/>                
                    <span>上传图片</span><input className="paperInfo" type="text" placeholder="上传图片" onChange={this.titleHandleChange}/>
                    <span>上传视频</span><input className="paperInfo" type="text" placeholder="上传视频" onChange={this.titleHandleChange}/>*/}
                    <div className="flex-init file-btn"  onClick={this.uploadMoment.bind(this)}><i className="iconfont icon-shangchuan1"></i><span>发布</span></div>
                  </div>
              </div>        
              <div className="flex-full right">
           
                  <MomentsLine items={momentsListData} />

              </div></section>)}

      
      {isShowloading ? <Loading /> : null}
    </div>);
  }
}

export default ViewPersonalAccount;
