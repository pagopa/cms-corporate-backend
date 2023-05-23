"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    getConfig(ctx) {
        ctx.body = strapi
            .plugin('pagopa-gh-trigger')
            .service('config')
            .getConfig();
    },
});
