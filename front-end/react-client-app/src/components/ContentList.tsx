import type { ContentListComponent } from "../utils/types/components-interface";
import { DataContent } from "../services/content-service/DataContent";

import { useQuery } from "@tanstack/react-query";

export function ContentList({ projectId }: ContentListComponent) {
  const contentQuery = useQuery({
    queryKey: ["project-content", projectId],
    queryFn: async () => {
      const contents = await DataContent.getContents(projectId);
      return contents;
    },
    staleTime: Infinity,
  });

  return (
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
              {contentQuery.data &&
                contentQuery.data.map((el, i) => (
                  <tr key={i}>
                    <td>{el.title}</td>
                    <td>{el.type}</td>
                    <td>{el.properties}</td>
                    <td>May 25, 2025</td>
                    <td>
                      <button className="btn btn-sm btn-outline mr-2">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-error">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
