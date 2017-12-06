/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("svg-baker-runtime/symbol");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("svg-sprite-loader/runtime/sprite.build");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ScrollBtn = __webpack_require__(11);

var _ScrollBtn2 = _interopRequireDefault(_ScrollBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapper = function wrapper(props) {
  return _react2.default.createElement(
    'section',
    { className: props.selector },
    _react2.default.createElement(
      'div',
      { className: props.selector + '__container' },
      _react2.default.createElement(
        'div',
        { className: props.selector + '__content' },
        _react2.default.createElement(
          'h2',
          { className: props.selector + '__section-header' },
          ' ',
          props.header,
          ' '
        ),
        _react2.default.createElement(
          'p',
          { className: props.selector + '__section-text' },
          ' ',
          props.text,
          ' '
        )
      ),
      _react2.default.createElement(_ScrollBtn2.default, { selector: props.selector })
    )
  );
};

exports.default = wrapper;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(6);

var _express2 = _interopRequireDefault(_express);

var _renderer = __webpack_require__(7);

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('public'));

app.get('*', function (req, res) {
  res.send((0, _renderer2.default)(req));
});

app.listen(3000, function () {
  console.log('App is running on port 3000');
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(8);

var _Routes = __webpack_require__(9);

var _Routes2 = _interopRequireDefault(_Routes);

var _reactRouterDom = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req) {
  var content = (0, _server.renderToString)(_react2.default.createElement(
    _reactRouterDom.StaticRouter,
    { location: req.path, context: {} },
    _react2.default.createElement(_Routes2.default, null)
  ));

  return '<html>\n    <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n      <link rel=\'stylesheet\' href=\'styles.css\' >\n    </head>\n    <body>\n    <div id=\'root\'>' + content + '</div>\n    <script src="bundle.js"></script>\n    </body>\n  </html>\n  ';
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(3);

var _Home = __webpack_require__(10);

var _Home2 = _interopRequireDefault(_Home);

var _Nav = __webpack_require__(13);

var _Nav2 = _interopRequireDefault(_Nav);

var _Footer = __webpack_require__(15);

var _Footer2 = _interopRequireDefault(_Footer);

var _About = __webpack_require__(20);

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Nav2.default, null),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/about', component: _About2.default }),
    _react2.default.createElement(_Footer2.default, null)
  );
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Wrapper = __webpack_require__(4);

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Wrapper2.default, { selector: 'about', header: 'About', text: 'This app is build for everyone' }),
    _react2.default.createElement(_Wrapper2.default, { selector: 'content', header: 'Content', text: 'Search news. Learn history. Get stats' }),
    _react2.default.createElement(_Wrapper2.default, { selector: 'Note', header: 'Note', text: 'SMTH' })
  );
};

exports.default = Home;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _arrow = __webpack_require__(12);

var _arrow2 = _interopRequireDefault(_arrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollBtn = function scrollBtn(props) {
  return _react2.default.createElement(
    'a',
    { className: props.selector + '__btn' },
    _react2.default.createElement(
      'i',
      { className: props.selector + '__btn-icon' },
      _react2.default.createElement(
        'svg',
        { className: 'icon-arrow' },
        _react2.default.createElement('use', { xlinkHref: '#arrow' })
      )
    )
  );
};

exports.default = scrollBtn;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "arrow",
  "use": "arrow-usage",
  "viewBox": "0 0 21.825 21.825",
  "content": "<symbol viewBox=\"0 0 21.825 21.825\" id=\"arrow\">\n<path style=\"fill:#1E201D;\" d=\"M16.791,13.254c0.444-0.444,1.143-0.444,1.587,0c0.429,0.444,0.429,1.143,0,1.587l-6.65,6.651\n\tc-0.206,0.206-0.492,0.333-0.809,0.333c-0.317,0-0.603-0.127-0.81-0.333l-6.65-6.651c-0.444-0.444-0.444-1.143,0-1.587\n\ts1.143-0.444,1.587,0l4.746,4.762V1.111C9.791,0.492,10.299,0,10.918,0c0.619,0,1.111,0.492,1.111,1.111v16.904L16.791,13.254z\" />\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = ("#" + symbol.id);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _menu = __webpack_require__(14);

var _menu2 = _interopRequireDefault(_menu);

var _reactRouterDom = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nav = function nav() {
  return _react2.default.createElement(
    'nav',
    { className: 'main-nav' },
    _react2.default.createElement(
      'ul',
      { className: 'nav-list' },
      _react2.default.createElement(
        'li',
        { className: 'nav-list__item' },
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/' },
          'Home'
        )
      ),
      _react2.default.createElement(
        'li',
        { className: 'nav-list__item' },
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/about' },
          'About'
        )
      ),
      _react2.default.createElement(
        'li',
        { className: 'nav-list__item' },
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/profile' },
          'Profile'
        )
      ),
      _react2.default.createElement(
        'li',
        { className: 'nav-list__item' },
        _react2.default.createElement(
          'a',
          { href: '' },
          'Login'
        )
      )
    ),
    _react2.default.createElement(
      'i',
      { className: 'main-nav__icon' },
      _react2.default.createElement(
        'svg',
        { className: 'icon-menu' },
        _react2.default.createElement('use', { xlinkHref: '#menu' })
      )
    )
  );
};

