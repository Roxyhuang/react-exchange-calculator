import { asyncComponent } from '../utils/asyncComponent';

const Index = asyncComponent(() => import('../components/containers/index/Index'));
const List = asyncComponent(() => import('../components/containers/list/List'));

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
