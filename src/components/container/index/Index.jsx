/* eslint-disable */
import React from 'react';
import Navbar from '../../inclues/Navbar';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="page" data-page="index">
        <Navbar title="汇率计算器"/>
      </div>
    );
  }
}

export default Index;
