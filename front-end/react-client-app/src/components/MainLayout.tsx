import { Outlet } from "react-router";
import { Header } from "./Header";
import { useEffect } from "react";
import AuthService from "../services/auth-service/AuthService";
import { useAppDispatch } from "../utils/store/hooks";

export function MainLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkIfLogged = new AuthService().hasLogged();
    dispatch(checkIfLogged);
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
