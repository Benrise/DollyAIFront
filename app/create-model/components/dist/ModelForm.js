"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ModelForm = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var ui_1 = require("@/app/shared/ui");
var Text = antd_1.Typography.Text, Paragraph = antd_1.Typography.Paragraph;
var Dragger = antd_1.Upload.Dragger;
function ModelForm() {
    var _this = this;
    var _a = react_1.useState(''), modelName = _a[0], setModelName = _a[1];
    var _b = react_1.useState([]), fileList = _b[0], setFileList = _b[1];
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    fileList.forEach(function (file) {
                        formData.append('images', file.originFileObj);
                    });
                    formData.append('name', modelName);
                    return [4 /*yield*/, fetch('/api/create-model', {
                            method: 'POST',
                            body: formData
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data === null || data === void 0 ? void 0 : data.message) {
                        antd_1.message.success(data.message);
                    }
                    else {
                        antd_1.message.error('Error creating model');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var uploadProps = {
        beforeUpload: function (file) {
            if (fileList.length >= 15) {
                antd_1.message.error('You can only upload up to 15 files.');
                return false;
            }
            return true;
        },
        onChange: function (info) {
            setFileList(info.fileList);
        },
        fileList: fileList,
        multiple: true
    };
    return (React.createElement(antd_1.Form, { onFinish: handleSubmit, layout: "vertical" },
        React.createElement(antd_1.Form.Item, { label: "Upload Photos", rules: [{ required: true, message: 'Please upload between 10 to 15 photos!' }] },
            React.createElement(Dragger, __assign({}, uploadProps),
                React.createElement("div", { className: "p-6" },
                    React.createElement("p", { className: "ant-upload-drag-icon" },
                        React.createElement(icons_1.UploadOutlined, { size: 48 })),
                    React.createElement(Text, { type: "secondary" }, "Upload (10-15 photos)")))),
        React.createElement(antd_1.Form.Item, { name: "name", label: "Model Name", rules: [{ required: true, message: 'Please enter the model name!' }] },
            React.createElement(antd_1.Input, { placeholder: "Enter model name", value: modelName, onChange: function (e) { return setModelName(e.target.value); }, size: 'large' })),
        React.createElement(antd_1.Space, { direction: "vertical", size: "middle", className: 'bg-indigo-50 border-2 border-indigo-400 rounded-xl p-6 mb-6 w-full' },
            React.createElement(Paragraph, { style: { color: 'var(--ant-primary-color)' } },
                "To achieve maximum accuracy, it is recommended to ",
                React.createElement(ui_1.HighlightedText, null, "upload 10-15 photos."),
                " The ",
                React.createElement(ui_1.HighlightedText, null, "more"),
                " pictures there are, the ",
                React.createElement(ui_1.HighlightedText, null, "better"),
                " the neural network will be able to understand your ",
                React.createElement(ui_1.HighlightedText, null, "unique"),
                " features."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement(Text, null,
                        React.createElement(ui_1.HighlightedText, null, "\u2022"),
                        " Use photos from different angles (front, side, half-turn).")),
                React.createElement("li", null,
                    React.createElement(Text, null,
                        React.createElement(ui_1.HighlightedText, null, "\u2022"),
                        " Include full-length and portrait shots.")),
                React.createElement("li", null,
                    React.createElement(Text, null,
                        React.createElement(ui_1.HighlightedText, null, "\u2022"),
                        " Add photos with different emotions (smile, serious expression, etc.)."))),
            React.createElement(Paragraph, null,
                "The more ",
                React.createElement(ui_1.HighlightedText, null, "diverse your"),
                " pictures are, the ",
                React.createElement(ui_1.HighlightedText, null, "more realistic"),
                " and ",
                React.createElement(ui_1.HighlightedText, null, "accurate"),
                " the result.")),
        React.createElement(antd_1.Form.Item, null,
            React.createElement("div", { className: "flex gap-2" },
                React.createElement(antd_1.Button, { block: true, type: "default", htmlType: "button", size: 'large' }, "Cancel"),
                React.createElement(antd_1.Button, { block: true, type: "primary", htmlType: "submit", size: 'large' }, "Create Model")))));
}
exports.ModelForm = ModelForm;
