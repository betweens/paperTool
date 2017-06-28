import React from 'react';
import './WordLine.css';
const WordLine = (props) => {
	const {
		items = [],
	} = props;
	if (items.length === 0) return null;
  const list = items.map((item, i) => {
    const btns =item.btns? item.btns.map((value, j) => {
      return <div className="flex-full btn" onClick={ () => { value.callback && value.callback(i); }}>{value.label}</div>;
    }):'';
    return(<li className="flex-hrz" key={i}>
    	<div className="time-text"><span className="text-bottom">{item.time}</span></div>
    	<div className="flex-full paper-box">
    	  <h3 className="paper-title">{item.paperTitle}</h3>
    	  <div className="introduction">{item.content}<br />
          {item.keyWords&&item.keyWords[0]?item.keyWords[0]:''}
        </div>
    	  <footer className="flex-hrz">{btns}</footer>
    	</div>
    </li>)
  });
  return <ul className ="WordLine">{list}</ul>;
}
export default WordLine;
