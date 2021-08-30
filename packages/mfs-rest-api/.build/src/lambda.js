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
exports.handler = void 0;
var aws_serverless_express_1 = require("aws-serverless-express");
var middleware_1 = require("aws-serverless-express/middleware");
var cors = require('cors');
var core_1 = require("@nestjs/core");
var platform_express_1 = require("@nestjs/platform-express");
var app_module_1 = require("./app.module");
var express = require('express');
// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
var binaryMimeTypes = [];
var cachedServer;
function bootstrapServer() {
    return __awaiter(this, void 0, void 0, function () {
        var expressApp, nestApp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!cachedServer) return [3 /*break*/, 3];
                    expressApp = express();
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp))];
                case 1:
                    nestApp = _a.sent();
                    nestApp.enableCors({
                        origin: true
                    });
                    expressApp.use(cors());
                    nestApp.use((0, middleware_1.eventContext)());
                    nestApp.use(function (req, res, next) {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
                        next();
                    });
                    return [4 /*yield*/, nestApp.init()];
                case 2:
                    _a.sent();
                    cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
                    _a.label = 3;
                case 3: return [2 /*return*/, cachedServer];
            }
        });
    });
}
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bootstrapServer()];
            case 1:
                cachedServer = _a.sent();
                return [2 /*return*/, (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise];
        }
    });
}); };
exports.handler = handler;
