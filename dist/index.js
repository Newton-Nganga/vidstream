"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var Routes_1 = __importDefault(require("./Routes/Routes"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
var PORT = 8000;
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/vidstream-clients-server', Routes_1.default);
app.listen(PORT, function () { return console.log("[server]:Server running at port :".concat(PORT)); });
