"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getRuns(ctx) {
        const response = await strapi
            .plugin('pagopa-gh-trigger')
            .service('actions')
            .getRuns(ctx.params);
        ctx.body = response.data;
    },
    async startRun(ctx) {
        const response = await strapi
            .plugin('pagopa-gh-trigger')
            .service('actions')
            .startRun(ctx.params);
        if (response.status >= 300) {
            return ctx.internalServerError(`Server error`);
        }
        ctx.status = response.status;
        ctx.body = response.data;
    },
});
