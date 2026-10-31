export function getYakThemeContext() {
  return { dark: false };
}

declare module "@yak/solid" {
  interface YakTheme extends ReturnType<typeof getYakThemeContext> {}
}
