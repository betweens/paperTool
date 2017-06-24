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
  // 获取上文件列表
  getPaperList(params, succ, fail) {
    const query = new AV.Query('papers');
    query.equalTo('userId', params.objectId);
    query.find().then(function (todo) {
      succ && succ(todo);
    }, function (error) {
      fail && fail(error);
    });
  }
  // 保存上传文件
  savePaper(params,succ,fail) {
    const objPapers = AV.Object.extend('papers');
    const todoPapers= new objPapers();
    todoPapers.set('userId', params.userId);
    todoPapers.set('fileUrl', params.fileUrl);
    todoPapers.set('paperTitle', params.paperTitle);
    todoPapers.save().then(function(todo) {
      succ && succ(todo);
    }, function(error) {
      fail && fail(error);
    });
  }
  //当前wordList,传入objectId
  getThisWordList(params,succ,fail){
    const query = new AV.Query('wordLists');
    query.equalTo('paperId', params.paperId);
    query.first().then(function (todo) {
      succ && succ(todo);
    }, function (error) {
      fail && fail(error);
    });    
  }
  // 保存单词列表
  saveWordLists(params, succ, fail) {
    const WordLists = AV.Object.extend('wordLists');
    const todoWordLists= new WordLists();
    todoWordLists.set('userId', params.userId);
    todoWordLists.set('show', params.show);
    todoWordLists.set('paperId', params.paperId);
    todoWordLists.set('wordList', params.wordList);
    todoWordLists.save().then(function(todo) {
      succ && succ(todo);

    
      const Vocabulary = AV.Object.extend('Vocabulary');
      const VocabularyLists= new Vocabulary();
      // VocabularyLists.set('userId', params.userId);
      // VocabularyLists.set('show', params.show);
      // VocabularyLists.set('paperId', params.paperId);
      VocabularyLists.set('VocabularyWordList', params.wordList);
      VocabularyLists.save().then(()=>{},()=>{})
    }, function (error) {
      fail && fail(error);
    });
  }
  // 更新单词列表
  updataWordLists(params, succ, fail) {
    const WordLists = AV.Object.createWithoutData('wordLists', params.id);
    WordLists.set('userId', params.userId);
    WordLists.set('show', params.show);
    WordLists.set('paperId', params.paperId);
    WordLists.set('wordList', params.wordList);
    WordLists.save().then(function(todo) {
      succ && succ(todo);

    
      const Vocabulary = AV.Object.extend('Vocabulary');
      const VocabularyLists= new Vocabulary();
      // VocabularyLists.set('userId', params.userId);
      // VocabularyLists.set('show', params.show);
      // VocabularyLists.set('paperId', params.paperId);
      let vocabularyFilter=[];//当前词汇表内的单词 currentVocabulary
      params.wordList.forEach((item)=>{
        if(!item.familiar){
          //如果存在，在原来的单词出现次数，频率，count,上加1
          vocabularyFilter.push(item)
        }
      })
      VocabularyLists.set('VocabularyWordList', vocabularyFilter);
      console.log(params.wordList)
      console.log(vocabularyFilter)
      VocabularyLists.save().then(()=>{},()=>{})

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
