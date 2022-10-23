import { useMemo } from "react";


type MapHandleProps = {
  boxZoom: boolean;
  doubleClickZoom: boolean;
  dragRotate: boolean;
  dragPan: boolean;
  keyboard: boolean;
  scrollZoom: boolean;
  touchZoomRotate: boolean;
  touchPitch: boolean;
}

/**
 * @param {boolean} enabled
 * @returns {MapHandleProps}
 * 
 * Helper hook that returns props for the Map (react-map-gl) component to activate or deactivate handle inputs. 
 */
const useMapHandleProps = (enabled: boolean): MapHandleProps => {
  return useMemo(() => ({
    boxZoom: enabled,
    doubleClickZoom: enabled,
    dragRotate: enabled,
    dragPan: enabled,
    keyboard: enabled,
    scrollZoom: enabled,
    touchZoomRotate: enabled,
    touchPitch: enabled,
  }), [enabled]);
}

export default useMapHandleProps;