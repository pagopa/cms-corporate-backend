import { Strapi } from '@strapi/strapi';
import { Context } from 'koa';
import buildConfig from '../services/utils';

const checkConfigRoles = (policyContext: Context, _: any) => {
    const config = buildConfig(strapi);
    const configRoles = config[0].rolesAllowed && config[0].rolesAllowed.length > 0 ? config[0].rolesAllowed : ["strapi-super-admin"];
    const userRoles = policyContext.state.user.roles;
    const hasRole = userRoles.find((r: any) => configRoles.includes(r.code));
    if (hasRole) {
      return true;
    }
    return false;
  };

export default checkConfigRoles;