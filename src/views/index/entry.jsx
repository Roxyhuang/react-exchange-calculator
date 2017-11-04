import 'assets/css/global.less';
import createApp from '../../utils/createApp';

window.$$ = Dom7; //eslint-disable-line

window.globalParams = {};

const router = {
  'aaa.html': {
    mod: '<div>123</div>',
    title: '首页',
  },
};

window.app = createApp(router);

window.app.mainView = window.app.addView('.view-main', { domCache: true });

const testDom = '<div class="page" data-page="my-page">123</div>';

window.app.mainView.router.loadContent(testDom);

if (location.hash === '') {
  window.app.mainView.router.load({
    content: testDom,
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

