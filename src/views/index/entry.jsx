import 'assets/css/global.less';
import createApp from '../../utils/createApp';
import Index from '../../components/container/index/Index';
import List from '../../components/container/list/List';

window.$$ = Dom7; //eslint-disable-line

window.globalParams = {};

const router = {
  'p/index.html': {
    mod: Index,
    title: '首页',
  },
  'p/list.html': {
    mod: List,
    title: '列表',
  },
};

window.app = createApp(router);

window.app.mainView = window.app.addView('.view-main');

if (location.hash === '') {
  window.app.mainView.router.load({
    url: 'p/index.html',
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

