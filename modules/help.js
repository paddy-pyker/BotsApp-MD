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
exports.Strings = void 0;
exports.Strings = require("../lib/db");
var inputSanitization = require("../sidekick/input-sanitization");
var config = require("../config");
var TRANSMIT = require('../core/transmission');
var HELP = exports.Strings.help;
require('python-format-js');
module.exports = {
    name: "help",
    description: HELP.DESCRIPTION,
    extendedDescription: HELP.EXTENDED_DESCRIPTION,
    demo: { isEnabled: false },
    handle: function (client, chat, BotsApp, args, commandHandler) {
        return __awaiter(this, void 0, void 0, function () {
            var helpMessage, prefixRegex, prefixes, command, triggers, triggerss, i_1, buttons, i, button, buttonMessage, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helpMessage = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 11]);
                        prefixRegex = new RegExp(config.PREFIX, "g");
                        prefixes = /\/\^\[(.*)+]\/g/g.exec(prefixRegex)[1];
                        if (!!args[0]) return [3 /*break*/, 3];
                        helpMessage = HELP.HEAD;
                        commandHandler.forEach(function (element) {
                            helpMessage += HELP.TEMPLATE.format(prefixes[0] + element.name, element.description);
                        });
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: helpMessage })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        helpMessage = HELP.COMMAND_INTERFACE;
                        command = commandHandler.get(args[0]);
                        if (!command) return [3 /*break*/, 7];
                        triggers = "\n";
                        prefixes.split("").forEach(function (prefix) {
                            triggers += prefix + command.name + " | ";
                        });
                        triggerss = "";
                        for (i_1 = 0; i_1 < triggers.length - 3; i_1++) {
                            triggerss += triggers[i_1];
                        }
                        triggerss += '\n';
                        if (!command.demo.isEnabled) return [3 /*break*/, 5];
                        buttons = [];
                        helpMessage += HELP.COMMAND_INTERFACE_TEMPLATE.format(triggerss, command.extendedDescription) + HELP.FOOTER;
                        if (command.demo.text instanceof Array) {
                            for (i in command.demo.text) {
                                button = {
                                    buttonId: 'id' + i,
                                    buttonText: { displayText: command.demo.text[i] },
                                    type: 1
                                };
                                buttons.push(button);
                            }
                        }
                        else {
                            buttons.push({ buttonId: 'id1', buttonText: { displayText: command.demo.text }, type: 1 });
                        }
                        buttonMessage = {
                            text: helpMessage,
                            footer: "\n *tap the button below to try it out*",
                            buttons: buttons,
                            headerType: 1
                        };
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, buttonMessage)
                            //TODO: fix button clicking not working in individual chats
                        ];
                    case 4: return [2 /*return*/, _a.sent()
                        //TODO: fix button clicking not working in individual chats
                    ];
                    case 5:
                        helpMessage += HELP.COMMAND_INTERFACE_TEMPLATE.format(triggerss, command.extendedDescription);
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: helpMessage })];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: HELP.COMMAND_INTERFACE + "```Invalid Command. Check the correct name from```  *.help*  ```command list.```" })];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        err_1 = _a.sent();
                        return [4 /*yield*/, inputSanitization.handleError(err_1, client, BotsApp)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    },
};
