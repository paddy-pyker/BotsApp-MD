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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
exports.String = require("../lib/db");
var Carbon = require("./carbon");
var inputSanitization = require("../sidekick/input-sanitization");
var CODE = exports.String.code;
var TRANSMIT = require('../core/transmission');
var request = require('request');
var config = require("../config");
module.exports = {
    name: "code",
    description: CODE.DESCRIPTION,
    extendedDescription: CODE.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".code -a",
            '.code -a cpp  \n\n#include <iostream> \nint main() \n{\n   std::cout << "Hello BotsApp!"; \n   return 0;\n}',
            '.code -a python3 \n\nprint("I can now speak in snake tongues")'
        ],
    },
    handle: function (client, chat, BotsApp, args) {
        return __awaiter(this, void 0, void 0, function () {
            var langs, languages, script, language, langversion, counter_1, message, criteria, re, program, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 15]);
                        langs = new Map([
                            ['bash', 4],
                            ['java', 4],
                            ['c', 5],
                            ['cpp', 5],
                            ['cpp14', 4],
                            ['cpp17', 1],
                            ['php', 4],
                            ['perl', 4],
                            ['python2', 3],
                            ['python3', 4],
                            ['ruby', 4],
                            ['go', 4],
                            ['scala', 4],
                            ['sql', 3],
                            ['csharp', 4],
                            ['objc', 4],
                            ['swift', 4],
                            ['lua', 3],
                            ['r', 4],
                            ['verilog', 3],
                            ['dart', 4],
                            ['nodejs', 4],
                            ['coffeescript', 4],
                            ['fsharp', 1],
                            ['kotlin', 3]
                        ]);
                        languages = new Map(__spreadArray([], __read(langs.entries()), false).sort());
                        if (!(args[0] == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CODE.NO_INPUT })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(args[0][0] === '-' && args[0][1] === 'a')) return [3 /*break*/, 10];
                        if (!(args[1] === undefined)) return [3 /*break*/, 4];
                        counter_1 = 1;
                        message = 'Available languages: ';
                        languages.forEach(function (ver_code, lang) {
                            message += "\n".concat(counter_1, ". ").concat(lang);
                            counter_1 += 1;
                        });
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: "```" + message + "```" })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        //parse success, extract contents
                        language = args[1];
                        if (!!languages.has(language)) return [3 /*break*/, 6];
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CODE.LANG_NOT_FOUND })];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        langversion = languages.get(language);
                        criteria = "-a\\s+" + language + "\\s+\\n*";
                        re = new RegExp(criteria);
                        script = BotsApp.body.trim().split(re).slice(1)[0];
                        console.log(script);
                        program = {
                            script: script,
                            language: language,
                            versionIndex: langversion,
                            clientId: config.CODE_CLIENT_ID,
                            clientSecret: config.CODE_CLIENT_SECRET,
                            stdin: 2
                        };
                        return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CODE.PROCESSING })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, request({
                                url: 'https://api.jdoodle.com/v1/execute',
                                method: "POST",
                                json: program
                            }, function (error, response, body) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var ExecutionResults;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                console.log('error:', error);
                                                console.log('statusCode:', response && response.statusCode);
                                                console.log('body:', body);
                                                if (!error) return [3 /*break*/, 2];
                                                return [4 /*yield*/, inputSanitization.handleError(error, client, BotsApp)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                            case 2:
                                                if (!response) return [3 /*break*/, 6];
                                                if (!(response.statusCode == 429)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CODE.DAILY_LIMIT_REACHED })];
                                            case 3: return [2 /*return*/, _a.sent()];
                                            case 4:
                                                if (!(response.statusCode == 200)) return [3 /*break*/, 6];
                                                ExecutionResults = "*Output*: " + body.output + "\n\n" + "```Memory: " + body.memory + "\n" + "CpuTime: " + body.cpuTime + "```";
                                                return [4 /*yield*/, Carbon.handle(client, BotsApp.chat, BotsApp, script, ExecutionResults)];
                                            case 5: return [2 /*return*/, _a.sent()];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, TRANSMIT.sendMessageWTyping(client, BotsApp.chat, { text: CODE.PARSE_FAILED })];
                    case 11: 
                    //parsing failed
                    return [2 /*return*/, _a.sent()];
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        err_1 = _a.sent();
                        return [4 /*yield*/, inputSanitization.handleError(err_1, client, BotsApp)];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    }
};
