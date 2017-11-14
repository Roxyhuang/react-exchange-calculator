import 'assets/css/global.less';
import 'assets/css/mod_css/normal.less';
import createApp from '../../utils/createApp';
import router from '../../routes/route';

if (process.env.NODE_ENV === 'development' && process.env.DEBUG) {
  const eruda = require('eruda');
  // open debug mode
  eruda.init();
}

window.$$ = Dom7; //eslint-disable-line

window.globalParams = {};

window.app = createApp(router);

window.app.mainView = window.app.addView('.view-main');

if (location.hash === '') {
  window.app.mainView.router.load({
    url: 'p/index.html',
    animatePages: true,
  });
}

