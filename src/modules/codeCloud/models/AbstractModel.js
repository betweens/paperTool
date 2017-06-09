import AV from 'leancloud-storage';

class AbstractModel {
  // 设置 App Key
  constructor() {
    const appId = 'gojhlg6h2w0cqh2wctysoj2bun8ex5u2mbc0cyrq0ibp5h8l';
    const appKey = 'iddxkuoz8teq1kt3kb9sluac9nfzytnr3rytcndzu2p0ur2l';
    AV.init({ appId, appKey });
  }

  // 注册用户  
  userLogin(params, succ, fail) {
    AV.User.logInWithMobilePhone(params.mobilePhoneNumber, params.password).then(function (loginedUser) {
      succ && succ(loginedUser);
    }, (function (error) {
      fail && fail(error);
    }));
    /*
    const user = new AV.User();
    // 手机号 和验证码登录
    user.signUpOrlogInWithMobilePhone(params.mobilePhoneNumber, params.password).then(function (success) {
      succ && succ(loginedUser);
    }, function (error) {
      fail && fail(error);
    });
    // 用户明和密码登录
    /*user.logIn(params.username, params.password).then(function (loginedUser) {
      succ && succ(loginedUser);
    }, function (error) {
      fail && fail(error);
    });*/
  }
  // 获取用户信息
  getUserInfo(userId) {
    console.log('userId');
  }
  // 获取当前用户信息
  getCurrentUser() {
    const currentUser = AV.User.current();
    return currentUser
  }
  //获取用户信息
  registerUser(params, succ, fail) {
    const user = new AV.User();
    user.set({username: params.username});
    user.set({password: params.password});
    user.set({mobilePhoneNumber: params.mobilePhoneNumber});
    user.signUp().then(function (loginedUser) {
      succ && succ(loginedUser);
    }, (function (error) {
        fail && fail(error);
    }));
  }
  // 作品表
  getWordList(params, succ, fail) {
    const query = new AV.Query('wordLists');
    query.equalTo('userId', params.objectId);
    query.find().then(function (todo) {
      succ && succ(todo);
    }, function (error) {
      fail && fail(error);
    });
  }

//当前wordList,传入objectId
  getThisWordList(params,succ,fail){
    const query = new AV.Query('wordLists');
    query.equalTo('objectId', params.objectId);
    query.find().then(function (todo) {
      succ && succ(todo);
    }, function (error) {
      fail && fail(error);
    });    
  }
  // 上传作品
  saveWordLists(params, succ, fail) {
    const WordLists = AV.Object.extend('wordLists');
    const todoWordLists= new WordLists();
    todoWordLists.set('userId', params.userId);
    todoWordLists.set('show', params.show);
    todoWordLists.set('paperId', params.paperId);
    todoWordLists.set('wordList', params.wordList);
    todoWordLists.save().then(function (todo) {
      succ && succ(todo);
    }, function (error) {
      fail && fail(error);
    });
  }
  // 用户登出
  logOut() {
    AV.User.logOut();
  }
  // 上传文件
  uploadFile(params, progress, succ, fail) {
    const file = new AV.File(params.name, params.localFile);
    file.save({ onprogress: function(e) {
      progress && progress(e);
    } }).then(function(file) {
      succ && succ(file); // 文件保存成功
    }, function(error) {
      fail && fail(error); // 异常处理
    });
  }
}
const userModel = new AbstractModel();
export default userModel;
