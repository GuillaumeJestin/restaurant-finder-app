const PLACE_STORE_ACTION_SET_RADIUS = "setRadius" as const;

const setRadiusAction = (radius: number) => {
  return {
    type: PLACE_STORE_ACTION_SET_RADIUS,
    radius
  }
};

export default setRadiusAction;
export { PLACE_STORE_ACTION_SET_RADIUS };