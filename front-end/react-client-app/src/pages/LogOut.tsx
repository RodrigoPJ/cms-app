import { useEffect } from "react";
import { Hero } from "../components/daisy-ui/Hero";
import pages from "../utils/content/pages";
import AuthService from "../services/ui-service/AuthService";
import { useAppDispatch } from "../utils/store/hooks";

export function LogOut() {
    const content = pages.logout;
    const dispatch = useAppDispatch();
    useEffect(()=>{
      const logService = new AuthService();
      dispatch(logService.logOut());
    },[])
  return (
    <Hero
      title={content.title}
      body={content.body}
      image={content.backGroundImage}
      cta={{
        link: content.ctaLink,
        text: content.cta,
      }}
    />
  );
}