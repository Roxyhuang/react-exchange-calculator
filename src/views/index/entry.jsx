import 'assets/css/global.less';
import createApp from '../../utils/createApp';

window.$$ = Dom7; //eslint-disable-line

window.globalParams = {};

const router = {
  'p/app.html': {
    mod: '<div class="page" data-page="my-page">123</div>',
    title: '首页',
  },
};

window.app = createApp(router);

window.app.mainView = window.app.addView('.view-main', { domCache: true });

if (location.hash === '') {
  window.app.mainView.router.load({
    url: 'p/app.html',
    animatePages: false,
  });
}

// if (location.hash === '') {
//   window.app.mainView.router.load({
//     url: '#index',
//     animatePages: false,
//     pushState: false,
//   });
// }

