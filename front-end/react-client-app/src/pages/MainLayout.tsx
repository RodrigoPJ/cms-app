import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { useEffect } from "react";
import LogService from "../services/ui-service/AuthService";
import { useAppDispatch } from "../utils/store/hooks";
import { setLogggedIn } from "../utils/store/uiSlice";

export function MainLayout() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const logService = new LogService();
    if(logService.isLogged) {
      dispatch(setLogggedIn(true))
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
