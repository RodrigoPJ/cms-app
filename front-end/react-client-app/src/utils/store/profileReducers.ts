import type { Content, Project, User } from "../types/data-types";
import type { PayloadAction } from "@reduxjs/toolkit";

function setProfile(state: User, action: PayloadAction<User>) {
  state.userAccount = action.payload.userAccount;
  state.projects = action.payload.projects;
}

function addProject(state: User, action: PayloadAction<Project>) {
  state.projects.push(action.payload);
}

// function setContentsEmpty(){
  
// }

function addContent(state: User, action: PayloadAction<Content>) {
  const itemIndex = state.projects.findIndex(
    (el) => el.id === action.payload.projectItemId
  );
  if (itemIndex > -1) {
    if (state.projects[itemIndex].contents) {
      state.projects[itemIndex].contents.push(action.payload);
    } else {
      state.projects[itemIndex].contents = [action.payload];
    }
  }
}
function addAllContents(state: User, action: PayloadAction<Content[]>) {
  const itemIndex = state.projects.findIndex(
    (el) => el.id === action.payload[0].projectItemId
  );

  if (itemIndex >= 0) {
    state.projects[itemIndex].contents = action.payload;
  }
}
export default {
  setProfile,
  addProject,
  addAllContents,
  addContent,
};
