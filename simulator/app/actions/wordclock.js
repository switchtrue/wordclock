// @flow
// import type { counterStateType } from '../reducers/counter';

export const SET_NEO_PIXEL_ARRAY = 'SET_NEO_PIXEL_ARRAY';
export const SET_DISPLAY_MODE = 'SET_DISPLAY_MODE';

export function setNeoPixelArray(neoPixelArray) {
  return {
    type: SET_NEO_PIXEL_ARRAY,
    payload: {
      neoPixelArray: neoPixelArray
    }
  };
}


export function setDisplayMode(displayMode) {
  return {
    type: SET_DISPLAY_MODE,
    payload: {
      displayMode: displayMode
    }
  };
}
