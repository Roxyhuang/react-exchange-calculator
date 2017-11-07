import React from 'react';

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="left">
          <a href="p/list.html" className="link">Left Link</a>
        </div>
        <div className="center">{props.title}</div>
        <div className="right">
          <a href="#" className="link">Right Link</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
