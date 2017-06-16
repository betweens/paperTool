import React from 'react';
import './WordList.css';
const WordList = (props) => {
  const {
    wordLists,
    callback,
  } = props;
  if (wordLists.length) {
    const li = wordLists.map((value, i) => {
      const haschecked = value.familiar ? 'circle spain' : 'circle';
      return(<li className="flex-hrz" key={i} onClick={() => { callback && callback(i); }}>
        <div className="checkbox"><span className={haschecked}></span></div>
        <div className="flex-full word-info">
          <h1>{value.word}</h1>
          <p>{value.translation}</p>
        </div>
      </li>)
    });
    return (<ul className ="Word-list">{li}</ul>);
  } else {
    return null;
  }
}

export default WordList;
