self["webpackHotUpdatetapering_antidepressant"]("app",{

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_1 = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
var HomePage_1 = __importDefault(__webpack_require__(/*! ./pages/HomePage */ "./src/pages/HomePage.tsx"));
var LoggingConfigurationPage_1 = __importDefault(__webpack_require__(/*! ./pages/LoggingConfigurationPage */ "./src/pages/LoggingConfigurationPage.tsx"));
var SymptomReportPage_1 = __importDefault(__webpack_require__(/*! ./pages/SymptomReportPage */ "./src/pages/SymptomReportPage.tsx"));
var LoginPage_1 = __importDefault(__webpack_require__(/*! ./pages/LoginPage */ "./src/pages/LoginPage.tsx"));
__webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");
var utils_1 = __webpack_require__(/*! ./pages/utils */ "./src/pages/utils.tsx");
var NavBar_1 = __importDefault(__webpack_require__(/*! ./components/NavBar */ "./src/components/NavBar.tsx"));
var Header_1 = __importDefault(__webpack_require__(/*! ./components/Header */ "./src/components/Header.tsx"));
__webpack_require__(/*! ./app.css */ "./src/app.css");
var mainStyle = react_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  padding: 0 35px 34px 35px;\n\n  & > div {\n    background-color: #fafafa;\n    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);\n    border-radius: 20px;\n    height: 100%;\n    padding: 31px 45px 21px 45px;\n  }\n"], ["\n  flex: 1;\n  padding: 0 35px 34px 35px;\n\n  & > div {\n    background-color: #fafafa;\n    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);\n    border-radius: 20px;\n    height: 100%;\n    padding: 31px 45px 21px 45px;\n  }\n"])));
var App = function () {
    var _a = react_redux_1.useSelector(function (state) { return state.user; }), me = _a.me, currentPatient = _a.currentPatient;
    var dispatch = react_redux_1.useDispatch();
    /*
    useEffect(() => {
      // dispatch<LoginRequestAction>({
      //   type: LOGIN_REQUEST,
      //   data: { email: 'clinician@gmail.com', password: '1234' },
      // });
    }, []);
     */
    // url(${JomhuriaWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
    // url(${JomhuriaWoff}) format('woff');  /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: !me ? jsx_runtime_1.jsx(LoginPage_1["default"], {}, void 0)
            : (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsx(react_router_dom_1.HashRouter, { children: jsx_runtime_1.jsxs("div", __assign({ css: react_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                height: 100%;\n                display: flex;\n                font-family: Verdana;\n                flex-direction: column;\n\n                input[type=number]::-webkit-inner-spin-button,\n                input[type=number]::-webkit-outer-spin-button {\n                  opacity: 1;\n                }"], ["\n                height: 100%;\n                display: flex;\n                font-family: Verdana;\n                flex-direction: column;\n\n                input[type=number]::-webkit-inner-spin-button,\n                input[type=number]::-webkit-outer-spin-button {\n                  opacity: 1;\n                }"]))) }, { children: [jsx_runtime_1.jsx(Header_1["default"], {}, void 0),
                            jsx_runtime_1.jsxs("section", __assign({ css: react_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                  display: flex;\n                  height: 95%;\n                  padding-top: 2%;\n                "], ["\n                  display: flex;\n                  height: 95%;\n                  padding-top: 2%;\n                "]))) }, { children: [jsx_runtime_1.jsx(NavBar_1["default"], {}, void 0),
                                    jsx_runtime_1.jsx("main", __assign({ css: mainStyle }, { children: jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsxs(react_router_dom_1.Switch, { children: [jsx_runtime_1.jsx(react_router_dom_1.Route, { path: '/logging-configuration', render: utils_1.checkCurrentPatientAndRender(currentPatient, LoggingConfigurationPage_1["default"]) }, void 0),
                                                    jsx_runtime_1.jsx(react_router_dom_1.Route, { path: '/symptom-report', render: utils_1.checkCurrentPatientAndRender(currentPatient, SymptomReportPage_1["default"]) }, void 0),
                                                    jsx_runtime_1.jsx(react_router_dom_1.Route, { path: "/", component: HomePage_1["default"] }, void 0)] }, void 0) }, void 0) }), void 0)] }), void 0)] }), void 0) }, void 0) }, void 0)) }, void 0));
};
exports.default = App;
var templateObject_1, templateObject_2, templateObject_3;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c54e33e08051ebc42e03")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=app.657b23895e6c4c424ab1.hot-update.js.map