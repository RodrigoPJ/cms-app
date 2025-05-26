import type { JSX } from "react";

export interface CardInterface {
  title: string;
  body:string;
  button?:{
    action: Function;
    text: string;
  }
}

export interface LoginFormComponent {
  startLogin: Function
}

export interface LoginRef {
  getLoginInfo: Function;
  clearLoginInfo: Function;
}

export interface HeroComponent {
  image:string;
  title:string;
  body: string;
  cta?: {
    text: string;
    link?: string;
    action?: Function
  };
  children?: JSX.Element
}