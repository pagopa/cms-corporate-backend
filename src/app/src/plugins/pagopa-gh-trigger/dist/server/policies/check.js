"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../services/utils"));
const checkConfigRoles = (policyContext, _) => {
    const config = (0, utils_1.default)(strapi);
    const configRoles = config[0].rolesAllowed && config[0].rolesAllowed.length > 0 ? config[0].rolesAllowed : ["strapi-super-admin"];
    const userRoles = policyContext.state.user.roles;
    const hasRole = userRoles.find((r) => configRoles.includes(r.code));
    if (hasRole) {
        return true;
    }
    return false;
};
exports.default = checkConfigRoles;
