import React from 'react';
import cny from 'assets/img/flags/cny.png';
import s from './cell.less';


const Cell = () => {
  return (
    <div className={s.container}>
      <img src={cny} alt="flags" className={s.flags} />
      <div>CNY</div>
      <div>
        <div>7.03</div>
        <div>人民币 ¥</div>
      </div>
    </div>
  );
};

export default Cell;
