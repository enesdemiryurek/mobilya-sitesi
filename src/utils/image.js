export const basePath = typeof process.env.NEXT_PUBLIC_BASE_PATH !== 'undefined' ? process.env.NEXT_PUBLIC_BASE_PATH : '/mobilya-sitesi';

export function getImgUrl(url) {
  if (!url) return '';
  if (typeof url !== 'string') return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith(basePath)) {
    return url;
  }
  if (url.startsWith('/')) {
    return `${basePath}${url}`;
  }
  return `${basePath}/${url}`;
}
