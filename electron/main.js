
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
var path = require("path");
var fs_1 = require("fs");
var electron_1 = require("electron");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1024,
        height: 728,
        show: false,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    if (process.env.IS_DEV) {
        win.loadURL("http://localhost:3000/");
    }
    else {
        win.loadFile(path.join(__dirname, "../build/index.html"));
        win.removeMenu();
    }
    win.maximize();
    win.once("ready-to-show", function () {
        win.show();
    });
    win.once("close", function () {
        electron_1.app.quit();
    });
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.ipcMain.on('open_file_dialog', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: [{ name: 'csv File', extensions: ['csv'] }]
                })];
            case 1:
                filePath = _a.sent();
                response = {};
                if (!filePath.canceled) {
                    response = {
                        success: true,
                        message: filePath.filePaths[0]
                    };
                }
                else {
                    response = {
                        success: false
                    };
                }
                e.sender.send('open_file_dialog_response', response);
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('generate_PDF_data', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, win.webContents.printToPDF({
                        landscape: true,
                        marginsType: 1,
                        pageSize: 'A4',
                        printBackground: true
                    })];
            case 2:
                data = _a.sent();
                response.success = true;
                response.message = data;
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                response.success = false;
                response.message = err_1;
                return [3 /*break*/, 4];
            case 4:
                e.sender.send('generate_PDF_data_response', response);
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('get_save_path', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, electron_1.dialog.showSaveDialog({
                    properties: ['createDirectory'],
                    filters: [{ name: 'pdf File', extensions: ['pdf'] }]
                })];
            case 1:
                filePath = _a.sent();
                response = {};
                if (!filePath.canceled) {
                    response.success = true;
                    response.message = filePath.filePath;
                }
                else {
                    response.success = false;
                }
                e.sender.send('get_save_path_response', response);
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('print_file', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        win.webContents.print({}, function (success, err) {
            var response = {};
            if (success) {
                response.success = true;
            }
            else {
                response.success = false;
                response.message = err;
            }
            e.sender.send('print_file_response', response);
        });
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('open_file', function (e, arg) {
    console.log(arg);
    var data = fs_1.readFileSync(arg, 'utf-8');
    var response = {};
    response = {
        success: true,
        message: data
    };
    e.sender.send('open_file_response', response);
});
