# Sample project Micro frontends in monorepo

## Authors
### Honorable author: 
Ivan Vynnyk
### Contributors: 
Vladyslav Bezruchko, 
Volodymyr Fedak

## Intro
Intention: show how micro frontends can be organized via monorepo yarn workspaces.

In the example following cases was covered: 
1. How to organize micro frontends via yarn workspaces
2. Single spa as a wrapper for micro frontends which were written using different frameworks( React/ VueJS)
3. Shared components organized in framework agnostic way using web components
4. i18n was organized in framework agnostic way using i18next tool
5. Demo application is a PWA application which supports offline mode for users service.
6. Backend REST API is implemented via Nestjs. Users are stored in memory. 

The key point here is that over the time WEB-UI teams should have resilient and framework agnostic Web-UI app. In our terms framework agnostic means having possibility to extend web app with a necessary framework. On the provided sample  SingleSPA has been used as a shell (wrapper) for micro frontends based on Angular/React/Vue. Each micro frontend is a stand-alone SPA that knows how to bootstrap, mount, and unmount itself from the DOM using Single SPA tooling. That is the only thing which couples your micro frontend to a wrapper (Single SPA ). 

Another feature of the provided sample is to have easy ability to write reusable shared UI components using any JS library/framework. It might be achieved by wrapping them with webcomponents (a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of code via browser API). https://developer.mozilla.org/en-US/docs/Web/Web_Components  

For i18next is used which supports all popular frameworks. 

Please see diagram which represents described above solution:

<p>
  <img widht="600" alt="mfs-solution" src="https://github.com/SoftServeInc/mfs-accelerator/blob/master/mfs-setup.png?raw=true" />
</p>

## Getting started

It's possible to run as many applications locally as you want.

1. Clone the monorepo

```sh

$ git clone https://github.com/SoftServeInc/mfs-accelerator.git

```

2. Install dependencies

```sh

$ yarn install

```

3. Start the services ( micro frontends and backend API)

```sh

$ yarn run start-services


```

4. Start host application

```sh

$ yarn run start-host-app


```

4. Open your browser and go to http://localhost:9000

### Developing micro-frontend

There are some rules when making changes to code-base of micro-frontend.

- Each of them has `<orgName-name>.ts` file in the `src` directory(`src/mfs-dashboard.tsx`) from the example above. This is the entry file, it's responsibility is to create single-spa application and export it's lifecycle methods `bootstrap, mount, unmount`. This contract is strict and shouldn't be changed
- `root.component.tsx` from the example above is simple React component. Can be of any framework.
- Webpack config is heavily extending `webpack-config-single-spa` for the base stuff. Important field there is `externals` - common libraries that we are using across applications and we do not want to bundle because it will result in multiple copies of e.g React in our app

### PWA

There is PWA functionality provided by service-worker and manifest files. They can be found inside of the host-app.

## Deployment process

In case with micro-frontends we need to deploy quite a few things.

The typical case is updating some feature inside of one micro-frontend. These things need to be deployed

1. Micro-frontend `.js` file itself
2. New import-map file, as deploying our `.js` bundle will change the link for latest version

### Micro-Frontend CI/CD

It's still in development but the end concept can be seen.

Env variables. Those are the default ones used in local `.env` file in the host application. There is for sure more to come but these are for now.

```dosini
IMPORT_MAP_URL=/import-map.json
API_SERVICE_URL=http://localhost:3000

```

In import-map.json you can find all dependencies to running micro fronends

## How the example app can be deployed to AWS

1. Developer pushes code to specific branches
2. CI runs testing and linting process as well as builds the application
3. CI copies ready-to-use bundles to S3 bucket
4. CI calls [import-map-deployer-service](https://github.com/single-spa/import-map-deployer) REST API to update import-map located on S3. This service needs to be used to avoid race-condition in case of each repos' ci updates import-map at the same time
5. New import-map is then available in deployed host-app and it doesn't need to know about changes
