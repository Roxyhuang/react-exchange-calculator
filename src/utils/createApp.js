/* eslint-disable */

import 'frame7';

module.exports = (reactComponent) => {
  const app = new Framework7({
    pushState: true,
    reactComponent: reactComponent || {},
    preprocess: (content) => {
      return content;
    },
    onPageAfterAnimation:(app, page) => {
      document.title = $$(page.container).find('.page-content').data('title');
    },
    material: true,
  });
  return app;
};
