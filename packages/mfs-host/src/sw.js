importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

import { precacheAndRoute } from "workbox-precaching";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import "regenerator-runtime/runtime.js";

precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting(); // this ensures that this SW will become active as soon as it was parsed by page https://bitsofco.de/what-self-skipwaiting-does-to-the-service-worker-lifecycle/

import { registerRoute } from "workbox-routing";
import {
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from "workbox-cacheable-response";
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from "workbox-expiration";

const postMessage = async (message) => {
  const clients = await self.clients.matchAll();
  clients.forEach((client) => client.postMessage(message));
};

// Cache page navigations (html) with a Network First strategy
registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => request.mode === "navigate",
  // Use a Network First caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: "pages",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

registerRoute(
  // Check to see if request is about users
  ({ request }) => request.url.includes("/users"),
  // Use a Network Only strategy
  new NetworkOnly({
    // We want to send API requests after network connection is restored
    plugins: [
      new BackgroundSyncPlugin("usersQueueDelete", {
        onSync: async ({ queue }) => {
          try {
            await queue.replayRequests();

            postMessage({
              type: "USERS_QUEUE/DELETE_SUCCESSFUL",
            });
          } catch (error) {
            postMessage({
              type: "USERS_QUEUE/DELETE_FAILED",
            });
          }
        },
      }),
    ],
  }),
  // This route is only for user's deletion
  "DELETE"
);

registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => request.url.includes("/users"),
  // Use a Network First caching strategy
  new NetworkOnly({
    // We want to send API requests after network connection is restored
    plugins: [
      new BackgroundSyncPlugin("usersQueuePost", {
        onSync: async ({ queue }) => {
          try {
            await queue.replayRequests();

            postMessage({
              type: "USERS_QUEUE/POST_SUCCESSFUL",
            });
          } catch (error) {
            postMessage({
              type: "USERS_QUEUE/POST_FAILED",
            });
          }
        },
      }),
    ],
  }),
  // This route is only for user's creation
  "POST"
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: "assets",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === "image",
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: "images",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  })
);
