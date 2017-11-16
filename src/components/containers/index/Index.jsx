import React from 'react';
import cny from 'assets/img/flags/cny.png';
import usd from 'assets/img/flags/usd.png';
import hkd from 'assets/img/flags/hkd.png';
import Layout from '../../include/layout/Layout';
import Navbar from '../../include/navbar/Navbar';
import Cell from '../../include/cell/Cell';
import backend from '../../../backend/Backend';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    // TODO
    backend.getInstance().getProductList({ method: 'POST' }).then((res) => {
      console.log(res);
    });
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
          <Cell info={{ img: cny, unit: 'CNY', base: 100, text: '人民币 ¥' }} />
          <Cell info={{ img: usd, unit: 'USD', base: 15.06, text: '美元 　$' }} />
          <Cell info={{ img: hkd, unit: 'HKD', base: 117.50, text: '港币 　$' }} />
        </div>
      </Layout>
    );
  }
}

export default Index;
