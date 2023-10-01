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
exports.deleteUserObject = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
var clerk = (0, clerk_sdk_node_1.Clerk)({ secretKey: process.env.CLERK_SECRET_KEY });
var deleteUserObject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, us, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                userId = req.params.userId;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 8, , 9]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { clientId: userId },
                        //include: { collections: { include: { favourites: true, watchlist: true } } },
                        include: { collection: true }
                    })];
            case 2:
                user = _d.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found.' })];
                }
                return [4 /*yield*/, prisma.favourites.deleteMany({ where: { collectionId: (_a = user.collection) === null || _a === void 0 ? void 0 : _a.id } })];
            case 3:
                _d.sent();
                return [4 /*yield*/, prisma.watchList.deleteMany({ where: { collectionId: (_b = user.collection) === null || _b === void 0 ? void 0 : _b.id } })];
            case 4:
                _d.sent();
                return [4 /*yield*/, prisma.collection.delete({ where: { id: (_c = user.collection) === null || _c === void 0 ? void 0 : _c.id } })];
            case 5:
                _d.sent();
                return [4 /*yield*/, prisma.user.delete({ where: { clientId: userId } })];
            case 6:
                _d.sent();
                return [4 /*yield*/, clerk.users.deleteUser(userId)];
            case 7:
                us = _d.sent();
                res.status(200).json({ message: 'User and associated data deleted successfully.', user: us });
                return [3 /*break*/, 9];
            case 8:
                error_1 = _d.sent();
                console.error('Error deleting user and associated data:', error_1);
                res.status(500).json({ message: 'An error occurred while deleting the user and associated data.' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserObject = deleteUserObject;
