# CMS Backend for Pagopa.it

This package use [Strapi](https://www.strapi.io) as headless CMS for Pagopa.it website.

### To install

`yarn install`

and then `yarn build` (useful command to build the React Admin FE)

### To start it

`yarn strapi develop` when in dev mode or when you want to add/modify content-types and components
`yarn strapi start` when you in uat/production env

### Plugins shipped within this package

- _strapi-plugin-navigation_ to manage navigation menus
- _strapi-plugin-config-sync_ to manage export/import of config between enviroments (tipically export when in dev, import when in prod)

### Something to know

Using _strapi-plugin-config-sync_ we can export permission settings and other stuffs storing json files in confin/sync folder, after a dev session. Theese json files can be committed and used when in prod to programmatically sync enviroments.

```
yarn cs export [optionally type ex user-role]
yarn cs import
```

For more info visit the plugin's [main page on github](https://github.com/boazpoolman/strapi-plugin-config-sync)
