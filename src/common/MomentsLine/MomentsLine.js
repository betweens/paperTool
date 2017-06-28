import React from 'react';
import './MomentsLine.css';
const MomentsLine = (props) => {
  const {
    items = [],
  } = props;
  if (items.length === 0) return null;
  const list = items.map((item, i) => {
    const btns =item.btns? item.btns.map((value, j) => {
      return <div className="flex-full btn" onClick={ () => { value.callback && value.callback(i); }}>{value.label}</div>;
    }):'';
    return(<li className="flex-hrz" key={i}>
      <div className="time-text"><span className="text-bottom">{item.time||''}</span></div>
      {item.momentLink?
        (<div className="flex-full paper-box">
              <h3 className="paper-title">{item.momentText||item.momentLink||''}</h3>
              <div className="introduction">
                {item.momentLinkDesc||''} <br />
                <a className="momentLink effect-1" href={item.momentLink||''}  target="_blank">{item.momentLink||''}</a>
              </div>        
              <footer className="flex-hrz">{btns}</footer>
            </div>):
        (<div><div className="momentText">{item.momentText||''}</div></div>)
      }
      
    </li>)
  });
  return <ul className ="MomentsLine">{list}</ul>;
}
export default MomentsLine;
