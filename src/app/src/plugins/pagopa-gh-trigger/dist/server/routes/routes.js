"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluginId_1 = __importDefault(require("../helpers/pluginId"));
const routes = {
    // accessible only from admin UI
    type: 'admin',
    routes: [
        {
            method: 'GET',
            path: '/config',
            handler: 'config.getConfig',
            config: {
                policies: [`plugin::${pluginId_1.default}.checkConfigRoles`],
            },
        },
        {
            method: 'GET',
            path: '/runs/:id',
            handler: 'actions.getRuns',
            config: {
                policies: [`plugin::${pluginId_1.default}.checkConfigRoles`],
            },
        },
        {
            method: 'POST',
            path: '/run/:id',
            handler: 'actions.startRun',
            config: {
                policies: [`plugin::${pluginId_1.default}.checkConfigRoles`],
            },
        },
    ],
};
exports.default = routes;
