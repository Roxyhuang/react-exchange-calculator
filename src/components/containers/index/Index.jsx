import React from 'react';
import Layout from '../../include/layout/Layout';
import Navbar from '../../include/navbar/Navbar';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    // TODO
  }

  render() {
    return (
      <Layout>
        <Navbar title="汇率计算器" />
      </Layout>
    );
  }
}

export default Index;
