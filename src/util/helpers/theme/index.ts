type Themes = 'light' | 'dark';

export function initTheme(): void {
  setTheme(getTheme());
}

export function getTheme(): Themes {
  return (window.localStorage.getItem('theme') as Themes) ?? 'light';
}

export function setTheme(theme: Themes): void {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem('theme', theme);
}
