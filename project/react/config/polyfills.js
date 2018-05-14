'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  //window.Promise = require('promise/lib/es6-extensions.js');
  //promise/lib/es6-extensions.js低版本UC上有问题，替换成pinkie-promise
  window.Promise = require('pinkie-promise');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// require('babel-polyfill'); //es6 api 转义 为 es5 api，补丁包比较大，如有需要可自行安装npm包和放开此注释
