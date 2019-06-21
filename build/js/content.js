/* -------------------------------------------------- */
/*  Start of Webpack Chrome Hot Extension Middleware  */
/* ================================================== */
/*  This will be converted into a lodash templ., any  */
/*  external argument must be provided using it       */
/* -------------------------------------------------- */
var WebpackReloadPlugin = false;
(function (chrome, window) {
    const name = 'content';
    const id = parseInt('5');
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

/***/ 0:
/***/ (function(module, exports) {

eval("var core = module.exports = { version: '2.6.7' };\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcz8xNWUwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjYuNycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSA1IDYiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ext_sstorage__ = __webpack_require__(268);\n\n\nvar module = function () {\n  function addBoxStyles() {\n    var css = '\\n      .tm-box {\\n        font-family: Segoe UI;\\n        line-height: 18px;\\n        position: fixed;\\n        z-index: 9999;\\n        top: 20px;\\n        right: 20px;\\n        box-sizing: border-box;\\n        width: 550px;\\n        min-height: 114px;\\n        padding: 15px;\\n        text-align: left;\\n        transition: opacity .5s ease-out;\\n        cursor: move;\\n        user-select: none;\\n        border-radius: 5px;\\n        background-color: #ffffff;\\n        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);\\n      }\\n      .tm-box--hidden {\\n        visibility: hidden;\\n        opacity: 0;\\n      }\\n      .tm-box__content {\\n        font-size: 14px;\\n        color: #1C1C1C;\\n      }\\n      .tm-box__title {\\n        font-size: 12px;\\n        margin-top: 8px;\\n        color: #464646;\\n      }\\n    ';\n    var style = document.createElement('style');\n    style.type = 'text/css';\n    style.appendChild(document.createTextNode(css.trim()));\n\n    document.head.appendChild(style);\n  }\n\n  function appendBox() {\n    addBoxStyles();\n    var box = document.createElement('div');\n    box.className = 'tm-box tm-box--hidden';\n    var content = document.createElement('div');\n    content.className = 'tm-box__content';\n    var title = document.createElement('div');\n    title.className = 'tm-box__title';\n\n    box.appendChild(content);\n    box.appendChild(title);\n    document.body.appendChild(box);\n\n    return box;\n  }\n\n  return {\n    box: null,\n    bound: null,\n    x: 0,\n    y: 0,\n    getBoxPosition: function getBoxPosition(boxOffset, e) {\n      var x = e.clientX,\n          y = e.clientY;\n      var boxOffsetX = boxOffset.x,\n          boxOffsetY = boxOffset.y;\n\n      return {\n        'x': x - boxOffsetX + 'px',\n        'y': y - boxOffsetY + 'px'\n      };\n    },\n    getBoxOffset: function getBoxOffset(e) {\n      var y = e.clientY - e.currentTarget.offsetTop;\n      var x = e.clientX - e.currentTarget.offsetLeft;\n      return { x: x, y: y };\n    },\n    moveBox: function moveBox() {\n      var _this = this;\n\n      this.box.addEventListener('mousedown', function (e) {\n        var boxOffset = _this.getBoxOffset(e);\n        _this.bound = function (e) {\n          var _getBoxPosition$call = _this.getBoxPosition.call(e.currentTarget, boxOffset, e),\n              x = _getBoxPosition$call.x,\n              y = _getBoxPosition$call.y;\n\n          e.currentTarget.style.right = '';\n          e.currentTarget.style.left = x;\n          e.currentTarget.style.top = y;\n          _this.x = x;\n          _this.y = y;\n        };\n        _this.box.addEventListener('mousemove', _this.bound);\n      });\n    },\n    stopBox: function stopBox() {\n      var _this2 = this;\n\n      this.box.addEventListener('mouseup', function (e) {\n        __WEBPACK_IMPORTED_MODULE_0__ext_sstorage__[\"a\" /* default */].set('tmBoxCoor', { x: _this2.x, y: _this2.y });\n        _this2.box.removeEventListener('mousemove', _this2.bound);\n      });\n    },\n    putDefaultPlace: function putDefaultPlace() {\n      var _this3 = this;\n\n      this.box.addEventListener('dblclick', function (e) {\n        _this3.box.style.left = '';\n        _this3.box.style.right = '20px';\n        _this3.box.style.top = '20px';\n        __WEBPACK_IMPORTED_MODULE_0__ext_sstorage__[\"a\" /* default */].remove('tmBoxCoor');\n      });\n    },\n    putOnChangedPlace: function putOnChangedPlace() {\n      var coor = __WEBPACK_IMPORTED_MODULE_0__ext_sstorage__[\"a\" /* default */].get('tmBoxCoor');\n      if (coor) {\n        this.box.style.left = coor.x;\n        this.box.style.top = coor.y;\n      }\n    },\n    init: function init() {\n      // console.log('content init')\n      if (parent !== self) {\n        return;\n      }\n      this.box = appendBox();\n      this.putOnChangedPlace();\n      this.moveBox();\n      this.stopBox();\n      this.putDefaultPlace();\n    }\n  };\n}();\n\nmodule.init();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjY3LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9jb250ZW50L2luZGV4LmpzPzQyMWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNTdG9yYWdlIGZyb20gJy4uL2V4dC9zc3RvcmFnZSdcblxuY29uc3QgbW9kdWxlID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gYWRkQm94U3R5bGVzICgpIHtcbiAgICBjb25zdCBjc3MgPSBgXG4gICAgICAudG0tYm94IHtcbiAgICAgICAgZm9udC1mYW1pbHk6IFNlZ29lIFVJO1xuICAgICAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB6LWluZGV4OiA5OTk5O1xuICAgICAgICB0b3A6IDIwcHg7XG4gICAgICAgIHJpZ2h0OiAyMHB4O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogNTUwcHg7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDExNHB4O1xuICAgICAgICBwYWRkaW5nOiAxNXB4O1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC41cyBlYXNlLW91dDtcbiAgICAgICAgY3Vyc29yOiBtb3ZlO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICBib3gtc2hhZG93OiAwcHggM3B4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgICAgfVxuICAgICAgLnRtLWJveC0taGlkZGVuIHtcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuICAgICAgLnRtLWJveF9fY29udGVudCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgY29sb3I6ICMxQzFDMUM7XG4gICAgICB9XG4gICAgICAudG0tYm94X190aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgICAgICBjb2xvcjogIzQ2NDY0NjtcbiAgICAgIH1cbiAgICBgXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2NzcydcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MudHJpbSgpKSlcblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpXG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRCb3ggKCkge1xuICAgIGFkZEJveFN0eWxlcygpXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBib3guY2xhc3NOYW1lID0gJ3RtLWJveCB0bS1ib3gtLWhpZGRlbidcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICd0bS1ib3hfX2NvbnRlbnQnXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRpdGxlLmNsYXNzTmFtZSA9ICd0bS1ib3hfX3RpdGxlJ1xuXG4gICAgYm94LmFwcGVuZENoaWxkKGNvbnRlbnQpXG4gICAgYm94LmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYm94KVxuXG4gICAgcmV0dXJuIGJveFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBib3g6IG51bGwsXG4gICAgYm91bmQ6IG51bGwsXG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIGdldEJveFBvc2l0aW9uIChib3hPZmZzZXQsIGUpIHtcbiAgICAgIGNvbnN0IHsgY2xpZW50WDogeCwgY2xpZW50WTogeSB9ID0gZVxuICAgICAgY29uc3QgeyB4OiBib3hPZmZzZXRYLCB5OiBib3hPZmZzZXRZIH0gPSBib3hPZmZzZXRcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd4JzogeCAtIGJveE9mZnNldFggKyAncHgnLFxuICAgICAgICAneSc6IHkgLSBib3hPZmZzZXRZICsgJ3B4J1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0Qm94T2Zmc2V0IChlKSB7XG4gICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gZS5jdXJyZW50VGFyZ2V0Lm9mZnNldFRvcFxuICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGUuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0XG4gICAgICByZXR1cm4geyB4LCB5IH1cbiAgICB9LFxuICAgIG1vdmVCb3ggKCkge1xuICAgICAgdGhpcy5ib3guYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgYm94T2Zmc2V0ID0gdGhpcy5nZXRCb3hPZmZzZXQoZSlcbiAgICAgICAgdGhpcy5ib3VuZCA9IChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmdldEJveFBvc2l0aW9uLmNhbGwoZS5jdXJyZW50VGFyZ2V0LCBib3hPZmZzZXQsIGUpXG4gICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLnJpZ2h0ID0gJydcbiAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUubGVmdCA9IHhcbiAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUudG9wID0geVxuICAgICAgICAgIHRoaXMueCA9IHhcbiAgICAgICAgICB0aGlzLnkgPSB5XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ib3guYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdG9wQm94ICgpIHtcbiAgICAgIHRoaXMuYm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgICAgICBzU3RvcmFnZS5zZXQoJ3RtQm94Q29vcicsIHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfSlcbiAgICAgICAgdGhpcy5ib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBwdXREZWZhdWx0UGxhY2UgKCkge1xuICAgICAgdGhpcy5ib3guYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICB0aGlzLmJveC5zdHlsZS5sZWZ0ID0gJydcbiAgICAgICAgdGhpcy5ib3guc3R5bGUucmlnaHQgPSAnMjBweCdcbiAgICAgICAgdGhpcy5ib3guc3R5bGUudG9wID0gJzIwcHgnXG4gICAgICAgIHNTdG9yYWdlLnJlbW92ZSgndG1Cb3hDb29yJylcbiAgICAgIH0pXG4gICAgfSxcbiAgICBwdXRPbkNoYW5nZWRQbGFjZSAoKSB7XG4gICAgICBjb25zdCBjb29yID0gc1N0b3JhZ2UuZ2V0KCd0bUJveENvb3InKVxuICAgICAgaWYgKGNvb3IpIHtcbiAgICAgICAgdGhpcy5ib3guc3R5bGUubGVmdCA9IGNvb3IueFxuICAgICAgICB0aGlzLmJveC5zdHlsZS50b3AgPSBjb29yLnlcbiAgICAgIH1cbiAgICB9LFxuICAgIGluaXQgKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnQgaW5pdCcpXG4gICAgICBpZiAocGFyZW50ICE9PSBzZWxmKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5ib3ggPSBhcHBlbmRCb3goKVxuICAgICAgdGhpcy5wdXRPbkNoYW5nZWRQbGFjZSgpXG4gICAgICB0aGlzLm1vdmVCb3goKVxuICAgICAgdGhpcy5zdG9wQm94KClcbiAgICAgIHRoaXMucHV0RGVmYXVsdFBsYWNlKClcbiAgICB9XG4gIH1cbn0pKClcblxubW9kdWxlLmluaXQoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb250ZW50L2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWtDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvREE7QUFpRUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///267\n");

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(40);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);\n\n/* harmony default export */ __webpack_exports__[\"a\"] = ({\n  get: function get(key) {\n    try {\n      return JSON.parse(sessionStorage.getItem(key));\n    } catch (e) {}\n  },\n  set: function set(key, val) {\n    try {\n      sessionStorage.setItem(key, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(val));\n    } catch (e) {}\n  },\n  remove: function remove(key) {\n    try {\n      sessionStorage.removeItem(key);\n    } catch (e) {}\n  },\n  clear: function clear() {\n    try {\n      sessionStorage.clear();\n    } catch (e) {}\n  }\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjY4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9leHQvc3N0b3JhZ2UuanM/Njk1NyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0IChrZXkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSlcclxuICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgfSxcclxuICBzZXQgKGtleSwgdmFsKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsKSlcclxuICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgfSxcclxuICByZW1vdmUgKGtleSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gIH0sXHJcbiAgY2xlYXIgKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKVxyXG4gICAgfSBjYXRjaCAoZSkge31cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9leHQvc3N0b3JhZ2UuanMiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXBCQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///268\n");

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(41), __esModule: true };\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzPzlhZjEiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSA1IDYiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///40\n");

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

eval("var core = __webpack_require__(0);\nvar $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });\nmodule.exports = function stringify(it) { // eslint-disable-line no-unused-vars\n  return $JSON.stringify.apply($JSON, arguments);\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzP2FhNDIiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvcmUgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJyk7XG52YXIgJEpTT04gPSBjb3JlLkpTT04gfHwgKGNvcmUuSlNPTiA9IHsgc3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeSB9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuICRKU09OLnN0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJndW1lbnRzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDUgNiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///41\n");

/***/ })

/******/ });