export function faviconSetter() {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const faviconLight = document.getElementById('favicon-light');
  const faviconDark = document.getElementById('favicon-dark');

  if (prefersDark) {
    faviconLight.setAttribute('href', '/dark-logo.png');
  } else {
    faviconDark.setAttribute('href', '/light-logo.png');
  }
  return console.log(prefersDark ? 'Dark Mode' : 'Light Mode');
}
