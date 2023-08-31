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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.fetchOrUpdateUser = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var fetchOrUpdateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, clientId, username, email, imageUrl, user, updated, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                _a = req.body, clientId = _a.clientId, username = _a.username, email = _a.email, imageUrl = _a.imageUrl;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 13, , 14]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { clientId: userId },
                        include: { collection: { include: { favourites: true, watchList: true } } },
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found.' })];
                }
                updated = false;
                if (!(clientId && user.clientId !== clientId)) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.user.update({
                        where: { clientId: userId },
                        data: { clientId: clientId },
                        include: { collection: { include: { favourites: true, watchList: true } } }
                    })];
            case 3:
                user = _b.sent();
                updated = true;
                _b.label = 4;
            case 4:
                if (!(username && user.username !== username)) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.user.update({
                        where: { clientId: userId },
                        data: { username: username },
                        include: { collection: { include: { favourites: true, watchList: true } } }
                    })];
            case 5:
                user = _b.sent();
                updated = true;
                _b.label = 6;
            case 6:
                if (!(email && user.email !== email)) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.user.update({
                        where: { clientId: userId },
                        data: { email: email },
                        include: { collection: { include: { favourites: true, watchList: true } } }
                    })];
            case 7:
                user = _b.sent();
                updated = true;
                _b.label = 8;
            case 8:
                if (!(imageUrl && user.imageUrl !== imageUrl)) return [3 /*break*/, 10];
                return [4 /*yield*/, prisma.user.update({
                        where: { clientId: userId },
                        data: { imageUrl: imageUrl },
                        include: { collection: { include: { favourites: true, watchList: true } } }
                    })];
            case 9:
                user = _b.sent();
                updated = true;
                _b.label = 10;
            case 10:
                if (!updated) return [3 /*break*/, 12];
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { clientId: userId },
                        include: { collection: { include: { favourites: true, watchList: true } } },
                    })];
            case 11:
                user = _b.sent();
                _b.label = 12;
            case 12:
                res.status(200).json({ message: 'User fetched and updated (if necessary) successfully.', user: user });
                return [3 /*break*/, 14];
            case 13:
                error_1 = _b.sent();
                console.error('Error fetching and updating user data:', error_1);
                res.status(500).json({ message: 'An error occurred while fetching and updating user data.' });
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.fetchOrUpdateUser = fetchOrUpdateUser;
