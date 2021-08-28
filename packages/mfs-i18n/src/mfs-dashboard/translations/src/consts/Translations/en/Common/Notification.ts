import * as deepFreeze from "deep-freeze";

export const NOTIFICATIONS_TRANSLATION = deepFreeze({
  DOWNLOAD: {
    success: "Download - success",
    failed: "Download - failed",
  },
  UPLOAD: {},
  SAVE: {},
} as const);
