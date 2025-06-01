import type { Profile, User } from "../types/data-types";
import type {PayloadAction} from '@reduxjs/toolkit';

export function setProfile(state: User, action: PayloadAction<User>) {
  state.userAccount = action.payload.userAccount;
  state.projects = action.payload.projects
  
}

export default {
  setProfile
}