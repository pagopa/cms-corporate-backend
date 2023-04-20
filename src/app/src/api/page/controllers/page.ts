/**
 * page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page.page', 
    () => ({
    async findOne(ctx) {
        const { data } = await super.findOne(ctx);
        const url: string = data.attributes.url_path ? `${data.attributes.url_path}${data.attributes.slug}` : `/${data.attributes.slug}`;
        data.attributes = {...data.attributes, url: url};
        return data;
    },
}));
