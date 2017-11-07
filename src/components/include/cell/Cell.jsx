import React from 'react';
import menu from 'assets/img/icon/menu.png';
import more from 'assets/img/icon/more.png';
import s from 'components/include/navbar/navbar.less';

const Cell = (props) => {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="left">
          <a href="p/list.html" className="link">
            <img src={menu} className={s.leftIcon} alt="menu-icon" />
          </a>
        </div>
        <div className={`center ${s.center}`}>{props.title}</div>
        <div className="right">
          <a href="p/list.html" className="link">
            <img src={more} className={s.rightIcon} alt="more-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cell;
