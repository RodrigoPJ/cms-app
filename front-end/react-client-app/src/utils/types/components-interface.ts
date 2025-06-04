import type { ReactNode } from "react";
import type { Content, Pages } from "./data-types";
import type { NavLinkRenderProps } from "react-router";
export interface CardInterface {
  title: string;
  body:string;
  button?:{
    action: ()=>void;
    text: string;
  }
}

export interface LoginFormComponent {
  startLogin: ()=>void;
}

export interface LoginRef {
  getLoginInfo: ()=>{
    email: string | undefined,
    password: string | undefined,
  };
  clearLoginInfo: ()=>void;
}

export interface HeroComponent {
  image:string;
  title:string;
  body: string;
  cta?: {
    text: string;
    link?: string;
    action?: ()=>void
  };
  children?: ReactNode
}
export interface NavBarComponent {
  title: string;
  pages: Pages[];
  isLoggedIn: boolean;
  alerts: boolean;
}

export interface SideBarComponent {
  sidebarOpen: boolean;
  navLinkStyle: (props: NavLinkRenderProps)=>string;
}
export interface InformationGrid {
  stats: Stat[]
}

export interface Stat {
  title: string;
  value: string;
}

export interface FormInputInterface {
  id:string
  label:string;
  type:string;
  name:string;
  value:string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
  required: boolean;
}
export interface CreateContent {
  projectId: string;
}
export interface ContentListComponent {
  contents: Content[]
}