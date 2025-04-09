export const fetchAPI = (path: string, init?: RequestInit | undefined) => {
  return fetch(`${import.meta.env.VITE_DJANGO_HOST}/api/${path}`, init);
};
