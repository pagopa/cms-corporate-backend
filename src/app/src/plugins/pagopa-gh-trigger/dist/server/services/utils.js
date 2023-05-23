"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluginConfig_1 = __importDefault(require("../helpers/pluginConfig"));
const buildConfig = (strapi) => {
    const pluginConfig = (0, pluginConfig_1.default)(strapi);
    return pluginConfig;
};
exports.default = buildConfig;
