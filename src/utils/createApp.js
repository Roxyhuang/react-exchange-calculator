import Framework7 from 'frame7'; // eslint-disable-line

module.exports = () => {
  const app = new Framework7({
    pushState: true,
    // reactComponent: reactComponent || {},
    preprocess: content => content,
    material: true,
  });
  console.log(app);
  return app;
};
