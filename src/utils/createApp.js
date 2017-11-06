import 'frame7';

module.exports = function (reactComponent) {
  const app = new Framework7({
    pushState: true,
    reactComponent: reactComponent || {},
    preprocess: function(content, url, next) {
      return content;
    },
    onPageAfterAnimation: function (app, page) {
      document.title = $$(page.container).find('.page-content').data('title');
    },
    material:true
  });
  console.log(app.reactComponent);
  return app;
}
