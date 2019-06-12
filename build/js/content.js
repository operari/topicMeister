/* -------------------------------------------------- */
/*  Start of Webpack Chrome Hot Extension Middleware  */
/* ================================================== */
/*  This will be converted into a lodash templ., any  */
/*  external argument must be provided using it       */
/* -------------------------------------------------- */
var WebpackReloadPlugin = false;
(function (chrome, window) {
    const name = 'content';
    const id = parseInt('7');
    const wsHost = 'ws://localhost:9090/';
    const filename = 'js/content.js';
    const { runtime, tabs } = chrome;
    const logger = (msg, level = 'info') => console[level]('[ WCER: ' + msg + ' ]');
    const manifest = (runtime && runtime.getManifest) ? runtime.getManifest() : undefined;
    var path = (manifest ? manifest.name + ' | ' : '') + (name || filename);
    if (path.length > 43)
        path = path.slice(0, 20) + '...' + path.slice(-20);
    function init() {
        let timerId = null;
        let socket = null;
        try {
            socket = new WebSocket(wsHost + id.toString());
        }
        catch (err) {
            console.log(err);
        }
        let send = (type, data) => {
            if (typeof data === 'string') {
                data = (new Date()).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + ' - ' + path + ' | ' + data;
            }
            socket.send(JSON.stringify({ type, data }));
        };
        socket.onopen = () => {
            logger(wsHost);
            clearTimeout(timerId);
            WebpackReloadPlugin = true;
        };
        socket.onmessage = ({ data: json }) => {
            const { type, data } = JSON.parse(json);
            if (runtime.reload && type === 'restart') {
                send('restart', 'successfully restart');
                runtime.reload();
                runtime.restart();
            }
            if (type === 'reload' && id === data.id) {
                send('reloaded', 'successfully reloaded');
                window.location.reload();
            }
        };
        socket.onclose = ({ code }) => {
            logger("Socket connection closed.", 'warn');
            timerId = setTimeout(() => {
                logger('WEPR Attempting to reconnect ...');
                init();
                logger('Reconnected. Reloading plugin');
            }, 2000);
        };
        window.onbeforeunload = () => socket.close();
    }
    !WebpackReloadPlugin ? init() : logger('WebpackReloadPlugin: Socket already started !');
})(chrome, window);
/* ----------------------------------------------- */
/* End of Webpack Chrome Hot Extension Middleware  */
/* ----------------------------------------------- */ 
var content =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 267);
/******/ })
/************************************************************************/
/******/ ({

/***/ 267:
/***/ (function(module, exports) {

eval("function cloudStyles() {\n  var css = '\\n    .tm-cloud {\\n      font-family: Segoe UI;\\n      line-height: 18px;\\n      position: fixed;\\n      z-index: 9999;\\n      top: 20px;\\n      right: 20px;\\n      box-sizing: border-box;\\n      width: 550px;\\n      min-height: 114px;\\n      padding: 15px;\\n      cursor: pointer;\\n      user-select: none;\\n      border-radius: 5px;\\n      background-color: #ffffff;\\n      box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);\\n    }\\n    .tm-cloud--hidden {\\n      display: none;\\n    }\\n    .tm-cloud__content {\\n      font-size: 14px;\\n      color: #1C1C1C;\\n    }\\n    .tm-cloud__title {\\n      font-size: 12px;\\n      margin-top: 8px;\\n      color: #464646;\\n    }\\n  ';\n  var style = document.createElement('style');\n  style.type = 'text/css';\n  style.appendChild(document.createTextNode(css.trim()));\n\n  document.head.appendChild(style);\n}\n\n(function (cb) {\n  var cloud = document.createElement('div');\n  cloud.className = 'tm-cloud tm-cloud--hidden';\n  var content = document.createElement('div');\n  content.className = 'tm-cloud__content';\n  var title = document.createElement('div');\n  title.className = 'tm-cloud__title';\n\n  cloud.appendChild(content);\n  cloud.appendChild(title);\n  document.body.appendChild(cloud);\n\n  cb();\n})(cloudStyles);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjY3LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9jb250ZW50L2luZGV4LmpzPzQyMWYiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY2xvdWRTdHlsZXMgKCkge1xuICBjb25zdCBjc3MgPSBgXG4gICAgLnRtLWNsb3VkIHtcbiAgICAgIGZvbnQtZmFtaWx5OiBTZWdvZSBVSTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgei1pbmRleDogOTk5OTtcbiAgICAgIHRvcDogMjBweDtcbiAgICAgIHJpZ2h0OiAyMHB4O1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIHdpZHRoOiA1NTBweDtcbiAgICAgIG1pbi1oZWlnaHQ6IDExNHB4O1xuICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgIGJveC1zaGFkb3c6IDBweCAzcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gICAgfVxuICAgIC50bS1jbG91ZC0taGlkZGVuIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC50bS1jbG91ZF9fY29udGVudCB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogIzFDMUMxQztcbiAgICB9XG4gICAgLnRtLWNsb3VkX190aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgICBjb2xvcjogIzQ2NDY0NjtcbiAgICB9XG4gIGBcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnXG4gIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcy50cmltKCkpKVxuXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpXG59XG5cbihmdW5jdGlvbiAoY2IpIHtcbiAgY29uc3QgY2xvdWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjbG91ZC5jbGFzc05hbWUgPSAndG0tY2xvdWQgdG0tY2xvdWQtLWhpZGRlbidcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnRlbnQuY2xhc3NOYW1lID0gJ3RtLWNsb3VkX19jb250ZW50J1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIHRpdGxlLmNsYXNzTmFtZSA9ICd0bS1jbG91ZF9fdGl0bGUnXG5cbiAgY2xvdWQuYXBwZW5kQ2hpbGQoY29udGVudClcbiAgY2xvdWQuYXBwZW5kQ2hpbGQodGl0bGUpXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvdWQpXG5cbiAgY2IoKVxufSkoY2xvdWRTdHlsZXMpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbnRlbnQvaW5kZXguanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUErQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///267\n");

/***/ })

/******/ });