// src/pages/Users.tsx
export default function Users() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">All Users</h2>
          <p>Manage platform users, roles, and access.</p>
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jane Doe</td>
                  <td>jane@example.com</td>
                  <td>Admin</td>
                  <td className="text-success">Active</td>
                  <td>
                    <button className="btn btn-sm btn-outline mr-2">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>John Smith</td>
                  <td>john@example.com</td>
                  <td>Editor</td>
                  <td className="text-error">Suspended</td>
                  <td>
                    <button className="btn btn-sm btn-outline mr-2">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
