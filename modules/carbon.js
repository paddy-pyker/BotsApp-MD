"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
exports.String = require("../lib/db");
var Carbon = require("unofficial-carbon-now");
var inputSanitization = require("../sidekick/input-sanitization");
var CARBON = exports.String.carbon;
var TRANSMIT = require('../core/transmission');
module.exports = {
    name: "carbon",
    description: CARBON.DESCRIPTION,
    extendedDescription: CARBON.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".carbon Hi! Welcome to BotsApp.",
            '.carbon #include <iostream> \nint main() \n{\n   std::cout << "Hello BotsApp!"; \n   return 0;\n} -t yeti',
            ".carbon -t",
        ],
    },
    handle: function (client, chat, BotsApp, args, fromCode) {
        if (fromCode === void 0) { fromCode = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var themes, code, themeInput, text, counter_1, message, body, err_1, carbon, output, err_2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 21, , 23]);
                        themes = [
                            "3024 night",
                            "a11y dark",
                            "blackboard",
                            "base 16 (dark)",
                            "base 16 (light)",
                            "cobalt",
                            "duotone",
                            "hopscotch",
                            "lucario",
                            "material",
                            "monokai",
                            "night owl",
                            "nord",
                            "oceanic next",
                            "one light",
                            "one dark",
                            "panda",
                            "paraiso",
                            "seti",
                            "shades of purple",
                            "solarized (dark)",
                            "solarized (light)",
                            "synthwave '84",
                            "twilight",
                            "verminal",
                            "vscode",
                            "yeti",
                            "zenburn",
                        ];
                        code = "";
                        themeInput = "";
                        if (!(args[0] == null && !BotsApp.isReply)) return [3 /*break*/, 2];
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CARBON.NO_INPUT })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(BotsApp.isReply && !BotsApp.replyMessage)) return [3 /*break*/, 4];
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CARBON.INVALID_REPLY })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (!BotsApp.isReply) return [3 /*break*/, 5];
                        code = BotsApp.replyMessage;
                        themeInput = themes[Math.floor(Math.random() * themes.length)];
                        return [3 /*break*/, 13];
                    case 5:
                        _a.trys.push([5, 12, , 13]);
                        text = BotsApp.body.replace(BotsApp.body[0] + BotsApp.commandName + " ", "");
                        if (!(text[0] === "-" && text[1] === "t")) return [3 /*break*/, 9];
                        if (!(text[2] == null)) return [3 /*break*/, 7];
                        counter_1 = 1;
                        message = 'Available themes: ';
                        themes.forEach(function (theme) {
                            message += "\n".concat(counter_1, ". ").concat(theme);
                            counter_1 += 1;
                        });
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: "```" + message + "```" })];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CARBON.NO_INPUT })];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9:
                        body = BotsApp.body.split("-t");
                        code = body[0].replace(BotsApp.body[0] + BotsApp.commandName + " ", "");
                        themeInput = body[1].substring(1);
                        if (!!themes.includes(themeInput)) return [3 /*break*/, 11];
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CARBON.INVALID_THEME })];
                    case 10: return [2 /*return*/, _a.sent()];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_1 = _a.sent();
                        if (err_1 instanceof TypeError) {
                            code = BotsApp.body.replace(BotsApp.body[0] + BotsApp.commandName + " ", "");
                            themeInput =
                                themes[Math.floor(Math.random() * themes.length)];
                        }
                        return [3 /*break*/, 13];
                    case 13:
                        _a.trys.push([13, 18, , 20]);
                        if (!!fromCode) return [3 /*break*/, 15];
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CARBON.CARBONIZING })];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        carbon = new Carbon.createCarbon()
                            .setCode(code)
                            .setPrettify(true)
                            .setTheme(themeInput);
                        return [4 /*yield*/, Carbon.generateCarbon(carbon)];
                    case 16:
                        output = _a.sent();
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { image: output, caption: fromCode ? fromCode : "" })];
                    case 17: return [2 /*return*/, _a.sent()];
                    case 18:
                        err_2 = _a.sent();
                        return [4 /*yield*/, inputSanitization.handleError(err_2, client, BotsApp)];
                    case 19:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 20: return [3 /*break*/, 23];
                    case 21:
                        err_3 = _a.sent();
                        return [4 /*yield*/, inputSanitization.handleError(err_3, client, BotsApp)];
                    case 22:
                        _a.sent();
                        return [3 /*break*/, 23];
                    case 23: return [2 /*return*/];
                }
            });
        });
    },
};
