import React from 'react';
import Layout from '../../include/layout/Layout';
import Navbar from '../../include/navbar/Navbar';
import Cell from '../../include/cell/Cell';

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
        <div className="page-content pull-to-refresh-content" data-ptr-distance="44" style={{ top: 0 }}>
          <div className="pull-to-refresh-layer">
            <div className="preloader" />
            <div className="pull-to-refresh-arrow" />
          </div>
          <Cell />
        </div>
      </Layout>
    );
  }
}

export default Index;
