import type { Profile, } from "../types/data-types";
import type {PayloadAction} from '@reduxjs/toolkit';

export function setProfile(state: Profile, action: PayloadAction<Profile>) {
  state = action.payload;
}

export default {
  setProfile
}