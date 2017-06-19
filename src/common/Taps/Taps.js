import React, { Component } from 'react';
import './Taps.css';
class Taps  extends Component {
  constructor(props){
    super(props)
    this.state = {
      isDataReady: true,
      active: 0,
    }
    this.tabClickHandler = this.tabClickHandler.bind(this);
  }
/*  componentWillMount() {
    console.log(1);
    console.log(this.props);
  }*/
  tabClickHandler(index) {
     // 禁止点击已选定的tab分栏
    if (this.state.active === index) return;
    this.setState({
      active: index,
    });
    if (this.props.callBack) {
      this.props.callBack(index);
    }
  }
  render() {
    const {
      label,
    } = this.props;
    const list = label.map((value, index) => {
      const tabclass = (index === this.state.active ? 'flex-full active' : 'flex-full');
      return <p className={tabclass} onClick={() => this.tabClickHandler(index)}>{value}</p>
    });
    return <div className ="flex-hrz Taps">{list}</div>;
  }
}

export default Taps;
