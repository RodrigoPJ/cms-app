
export function Account() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account Settings</h1>

      {/* Personal Info */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Profile Information</h2>
          <div className="form-control">
            <label className="label">Full Name</label>
            <input type="text" placeholder="John Doe" className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <label className="label">Email</label>
            <input type="email" placeholder="john@example.com" className="input input-bordered" />
          </div>
          <button className="btn btn-primary mt-4 w-fit">Save Changes</button>
        </div>
      </div>

      {/* Password Update */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Change Password</h2>
          <div className="form-control">
            <label className="label">Current Password</label>
            <input type="password" className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <label className="label">New Password</label>
            <input type="password" className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <label className="label">Confirm New Password</label>
            <input type="password" className="input input-bordered" />
          </div>
          <button className="btn btn-primary mt-4 w-fit">Update Password</button>
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
