export default function Dashboard() {
  return(
  <div className="p-4 overflow-y-auto">
    {/* Overview Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Total Posts</div>
        <div className="stat-value">128</div>
      </div>
      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Active Users</div>
        <div className="stat-value">45</div>
      </div>
      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Drafts</div>
        <div className="stat-value">12</div>
      </div>
    </div>

    {/* Table or Chart */}
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Recent Activity</h2>
        <p>List of recent content updates, user actions, etc.</p>
      </div>
    </div>
  </div>);
}
