import type { Project, User } from "../types/data-types";
import type {PayloadAction} from '@reduxjs/toolkit';

function setProfile(state: User, action: PayloadAction<User>) {
  state.userAccount = action.payload.userAccount;
  state.projects = action.payload.projects
  
}

function addProject(state: User, action: PayloadAction<Project>){
  state.projects.push(action.payload);
}


export default {
  setProfile,
  addProject
}