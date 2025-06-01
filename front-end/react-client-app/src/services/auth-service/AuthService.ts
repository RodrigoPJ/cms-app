import { setProfile } from "../../utils/store/profileSlice";
import type { AppDispatch } from "../../utils/store/store";
import { setLogggedIn } from "../../utils/store/uiSlice";
import type { PersonData } from "../../utils/types/data-types";
import { DataContent } from "../content-service/DataContent";
import { DataAuth } from "./DataAuth";

class AuthService {
  public isLogged = false;
  public authData = new DataAuth();
  async persistLoginAndGetInfo(accountId: string, dispatch: AppDispatch) {
    localStorage.setItem("cms-app", JSON.stringify({ user: accountId }));
    const contentData = new DataContent();
    const userProfile = await contentData.findUser(accountId);
    if (userProfile) {
      console.log(userProfile);
      dispatch(setProfile(userProfile));
      return true;
    } else return null;
  }

  hasLogged() {
    return async (dispatch: AppDispatch) => {
      const cmsData = localStorage.getItem("cms-app");
      if (cmsData) {
        const contentData = new DataContent();
        const user = await contentData.findUser(cmsData);
        if (user) {
          dispatch(setLogggedIn(true));
          dispatch(setProfile(user));
        }
        return true;
      } else {
        return false;
      }
    };
  }

  signup(personData: PersonData) {
    return async (dispatch: AppDispatch) => {
      const dataSaved = await this.authData.signup(personData);
      if (dataSaved) {
        const { accountId } = dataSaved;
        const uiProfile = await this.persistLoginAndGetInfo(
          accountId,
          dispatch
        );
        if (uiProfile) {
          dispatch(setLogggedIn(true));
          this.isLogged = true;
          return true;
        } else {
          alert("no user was able to be loaded");
          this.isLogged = false;
          dispatch(setLogggedIn(false));
          return false;
        }
      } else {
        dispatch(setLogggedIn(false));
        return false;
      }
    };
  }

  /***this method is a data action that will call the proper service to log in */
  logIn(name: string, password: string) {
    return async (dispatch: AppDispatch) => {
      try {
        const loginTry = await this.authData.login(name, password);
        if (loginTry?.accountId) {
        const loadUser = await this.persistLoginAndGetInfo(
          loginTry.accountId,
          dispatch
        );
        if (loadUser) {
          this.isLogged = true;
          dispatch(setLogggedIn(true));
        } else {
          dispatch(setLogggedIn(false));
          alert("login failed");
        }
      } else {
        dispatch(setLogggedIn(false));
        alert("login failed");
      }
      } catch (error) {
        console.log(error, 'request failed');
        
        return 'request failed'
      }
      
     
    };
  }

  /**this is for logging out the app **/
  logOut() {
    return async (dispatch: AppDispatch) => {
      localStorage.removeItem("cms-app");
      this.isLogged = false;
      const logOut = await this.authData.logout();
      dispatch(setLogggedIn(!logOut));
    };
  }
}
export default AuthService;
