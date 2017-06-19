import React from 'react';
import './WordList.css';
const WordList = (props) => {
  const {
    wordLists,
    callback,
    wordType,
  } = props;
  if (wordLists.length) {
    let li = null;
    // 生词
    if (wordType === 1 ) {
      li = wordLists.map((value, i) => {
        if(value.familiar) return null;
        return(<li className="flex-hrz" key={i} onClick={() => { callback && callback(i); }}>
          <div className="checkbox"><span className="circle"></span></div>
          <div className="flex-full word-info">
            <h1>{value.word}</h1>
            <p>{value.translation}</p>
          </div>
        </li>);
      });
    }
    // 熟词
    if (wordType === 2 ) {
      li = wordLists.map((value, i) => {
        if (value.familiar) {
          return(<li className="flex-hrz" key={i} onClick={() => { callback && callback(i); }}>
            <div className="checkbox"><span className="circle spain"></span></div>
            <div className="flex-full word-info">
              <h1>{value.word}</h1>
              <p>{value.translation}</p>
            </div>
          </li>);
        }
      });
    }
    // all 
    if (wordType === 0) {
      li = wordLists.map((value, i) => {
        const haschecked = value.familiar ? 'circle spain' : 'circle';
        return(<li className="flex-hrz" key={i} onClick={() => { callback && callback(i); }}>
          <div className="checkbox"><span className={haschecked}></span></div>
          <div className="flex-full word-info">
            <h1>{value.word}</h1>
            <p>{value.translation}</p>
          </div>
        </li>)
      });
    }
    return <ul className ="Word-list">{li}</ul>;
  }
  return null;
}

export default WordList;
