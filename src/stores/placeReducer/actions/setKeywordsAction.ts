const PLACE_STORE_ACTION_SET_KEYWORDS = "setKeywords" as const;

const setKeywordsAction = (keywords: string) => {
  return {
    type: PLACE_STORE_ACTION_SET_KEYWORDS,
    keywords
  }
};

export default setKeywordsAction;
export { PLACE_STORE_ACTION_SET_KEYWORDS };