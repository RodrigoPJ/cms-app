import type { AppDispatch } from "../../utils/store/store";
import { setLogggedIn,} from "../../utils/store/uiSlice";
import type { PersonData } from "../../utils/types/data-types";
import { DataAuth } from "./DataAuth";

class AuthService{
  public isLogged: boolean;
  public authData = new DataAuth();
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

  signup(personData: PersonData){
    console.log(personData);
    
    return async (dispatch:AppDispatch)=>{
      const dataSaved = await this.authData.signup(personData);
      console.log(dataSaved);
        dispatch(setLogggedIn(true));
    }

  }

  /***this method is a data action that will call the proper service to log in */
  logIn(name:string, password:string) {
    return async (dispatch:AppDispatch)=> {
      const loginTry= await this.authData.login(name, password);
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
      const logOut = await this.authData.logout()
      dispatch(setLogggedIn(!logOut))
    }
  }
}
export default AuthService
