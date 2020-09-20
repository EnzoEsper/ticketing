// this file is loaded up automatically by next js whenever our project starts up, next is going to attempt to read this
// is going to looak at the webpackMiddleware function and call it with some middlepack configuration that is created by default
// We are changing a single option on there -> to tell webpack to rather than watch for changes in some automated fashion istead poll all the different files inside our
// project directory automatically once every 300 ms
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};