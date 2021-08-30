export const createEvent = <T>(type: string, data?: T) =>
  new CustomEvent<T>(type, { detail: data });

export const useEvents = ({ element }) => {
  const emit = (event: CustomEvent) => {
    element.dispatchEvent(event);
  };

  return { emit };
};
