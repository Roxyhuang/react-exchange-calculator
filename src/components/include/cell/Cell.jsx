import React from 'react';
import CSSModules from 'react-css-modules';
import s from './cell.less';

const Cell = (props) => {
  const { info } = { ...props };
  return (
    <div styleName="container">
      <img src={info.img} alt="flags" styleName="flags" />
      <div styleName="tag">{info.unit}</div>
      <div styleName="info">
        <input type="number" styleName="number" placeholder={info.base} maxLength="11" />
        <div styleName="unit">{info.text}</div>
      </div>
    </div>
  );
};

export default CSSModules(Cell, s);
