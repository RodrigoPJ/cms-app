import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../utils/store/hooks";
import AuthService from "../services/ui-service/AuthService";
import LoginForm from "../components/daisy-ui/LoginForm";
import type { LoginRef } from "../utils/types/components-interface";
import { Navigate } from "react-router";

export function Login() {
  const dispatch = useAppDispatch();
  const ref = useRef<LoginRef | null>(null);
  const isLoggedin = useAppSelector((state) => state.UIState.isLoggedin);

  function handleLogin() {
    const logService = new AuthService();
    if (ref.current) {
      const { email, password } = ref.current.getLoginInfo();
      if (email && password) {
        ref.current.clearLoginInfo();
        dispatch(logService.logIn(email, password));
      }
    }
  }
  return (
    <>
      {isLoggedin ? (
        <Navigate to="/dashboard" />
      ) : (
        <LoginForm ref={ref} startLogin={handleLogin} />
      )}
    </>
  );
}
