import React from 'react';
import s from './cell.less';

const Cell = () => {
  return (
    <div className={s.container}>
      <img src="" alt="" />
      <div>CNY</div>
      <div>
        <div>7.03</div>
        <div>人民币 ¥</div>
      </div>
    </div>
  );
};

export default Cell;
