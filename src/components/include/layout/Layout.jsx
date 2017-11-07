import React from 'react';
import PropTypes from 'prop-types';
import s from './layout.less';

const Layout = (props) => {
  return (
    <div className={`${s.container} ${props.className}`} style={{ backgroundColor: props.backgroundColor }}>
      {props.children}
    </div>
  );
};

Layout.defaultProps = {
  className: '',
  backgroundColor: '#f2f2f2',
};

Layout.PropTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Layout;
