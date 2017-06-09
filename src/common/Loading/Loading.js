import React from 'react';
import './Loading.css';
const Loading = () => {
  return(
  <div className ="flex-hrz loader">
    <div className ="loader-inner ball-spin-fade-loader">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  </div>
  )
}
export default Loading;
