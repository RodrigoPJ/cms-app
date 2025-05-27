import { forwardRef, useImperativeHandle, useRef, type ForwardedRef} from "react";
import type { LoginFormComponent, LoginRef } from "../../utils/types/components-interface";

const LoginForm = forwardRef(({ startLogin }:LoginFormComponent, ref:ForwardedRef<LoginRef>) => {
  const emailRef = useRef<HTMLInputElement |null>(null);
  const passwordRef = useRef<HTMLInputElement |null>(null);

  useImperativeHandle(ref, () => {
    return {
      getLoginInfo() {
        const loginInfo = {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        };
        return loginInfo;
      },
      clearLoginInfo() {
        if(emailRef.current && passwordRef.current){
          emailRef.current.value = '';
          passwordRef.current.value = '';
        }
        
      }
    };
  });

  function handleClick() {
    startLogin();
  }
  return (
    <div
      style={{ placeItems: "self-start" }}
      className="hero bg-base-200 min-h-screen"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Please provide your credentials
          </h1>
          <p className="py-6">
            This is the content manager dashboard please log in
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                ref={emailRef}
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                ref={passwordRef}
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button onClick={handleClick} className="btn btn-neutral mt-4">
                Login
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoginForm;
