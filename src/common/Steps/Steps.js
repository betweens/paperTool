import React from 'react';
import './Steps.css';
const Steps = (props) => {
	console.log(props);
	const items  = props.items;
	const li = items.map((item, key) => {
    return (<li>
      <input id='label-1' type='checkbox'/>
      <label for='label-1'><h2>{item.word}<span>{item.translation}</span>  <span>{item.wordLevel}</span>  <span>{item.wordFrequency}</span></h2></label>
    </li>);
  });
  return <div className="steps"><ul>{li}</ul></div>
}
export default Steps;
