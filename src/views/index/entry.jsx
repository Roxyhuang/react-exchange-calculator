import 'assets/css/global.less';
import createApp from '../../utils/createApp';
import router from '../../routes/route';

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

