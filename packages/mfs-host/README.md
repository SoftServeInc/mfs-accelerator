# Single-SPA Micro-Frontends

This is the host application for micro-frontends. Besides this repo you can find all other micro-frontends - they are either applications or utility modules.

### Host application

Each micro-frontend architecture should have one shell or so called "host" application. It's responsible for importing, bootstrapping and mounting all other applications. Also it describes layout and routes structure.

### Application

Separate single-page application with its own deployment and codebase. Each application should export it's lifecycle methods that will later be use to bootstrap, mount and unmount it by host-application.
It can render ui for specific route.

### Utility application

Has same concepts as application but doesn't depend on current route. Can be used anywhere in the layout, by any application. Also can simply provide common functions.

## Links to check for additional information

1. [Single-SPA](https://single-spa.js.org/docs/getting-started-overview) - framework of choice for managing micro-frontends
2. [SystemJS](https://github.com/systemjs/systemjs) - Module loader of choice (alternative to webpack module federation)

## Modules

[SystemJS](https://github.com/systemjs/systemjs) was chosen as module loader for runtime modules. It's more stable than
Webpack's module federation and has wider community. Also it fully satisfies our needs.

