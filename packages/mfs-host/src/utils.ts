/**
 * Gets specific field value from meta tag in head
 */
export const getFieldFromMeta = (field: string): string => {
  const metaTag = document.head.querySelector(`meta[name="${field}"]`);

  if (!metaTag) {
    return;
  }

  return metaTag.getAttribute("content");
};

/**
 * Simplest event bus
 */
export interface Event {
  data: {
    type: string;
    detail: string;
  };
}

export interface EventBus {
  subscribe: (subscriber: (e: Event) => void) => void;
  dispatch: (e: Event) => void;
}

export const createEventBus = (): EventBus => {
  const subs = [];

  const subscribe = (sub) => subs.push(sub);
  const dispatch = (event) => subs.forEach((sub) => sub(event));

  return { subscribe, dispatch };
};
