import React from 'react';
import './NavBar.css';
const NavBar = (props) => {
	const {
		title,
		label,
		imgUrl,
	} = props;
  return(
  <div className ="flex-hrz navBar">
    <div className ="title">{title || "论文助手"}</div>
    <div className ="user-info">
      <span onClick={() => { label.callback && label.callback(); }}>{label.text}</span>
      <img className="user-header" src={imgUrl} />
    </div>
  </div>
  )
}
export default NavBar;
