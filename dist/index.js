"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var Routes_1 = __importDefault(require("./Routes/Routes"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
var whitelist = ['*', 'http://localhost:5173', 'https://vidstream.vercel.app'];
var corsOptions = {
    origins: whitelist,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
};
app.use((0, cors_1.default)(corsOptions));
app.use('/vidstream-clients-server', Routes_1.default);
app.listen(PORT, function () { return console.log("[server]:Server running at port :".concat(PORT)); });
