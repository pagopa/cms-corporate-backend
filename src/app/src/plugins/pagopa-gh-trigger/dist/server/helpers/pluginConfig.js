"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluginId_1 = __importDefault(require("./pluginId"));
const getPluginConfig = (strapi) => {
    return strapi.plugin(pluginId_1.default).config('environments');
};
exports.default = getPluginConfig;
