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
        let wordLevel=[];
        let showWordLevel='';
        if(value.tag!==1){
          value.tag.forEach(i=>{
            wordLevel.push(<span>{i.toUpperCase()}/</span>)
          }) 
          showWordLevel=(<p>等级:{wordLevel}</p>)         
        }
        
        return(<li className="flex-hrz" key={i} onClick={() => { callback && callback(i); }}>
          <div className="checkbox"><span className="circle"></span></div>
          <div className="flex-full word-info">
            <h1>{value.word}</h1>
            <p>{value.translation.replace(/\\n/g, "；")}</p>
            <p>BNC:{value.bnc}</p>
            {showWordLevel}
          </div>
        </li>);
      });
    }
    // 熟词
    if (wordType === 2 ) {
      li = wordLists.map((value, i) => {
        if (value.familiar) {
          let wordLevel=[];
          let showWordLevel='';
          if(value.tag!==1){
            value.tag.forEach(i=>{
              wordLevel.push(<span>{i.toUpperCase()}/</span>)
            }) 
            showWordLevel=(<p>等级:{wordLevel}</p>)         
          }
          return(<li className="flex-hrz" key={i} onClick={() => { callback && callback(i); }}>
            <div className="checkbox"><span className="circle spain"></span></div>
            <div className="flex-full word-info">
              <h1>{value.word}</h1>
              <p>{value.translation.replace(/\\n/g, "；")}</p>
              <p>BNC:{value.bnc}</p>
              {showWordLevel}              
            </div>
          </li>);
        }
      });
    }
    // all 
    if (wordType === 0) {
      li = wordLists.map((value, i) => {
        const haschecked = value.familiar ? 'circle spain' : 'circle';
        let wordLevel=[];
        let showWordLevel='';
        if(value.tag!==1){
          value.tag.forEach(i=>{
            wordLevel.push(<span>{i.toUpperCase()}/</span>)
          }) 
          showWordLevel=(<p>等级:{wordLevel}</p>)         
        }
        return(<li className="flex-hrz" key={i} onClick={() => { callback && callback(i); }}>
          <div className="checkbox"><span className={haschecked}></span></div>
          <div className="flex-full word-info">
            <h1>{value.word}</h1>
            <p>{value.translation.replace(/\\n/g, "；")}</p>
            <p>BNC:{value.bnc}</p>
            {showWordLevel}            
          </div>
        </li>)
      });
    }
    return <ul className ="Word-list">{li}</ul>;
  }
  return null;
}

export default WordList;
