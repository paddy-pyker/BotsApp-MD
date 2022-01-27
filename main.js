"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var baileys_1 = __importStar(require("@adiwajshing/baileys"));
var path_1 = require("path");
var fs = require('fs');
var chalk = require('chalk');
var wa = require('./core/helper');
var TRANSMIT = require('./core/transmission');
var STRINGS = require("./lib/db");
var alive = STRINGS.alive;
var _a = (0, baileys_1.useSingleFileAuthState)('./auth_info_multi.json'), state = _a.state, saveState = _a.saveState;
// start a connection 
var startSock = function () {
    var e_1, _a;
    var sock = (0, baileys_1.default)({
        printQRInTerminal: true,
        auth: state
    });
    var commandHandler = new Map();
    var moduleFiles = fs.readdirSync((0, path_1.join)(__dirname, 'modules')).filter(function (file) { return file.endsWith('.ts'); });
    var moduleSuccess = true;
    try {
        for (var moduleFiles_1 = __values(moduleFiles), moduleFiles_1_1 = moduleFiles_1.next(); !moduleFiles_1_1.done; moduleFiles_1_1 = moduleFiles_1.next()) {
            var file = moduleFiles_1_1.value;
            try {
                var command = require((0, path_1.join)(__dirname, 'modules', "".concat(file)));
                console.log(chalk.magentaBright("[INFO] Successfully imported module"), chalk.cyanBright.bold("".concat(file)));
                commandHandler.set(command.name, command);
            }
            catch (error) {
                moduleSuccess = false;
                console.log(chalk.blueBright.bold("[INFO] Could not import module"), chalk.redBright.bold("".concat(file)));
                console.log("[ERROR] ", error);
                process.exit();
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (moduleFiles_1_1 && !moduleFiles_1_1.done && (_a = moduleFiles_1.return)) _a.call(moduleFiles_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (moduleSuccess)
        console.log(chalk.green.bold("[INFO] All Plugins Installed Successfully. The bot is ready to use."));
    else
        console.log(chalk.red.bold("[ERROR] Some plugins weren't installed"));
    sock.ev.on('messages.upsert', function (m) { return __awaiter(void 0, void 0, void 0, function () {
        var chat, sender, groupMetaData, _a, BotsApp, command, args, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chat = m.messages[0];
                    sender = chat.key.remoteJid;
                    if (!sender.endsWith("@g.us")) return [3 /*break*/, 2];
                    return [4 /*yield*/, sock.groupMetadata(sender)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = '';
                    _b.label = 3;
                case 3:
                    groupMetaData = _a;
                    BotsApp = wa.resolve(chat, sock, groupMetaData);
                    if (!BotsApp.isCmd) return [3 /*break*/, 10];
                    console.log(chalk.redBright.bold("[INFO] ".concat(BotsApp.commandName, " command received.")));
                    command = commandHandler.get(BotsApp.commandName);
                    args = BotsApp.body.trim().split(/\s+/).slice(1);
                    if (!!command) return [3 /*break*/, 5];
                    return [4 /*yield*/, TRANSMIT.sendMessageWTyping(sock, BotsApp.chat, { text: "```Woops, invalid command! Use```  *.help*  ```to display the command list.```" })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
                case 5:
                    if (!(command && BotsApp.commandName == "help")) return [3 /*break*/, 9];
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, command.handle(sock, chat, BotsApp, args, commandHandler)];
                case 7:
                    _b.sent();
                    return [2 /*return*/];
                case 8:
                    err_1 = _b.sent();
                    console.log(chalk.red("[ERROR] ", err_1));
                    return [2 /*return*/];
                case 9:
                    try {
                        command.handle(sock, chat, BotsApp, args).catch(function (err) { return console.log("[ERROR] " + err); });
                    }
                    catch (err) {
                        console.log(chalk.red("[ERROR] ", err));
                    }
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    }); });
    sock.ev.on('connection.update', function (update) {
        var _a, _b;
        var connection = update.connection, lastDisconnect = update.lastDisconnect;
        if (connection === 'close') {
            // reconnect if not logged out
            if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut) {
                startSock();
            }
            else {
                console.log('connection closed');
            }
        }
        if (connection === 'open')
            sock.sendMessage(sock.user.id, { text: alive.ALIVE_MSG });
        console.log('connection update', update);
    });
    // listen for when the auth credentials is updated
    sock.ev.on('creds.update', saveState);
    return sock;
};
startSock();
