import * as deepFreeze from "deep-freeze";
import { NOTIFICATIONS_TRANSLATION } from "./Notification";
import { USERS_TRANSLATION } from "./Users";

export const TRANSLATIONS = deepFreeze({
  Notification: NOTIFICATIONS_TRANSLATION,
  Users: USERS_TRANSLATION,
} as const);
