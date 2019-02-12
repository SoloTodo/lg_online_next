const isServer = typeof window === 'undefined';

export function isIe() {
  if (isServer) {
    return false
  }

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  return msie > 0 || !!navigator.userAgent.match(/Trident/)
}
