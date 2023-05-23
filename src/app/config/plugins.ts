export default ({ env }) => ({
    upload: {
      config: {
        provider: "strapi-provider-upload-aws-s3-advanced",
        providerOptions: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            bucket: env("AWS_BUCKET_NAME"),
          },
          baseUrl: env("CDN_BASE_URL"),
          prefix: env("BUCKET_PREFIX"),
        },
      },
    },
    'strapi-plugin-sso': {
        enabled: true,
        config: {
          GOOGLE_OAUTH_CLIENT_ID: env("GOOGLE_OAUTH_CLIENT_ID"),
          GOOGLE_OAUTH_CLIENT_SECRET: env("GOOGLE_OAUTH_CLIENT_SECRET"),
          GOOGLE_OAUTH_REDIRECT_URI: env("GOOGLE_OAUTH_REDIRECT_URI"), // URI after successful login
        }
      },
    'pagopa-gh-trigger': {
        enabled: true,
        resolve: "./src/plugins/pagopa-gh-trigger",
        config: {
          environments: [
            {
              eventType: "",
              ghOrg: "pagopa",
              ghRef: "strapi-refactoring",
              ghBodyInputs: {"environment": "dev", "logLevel": "info"},
              ghRepo: "corporate-site-fe",
              ghToken: env("GITHUB_TOKEN"),
              ghWorflowFile: "deploy-live-aws.yml",
              id: "dev",
              name: "Ambiente di Sviluppo",
              rolesAllowed: [],
              userAgent: "strapi",
            },
            {
              eventType: "",
              ghOrg: "pagopa",
              ghRef: "strapi-refactoring",
              ghBodyInputs: {"environment": "prod", "logLevel": "info"},
              ghRepo: "corporate-site-fe",
              ghToken: env("GITHUB_TOKEN"),
              ghWorflowFile: "deploy-live-aws.yml",
              id: "prod",
              name: "Ambiente di Produzione",
              rolesAllowed: [],
              userAgent: "strapi",
            },
          ]
        }
      }
  });
