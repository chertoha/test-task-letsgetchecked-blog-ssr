export const stringifySearchParams = (params: any) =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&");
