import * as deepFreeze from "deep-freeze";

export const USERS_TRANSLATION = deepFreeze({
  refresh: "Refresh users",
  vueUsers:
    "This is micro-frontend written in Vue which is using common translations",
  snacks: {
    createUserQueue: "Request queued, user will be created when back online",
    deleteUserQueue: "Request queued, user will be deleted when back online",
  },
} as const);
