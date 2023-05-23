import { Strapi } from '@strapi/strapi';
import buildConfig from "./utils";
import  fetch  from "node-fetch";
interface PostBody  {
  event_type?: string;
  ref?: string;
  inputs?: {};
}

const commonHeaderParams = {
  "Accept": "application/vnd.github.v3+json",
  "X-GitHub-Api-Version": "2022-11-28"
};
function toConfigObj(config: []):{} {
  return config.reduce(
    (obj:any, item: any) => {obj[item.id] = item
      return obj}, {});
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async getRuns(params: any) {
    const config = buildConfig(strapi);
    const configObj: any = toConfigObj(config);

    if (!(params.id in configObj)) { return { data: {}} };

    const configEnv = configObj[params.id];
    const url: string = `https://api.github.com/repos/${configEnv.ghOrg}/${configEnv.ghRepo}/actions/workflows/${configEnv.ghWorflowFile}/runs?per_page=3`;
    console.log(config)
    const headerParams: {} = {
      "Authorization": `token ${configEnv.ghToken}`,
      ...commonHeaderParams
    };
    const responseFromGH = await fetch( url, {
      headers: headerParams
      });
    if (!responseFromGH.ok) {
      const message = {"error": `An error occurred; ${responseFromGH.status}`};
      return {
        "error": message,
        "data": {},
        "status": responseFromGH.status
      }
    }
    const data = await responseFromGH.json()
    return {"data": data};
  },
  async startRun(params:any) {
    const config = buildConfig(strapi);
    const configObj:any = toConfigObj(config);

    if (!(params.id in configObj)) { return { data: {}} };

    const configEnv = configObj[params.id];
    const url: string = `https://api.github.com/repos/${configEnv.ghOrg}/${configEnv.ghRepo}/actions/workflows/${configEnv.ghWorflowFile}/dispatches`;
    const hasEventType: boolean = "eventType" in configEnv && configEnv.eventType!=="" ? true : false;
    const hasRef: boolean = "ghRef" in configEnv && configEnv.ghRef!=="" ? true : false;
    const hasBodyInputs: boolean = "ghBodyInputs" in configEnv && Object.keys(configEnv.ghBodyInputs).length>0 ? true : false;
    const body: PostBody = {};
    if (hasEventType) {
      body["event_type"] = configEnv.eventType;
    }
    if (hasRef) {
      body["ref"] = configEnv.ghRef;
    }
    if (hasBodyInputs) {
      body["inputs"] = configEnv.ghBodyInputs;
    }

    const headerParams: {} = {
      "Authorization": `token ${configEnv.ghToken}`,
      "User-agent": configEnv.userAgent,
      ...commonHeaderParams
    };

    const responseFromGH = await fetch( url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headerParams
      });
    
    if (!responseFromGH.ok) {
        console.log(responseFromGH. status, responseFromGH.statusText)
        const message = {"error": `An error occurred; ${responseFromGH.status}`};
        return {
          "error": message,
          "data": {},
          "status": responseFromGH.status
        }
      }
    return {
      data: { "message": "run"},
      status: responseFromGH.status
    };
    

  },
});
