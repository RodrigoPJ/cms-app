import type { AppDispatch } from "../../utils/store/store";
import { setLogggedIn,} from "../../utils/store/uiSlice";
import { postLogIn, postLogout } from "../data/logData-service";

class AuthService{
  isLogged: boolean;
  constructor() {
    this.isLogged = this.hasLogged();
  }
  persistLogin(name:string ) {
    localStorage.setItem('cms-app', JSON.stringify({user: name}));
  }

  hasLogged() {
    const cmsData = localStorage.getItem('cms-app');
    if (cmsData) {
      return true;
    }else {
      return false;
    }
  }

  /***this method is a data action that will call the proper data service */
  logIn(name:string, password:string) {
    return async (dispatch:AppDispatch)=> {
      const loginTry= await postLogIn(name, password);
      if(loginTry) {
        this.persistLogin(name);
        this.isLogged = true;
      }
      dispatch(setLogggedIn(loginTry));
    } 
  }

  /**this is for logging out the app */
  logOut() {
    return async (dispatch:AppDispatch)=>{
      localStorage.removeItem('cms-app');
      this.isLogged = false;
      const logOut = await postLogout()
      dispatch(setLogggedIn(!logOut))
    }
  }
}
export default AuthService
