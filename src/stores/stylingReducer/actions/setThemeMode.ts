const STYLING_STORE_ACTION_SET_THEME_MODE = "setThemeMode" as const;

const setThemeMode = (lightMode: boolean) => {
  return {
    type: STYLING_STORE_ACTION_SET_THEME_MODE,
    lightMode
  }
};

export default setThemeMode;
export { STYLING_STORE_ACTION_SET_THEME_MODE };