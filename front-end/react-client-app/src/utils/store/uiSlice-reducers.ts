import type { UIState } from "../types/data-types";
import type {PayloadAction} from '@reduxjs/toolkit';

export function setLogggedIn(state: UIState, action: PayloadAction<boolean>) {
  state.isLoggedin = action.payload;
}

export function setLightTheme(state: UIState, action: PayloadAction<boolean>) {
  state.isDarkTheme = action.payload;
}

export function setDarkTheme(state: UIState, action: PayloadAction<boolean>) {
  state.isLightTheme = action.payload;
}

export default {
  setLogggedIn, setLightTheme, setDarkTheme
}