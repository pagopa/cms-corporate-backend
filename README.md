# CMS Backend for Pagopa.it

This package use [Strapi](https://www.strapi.io) as headless CMS for Pagopa.it website.

### To install

`yarn install`

and then `yarn build` (useful command to build the React Admin FE)

### Configuration

```bash
# Use the local env
$ cp .env.local .env

HOST=0.0.0.0
PORT=1337
APP_KEYS="MY_KEY"
API_TOKEN_SALT=MY_KEY
ADMIN_JWT_SECRET=MY_KEY
JWT_SECRET=MY_KEY
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=mysecretpassword

```

## Docker setup

A [Docker](https://www.docker.com/get-started) image is available for a postgres db

```bash

# Pull the latest Docker image
$ docker pull postgres

# Run the Docker container at http://127.0.0.1:<YOUR_HOST_PORT>/
$ docker run --name pagopa-corporate-cms -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

# start the postgress db
$ docker start pagopa-corporate-cms

```

### To start it

start your db
`yarn strapi develop` when in dev mode or when you want to add/modify content-types and components
`yarn strapi start` when you in uat/production env

### Usage with the Gatsby template

Access the admin console from the HOST:PORT/admin address (ex: http://localhost:1337/admin)

## Token

generate a full_access token to access the strapi endpoints from Settings -> [API Tokens](http://localhost:1337/admin/settings/api-tokens?sort=name:ASC)

## Add a new locale

go to [Settings/internationalization](http://localhost:1337/admin/settings/internationalization)
add Italian (it) as a new locale
Set it as the default locale from the advanced panel

## Create a page

1. from the [content manager](http://localhost:1337/admin/content-manager):
2. select the Page collection
3. Create new entry
4. the page path will be generated from the `url_path` and `slug` in the client as `url_path/slug`

## Create the Index/Homepage

1. from the [content manager](http://localhost:1337/admin/content-manager):
2. select the Page collection
3. Create new entry
4. the `slug` should be: "index"
5. leave the `url_path` empty
6. hit the save and the publish button

## Create the Menus

1. Go to the [navigation settings](http://localhost:1337/admin/settings/navigation) page
2. Add the `highlight` field:
   1. Custom fields settings -> Create new custom field
	 2. Fill the name and label with "highlight"
	 3. Change the field type to boolean
3. Toggle the 18n option from Additional Settings -> i18n
4. click Save Configuration
5. click Restart Strapi (restart manually if there is any error)
6. Go to the [navigation plugin](http://localhost:1337/admin/plugins/navigation) page
7. create a new navigation from Manage->Create
8. the displayed id should identify the it locale and id+1 the en locale*

* You can check the exacts id or slug runnning the following query in the srapi postgres db:
```postgres
SELECT * FROM navigations;
```

## Add Background Graphics Animation

1. Add a component with the BackgroundGraphics sub component (Ex. Block Visual + Text)
2. find the backgroundAnimation field
3. click plus
4. compile the size, left and top fields
5. size: 100, left: 50, top: 50 to have a circle of 100px in the middle of the component

### Plugins shipped within this package

- _strapi-plugin-navigation_ to manage navigation menus
- _strapi-plugin-config-sync_ to manage export/import of config between environments (tipically export when in dev, import when in prod)

### Something to know

Using _strapi-plugin-config-sync_ we can export permission settings and other stuffs storing json files in confin/sync folder, after a dev session. Theese json files can be committed and used when in prod to programmatically sync environments.

## Access the postgres db (Docker Example)

```bash
$ docker exec -it pagopa-corporate-cms bash
$ psql -U postgres
```

```postgres
# list all tables
$ \dt
```

## Config Sync
Using _strapi-plugin-config-sync_ we can export permission settings and other stuffs storing json files in confin/sync folder, after a dev session. Theese json files can be committed and used when in prod to programmatically sync enviroments.

```
yarn cs export [optionally type ex user-role]
yarn cs import
```

For more info visit the plugin's [main page on github](https://github.com/boazpoolman/strapi-plugin-config-sync)
