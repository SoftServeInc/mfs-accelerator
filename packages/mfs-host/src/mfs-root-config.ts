import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { HTMLLayoutData } from "single-spa-layout/dist/types/isomorphic/constructRoutes";
import { registerServiceWorker } from "./registerServiceWorker";
import { getFieldFromMeta, createEventBus } from "./utils";

const IS_DEV = !!getFieldFromMeta("isLocal");

const events = createEventBus();

/**
 * Props that can be shared across micro-frontends
 */
const commonApplicationProps = {
  apiServiceUrl: getFieldFromMeta("apiServiceUrl"),
  events,
};

const data: HTMLLayoutData = {
  loaders: {
    "@mfs/home": "Loading home",
    "@mfs/dashboard": "Loading dashboard",
  },
  errors: {
    "@mfs/home": "Error while loading home app",
    "@mfs/dashboard": "Error while loading dashboard app",
  },
  props: commonApplicationProps,
};

const routes = constructRoutes(
  document.querySelector("#single-spa-layout") as HTMLTemplateElement,
  data
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

if (!IS_DEV) {
  registerServiceWorker({ events });
}
