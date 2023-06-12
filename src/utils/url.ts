export function constructURL(
  baseURL: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams: Record<string, any>,
): string {
  let url = baseURL + '?';

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      url += `${key}=${encodeURIComponent(value)}&`;
    }
  }

  // Remove the trailing '&' character
  url = url.slice(0, -1);

  return url;
}
