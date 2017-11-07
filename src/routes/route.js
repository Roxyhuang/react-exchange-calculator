import Index from '../components/container/index/Index';
import List from '../components/container/list/List';

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

export default router;