exports.default = nav;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "menu",
  "use": "menu-usage",
  "viewBox": "0 0 290 290",
  "content": "<symbol viewBox=\"0 0 290 290\" id=\"menu\">\n<g>\n\t<rect y=\"220\" width=\"70\" height=\"70\" />\n\t<rect y=\"110\" width=\"70\" height=\"70\" />\n\t<rect width=\"70\" height=\"70\" />\n\t<rect x=\"110\" y=\"220\" width=\"70\" height=\"70\" />\n\t<rect x=\"110\" y=\"110\" width=\"70\" height=\"70\" />\n\t<rect x=\"110\" width=\"70\" height=\"70\" />\n\t<rect x=\"220\" y=\"220\" width=\"70\" height=\"70\" />\n\t<rect x=\"220\" y=\"110\" width=\"70\" height=\"70\" />\n\t<rect x=\"220\" width=\"70\" height=\"70\" />\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = ("#" + symbol.id);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _twitter = __webpack_require__(16);

var _twitter2 = _interopRequireDefault(_twitter);

var _instagram = __webpack_require__(17);

var _instagram2 = _interopRequireDefault(_instagram);

var _facebook = __webpack_require__(18);

var _facebook2 = _interopRequireDefault(_facebook);

var _dribbble = __webpack_require__(19);

var _dribbble2 = _interopRequireDefault(_dribbble);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var footer = function footer() {
  return _react2.default.createElement(
    'footer',
    { className: 'page-footer' },
    _react2.default.createElement(
      'ul',
      { className: 'page-footer__socials' },
      _react2.default.createElement(
        'li',
        { className: 'page-footer__socials-item' },
        _react2.default.createElement(
          'a',
          { href: '' },
          _react2.default.createElement(
            'i',
            { className: 'socials-icon' },
            _react2.default.createElement(
              'svg',
              { className: 'twitter' },
              _react2.default.createElement('use', { xlinkHref: '#twitter' })
            )
          )
        )
      ),
      _react2.default.createElement(
        'li',
        { className: 'page-footer__socials-item' },
        _react2.default.createElement(
          'a',
          { href: '' },
          _react2.default.createElement(
            'i',
            { className: 'socials-icon' },
            _react2.default.createElement(
              'svg',
              { className: 'instagram' },
              _react2.default.createElement('use', { xlinkHref: '#instagram' })
            )
          )
        )
      ),
      _react2.default.createElement(
        'li',
        { className: 'page-footer__socials-item' },
        _react2.default.createElement(
          'a',
          { href: '' },
          _react2.default.createElement(
            'i',
            { className: 'socials-icon' },
            _react2.default.createElement(
              'svg',
              { className: 'dribble' },
              _react2.default.createElement('use', { xlinkHref: '#dribbble' })
            )
          )
        )
      ),
      _react2.default.createElement(
        'li',
        { className: 'page-footer__socials-item' },
        _react2.default.createElement(
          'a',
          { href: '' },
          _react2.default.createElement(
            'i',
            { className: 'socials-icon' },
            _react2.default.createElement(
              'svg',
              { className: 'facebook' },
              _react2.default.createElement('use', { xlinkHref: '#facebook' })
            )
          )
        )
      )
    )
  );
};

