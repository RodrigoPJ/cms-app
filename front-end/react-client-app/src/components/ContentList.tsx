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

  return (<>
    {(contentQuery.data && contentQuery.data.length > 0) && <div className="card overflow-x-auto bg-base-100 wrap-break-word shadow">
      <div className="card-body">
        <h2 className="card-title">All Content</h2>
        <p>View, edit, or delete existing content entries.</p>
        <div className="mt-4">
          <table className="border border-gray-400 dark:border-gray-500 xs:table xs:table-zebra table-auto ">
            <thead>
              <tr className="dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600">Title</th>
                <th className="border border-gray-300 dark:border-gray-600">Type</th>
                <th className="border border-gray-300 dark:border-gray-600">Props</th>
                <th className="border border-gray-300 dark:border-gray-600">Publish</th>
                <th className="border border-gray-300 dark:border-gray-600">Actions</th>
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
    </div>}</>
  );
}
