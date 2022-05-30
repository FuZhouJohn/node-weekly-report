"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var homedir = os_1.default.homedir();
var home = process.env.HOME || homedir;
var dbPath = path_1.default.join(home, '.weekly-report');
exports.read = function (path) {
    if (path === void 0) { path = dbPath; }
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, { flag: 'a+' }, function (error, data) {
            if (error) {
                console.log(error);
                return reject(error);
            }
            var list;
            try {
                list = JSON.parse(data.toString());
            }
            catch (e) {
                list = [];
            }
            resolve(list);
        });
    });
};
exports.write = function (list, path) {
    if (path === void 0) { path = dbPath; }
    return new Promise(function (resolve, reject) {
        var data = JSON.stringify(list);
        fs_1.default.writeFile(path, data, function (error) {
            if (error)
                return reject(error);
            resolve('success');
        });
    });
};