exports.default = footer;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "twitter",
  "use": "twitter-usage",
  "viewBox": "0 0 612 612",
  "content": "<symbol viewBox=\"0 0 612 612\" id=\"twitter\">\n<g>\n\t<g>\n\t\t<path d=\"M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411\n\t\t\tc-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513\n\t\t\tc0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101\n\t\t\tc0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104\n\t\t\tc-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194\n\t\t\tc-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485\n\t\t\tc230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z\" />\n\t</g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = ("#" + symbol.id);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "instagram",
  "use": "instagram-usage",
  "viewBox": "0 0 290 290",
  "content": "<symbol viewBox=\"0 0 290 290\" id=\"instagram\">\n<g>\n\t<path d=\"M250.626,0H39.374C17.663,0,0,17.663,0,39.374v211.252C0,272.338,17.663,290,39.374,290h211.252\n\t\tC272.337,290,290,272.338,290,250.626V39.374C290,17.663,272.337,0,250.626,0z M145,215.846c-35.762,0-64.856-29.094-64.856-64.856\n\t\tc0-35.761,29.095-64.856,64.856-64.856s64.856,29.095,64.856,64.856C209.856,186.752,180.762,215.846,145,215.846z\n\t\t M265.447,103.115H206.85C192.058,85.407,169.823,74.122,145,74.122s-47.058,11.286-61.85,28.993H24.553V46.804\n\t\tc0-14.313,11.645-25.957,25.958-25.957h188.979c14.313,0,25.958,11.644,25.958,25.957V103.115z\" />\n\t<path d=\"M145,109.296c-22.989,0-41.694,18.704-41.694,41.693c0,22.99,18.704,41.693,41.694,41.693s41.694-18.703,41.694-41.693\n\t\tC186.694,128,167.989,109.296,145,109.296z\" />\n\t<path d=\"M233.488,37.491h-25.093c-5.735,0-10.401,4.667-10.401,10.402v25.093c0,5.735,4.665,10.401,10.401,10.401h25.093\n\t\tc5.735,0,10.401-4.665,10.401-10.401V47.893C243.889,42.157,239.223,37.491,233.488,37.491z\" />\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = ("#" + symbol.id);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "facebook",
  "use": "facebook-usage",
  "viewBox": "0 0 430.113 430.114",
  "content": "<symbol viewBox=\"0 0 430.113 430.114\" id=\"facebook\">\n<g>\n\t<path id=\"facebook_Facebook\" d=\"M158.081,83.3c0,10.839,0,59.218,0,59.218h-43.385v72.412h43.385v215.183h89.122V214.936h59.805\n\t\tc0,0,5.601-34.721,8.316-72.685c-7.784,0-67.784,0-67.784,0s0-42.127,0-49.511c0-7.4,9.717-17.354,19.321-17.354\n\t\tc9.586,0,29.818,0,48.557,0c0-9.859,0-43.924,0-75.385c-25.016,0-53.476,0-66.021,0C155.878-0.004,158.081,72.48,158.081,83.3z\" />\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = ("#" + symbol.id);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "dribbble",
  "use": "dribbble-usage",
  "viewBox": "0 0 438.533 438.533",
  "content": "<symbol viewBox=\"0 0 438.533 438.533\" id=\"dribbble\">\n<g>\n\t<path d=\"M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0\n\t\tc-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267\n\t\tc0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407\n\t\ts76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062\n\t\tC438.533,179.485,428.732,142.795,409.133,109.203z M219.27,31.977c47.201,0,88.41,15.607,123.621,46.82l-3.569,4.993\n\t\tc-1.427,2.002-4.996,5.852-10.704,11.565c-5.709,5.708-11.943,11.136-18.699,16.274c-6.762,5.14-15.94,10.992-27.555,17.559\n\t\tc-11.611,6.567-23.982,12.328-37.117,17.276c-21.887-40.355-45.296-76.709-70.231-109.064\n\t\tC190.055,33.784,204.805,31.977,219.27,31.977z M72.524,103.06c18.271-23.026,40.537-40.73,66.806-53.1\n\t\tc23.601,31.405,46.82,67.381,69.662,107.921c-57.862,15.227-115.532,22.841-173.014,22.838\n\t\tC42.072,151.98,54.253,126.091,72.524,103.06z M44.54,286.794c-8.376-21.412-12.563-43.923-12.563-67.527\n\t\tc0-2.666,0.098-4.665,0.286-5.996c68.905,0,132.955-8.848,192.149-26.553c6.092,11.8,11.136,22.364,15.133,31.693\n\t\tc-0.771,0.38-1.999,0.806-3.713,1.283c-1.719,0.476-2.953,0.806-3.721,0.999l-10.561,3.711\n\t\tc-7.236,2.666-16.708,7.235-28.409,13.703c-11.704,6.478-24.123,14.182-37.257,23.13c-13.134,8.949-26.696,20.797-40.684,35.553\n\t\tc-13.99,14.75-25.743,30.591-35.26,47.53C64.713,327.381,52.914,308.2,44.54,286.794z M219.27,406.56\n\t\tc-44.54,0-84.32-14.277-119.343-42.825l4.283,3.142c6.661-14.66,16.462-28.746,29.408-42.257\n\t\tc12.944-13.511,25.41-24.413,37.401-32.695c11.991-8.274,25.028-16.077,39.115-23.414c14.084-7.323,23.691-11.991,28.835-13.983\n\t\tc5.14-1.998,9.233-3.572,12.278-4.716l0.568-0.287h0.575c18.647,48.916,31.977,96.313,39.968,142.184\n\t\tC268.756,401.611,244.397,406.557,219.27,406.56z M376.876,320.479c-14.086,21.796-31.696,39.834-52.817,54.104\n\t\tc-7.81-43.776-19.985-88.415-36.549-133.902c37.877-5.907,76.8-3.142,116.771,8.274\n\t\tC400.092,274.841,390.955,298.687,376.876,320.479z M403.706,216.698c-1.903-0.378-4.285-0.81-7.139-1.283\n\t\tc-2.854-0.473-6.331-1.047-10.424-1.713c-4.087-0.666-8.662-1.283-13.702-1.855c-5.045-0.571-10.421-1.093-16.136-1.569\n\t\tc-5.708-0.478-11.8-0.855-18.268-1.143c-6.479-0.284-13.042-0.428-19.705-0.428c-6.656,0-13.657,0.193-20.981,0.571\n\t\tc-7.326,0.375-14.414,1.049-21.265,1.999c-0.575-0.953-1.287-2.524-2.143-4.714c-0.855-2.187-1.479-3.855-1.848-4.997\n\t\tc-3.621-7.994-7.81-17.036-12.573-27.121c13.134-5.333,25.652-11.469,37.555-18.418c11.892-6.949,21.402-13.131,28.544-18.555\n\t\tc7.139-5.43,13.895-11.188,20.27-17.277c6.379-6.09,10.513-10.323,12.423-12.703c1.906-2.384,3.713-4.714,5.424-6.995l0.287-0.288\n\t\tc27.788,33.88,41.974,72.897,42.538,117.059L403.706,216.698z\" />\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = ("#" + symbol.id);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Wrapper = __webpack_require__(4);

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var about = function about() {
  return _react2.default.createElement(
    'div',
    { className: 'page-wrapper' },
    _react2.default.createElement(
      'div',
      { className: 'page-wrapper__inner' },
      _react2.default.createElement(
        'header',
        { className: 'about-inner' },
        _react2.default.createElement(
          'h1',
          { className: 'about-inner__title' },
          'About'
        ),
        _react2.default.createElement(
          'p',
          { className: 'about-inner__text' },
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, id!'
        )
      )
    )
  );
};

exports.default = about;

/***/ })
/******/ ]);