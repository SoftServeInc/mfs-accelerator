export async function registerServiceWorker({ events }): Promise<any> {
  if ("serviceWorker" in navigator) {
    // Before registration of our sw we want to register one, already registered
    // This way we'll put sw from "not exist" to "running" status.
    // And, in turn, it'll force BackgroundSync mechanism to get requests from IndexDB and replay them
    // Inspired by this SO answer https://stackoverflow.com/questions/57863098/workbox-background-sync-offline-post-replay-events-when-the-browser-is-bac
    const currentRegistrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of currentRegistrations) {
      registration.unregister();
    }
    try {
      await navigator.serviceWorker.register("/sw.js");

      navigator.serviceWorker.addEventListener("message", (event) => {
        events.dispatch(event);
      });
    } catch (error) {
      console.warn("[SW] Error while registering: ", error);
    }
  }
}
