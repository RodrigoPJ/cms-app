import { navBar } from "../utils/content/navBar";
import { useAppSelector } from "../utils/store/hooks";
import { useEffect, useState } from "react";
import { NavBar } from "./daisy-ui/NavBar";

export function Header() {
  const content = navBar;
  const [assignedNav, setAssigned] = useState(content.pages);
  const isLoggedIn = useAppSelector((state) => state.UIState.isLoggedin);
  const alerts = true;

  useEffect(()=>{
    if(isLoggedIn){
      const visibleNav = content.pages.filter(el => el.loggedin);
      setAssigned(visibleNav);
    } else {
      const visibleNav = content.pages.filter(el => !el.loggedin);
      setAssigned(visibleNav);
    }
  }, [isLoggedIn, content])

  return (
    <NavBar title="my cms" pages={assignedNav} isLoggedIn={isLoggedIn} alerts={alerts} />
  );
}
