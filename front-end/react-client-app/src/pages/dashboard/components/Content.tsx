// src/pages/Content.tsx
export default function Content() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Management</h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Create New Content</h2>
          <p>Add a title, description, and publish options for your content.</p>
          <button className="btn btn-primary w-fit">Create New</button>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">All Content</h2>
          <p>View, edit, or delete existing content entries.</p>
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Welcome Post</td>
                  <td>Published</td>
                  <td>Admin</td>
                  <td>May 25, 2025</td>
                  <td>
                    <button className="btn btn-sm btn-outline mr-2">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
                {/* Repeat as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
