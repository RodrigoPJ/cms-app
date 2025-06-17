import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileInfo from "../components/ProfileInfo";
import { useAppSelector } from "../utils/store/hooks";
import { faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons";

export function Account() {
  const user = useAppSelector((state) => state.profile.userAccount);
  return (
    <div className="">
     <ProfileInfo email={user.user} firstName={user.userName} accountType={user.userType} />
      {/* Password Update */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Change Password</h2>
          <div className="form-control">
            <label className="label">Current Password: </label>
            <input type="password" className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <span>New Password</span>
            <label className="input">
              <input type="password"  />
              <span className="label"><button className="btn btn-ghost" onClick={()=>{console.log('icon');
              }}>{<FontAwesomeIcon icon={faEyeSlash} />}<FontAwesomeIcon icon={faEye} /></button></span>
            </label>
          </div>
          <div className="form-control mt-4">
            <label className="label">Confirm New Password: </label>
            <input type="password" className="input input-bordered" />
          </div>
          <button className="btn btn-primary mt-4 w-fit">
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card bg-base-100 shadow border border-red-400">
        <div className="card-body">
          <h2 className="card-title text-red-500">Danger Zone</h2>
          <p>Delete your account permanently. This action cannot be undone.</p>
          <button className="btn btn-error mt-2">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
