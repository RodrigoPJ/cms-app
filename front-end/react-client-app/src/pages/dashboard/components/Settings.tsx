// src/pages/Settings.tsx
export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* App Settings */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Application Settings</h2>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Enable Notifications</span>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
          <div className="form-control mt-2">
            <label className="cursor-pointer label">
              <span className="label-text">Auto-Save Drafts</span>
              <input type="checkbox" className="toggle toggle-secondary" />
            </label>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Theme</h2>
          <select className="select select-bordered w-full max-w-xs">
            <option>System Default</option>
            <option>Light</option>
            <option>Dark</option>
            <option>Cyberpunk</option>
          </select>
        </div>
      </div>
    </div>
  );
}
