"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const commonHeaderParams = {
    "Accept": "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28"
};
function toConfigObj(config) {
    return config.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {});
}
exports.default = ({ strapi }) => ({
    async getRuns(params) {
        const config = (0, utils_1.default)(strapi);
        const configObj = toConfigObj(config);
        if (!(params.id in configObj)) {
            return { data: {} };
        }
        ;
        const configEnv = configObj[params.id];
        const url = `https://api.github.com/repos/${configEnv.ghOrg}/${configEnv.ghRepo}/actions/workflows/${configEnv.ghWorflowFile}/runs?per_page=3`;
        console.log(config);
        const headerParams = {
            "Authorization": `token ${configEnv.ghToken}`,
            ...commonHeaderParams
        };
        const responseFromGH = await (0, node_fetch_1.default)(url, {
            headers: headerParams
        });
        if (!responseFromGH.ok) {
            const message = { "error": `An error occurred; ${responseFromGH.status}` };
            return {
                "error": message,
                "data": {},
                "status": responseFromGH.status
            };
        }
        const data = await responseFromGH.json();
        return { "data": data };
    },
    async startRun(params) {
        const config = (0, utils_1.default)(strapi);
        const configObj = toConfigObj(config);
        if (!(params.id in configObj)) {
            return { data: {} };
        }
        ;
        const configEnv = configObj[params.id];
        const url = `https://api.github.com/repos/${configEnv.ghOrg}/${configEnv.ghRepo}/actions/workflows/${configEnv.ghWorflowFile}/dispatches`;
        const hasEventType = "eventType" in configEnv && configEnv.eventType !== "" ? true : false;
        const hasRef = "ghRef" in configEnv && configEnv.ghRef !== "" ? true : false;
        const hasBodyInputs = "ghBodyInputs" in configEnv && Object.keys(configEnv.ghBodyInputs).length > 0 ? true : false;
        const body = {};
        if (hasEventType) {
            body["event_type"] = configEnv.eventType;
        }
        if (hasRef) {
            body["ref"] = configEnv.ghRef;
        }
        if (hasBodyInputs) {
            body["inputs"] = configEnv.ghBodyInputs;
        }
        const headerParams = {
            "Authorization": `token ${configEnv.ghToken}`,
            "User-agent": configEnv.userAgent,
            ...commonHeaderParams
        };
        const responseFromGH = await (0, node_fetch_1.default)(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headerParams
        });
        if (!responseFromGH.ok) {
            console.log(responseFromGH.status, responseFromGH.statusText);
            const message = { "error": `An error occurred; ${responseFromGH.status}` };
            return {
                "error": message,
                "data": {},
                "status": responseFromGH.status
            };
        }
        return {
            data: { "message": "run" },
            status: responseFromGH.status
        };
    },
});
