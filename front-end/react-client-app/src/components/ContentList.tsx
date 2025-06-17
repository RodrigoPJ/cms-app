import type { ContentListComponent } from "../utils/types/components-interface";
import { DataContent } from "../services/content-service/DataContent";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "./daisy-ui/Modal";
import { useState } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ContentList({ projectId }: ContentListComponent) {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState({ __html: "" });
  const [publish, setPublish] = useState('');
  const contentQuery = useQuery({
    queryKey: ["project-content", projectId],
    queryFn: async () => {
      const contents = await DataContent.getContents(projectId);
      contents?.reverse();
      return contents;
    },
    staleTime: Infinity,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (contentId: string) => {
      const deleted = await DataContent.removeContent(contentId);
      console.log(deleted);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["project-content", projectId],
        exact: true,
      });
    },
  });

  const publishedContent = useMutation({
    mutationFn: async (published:string)=>{
       await DataContent.publishContent(publish, published);
    },
    onSuccess: ()=>{
       queryClient.invalidateQueries({
        queryKey: ["project-content", projectId],
        exact: true,
      });
    },
  })

  function handlePreview(body: string) {
    setPreview({ __html: body });
    setModalOpen(true);
  }

  function handlePublish(){
    publishedContent.mutate('');
    setModalOpen(false)
  }

  function handleUnPublish(){
    publishedContent.mutate('not published');
    setModalOpen(false)
  }

  function handleDelete(id: string | undefined) {
    if (id) mutate(id);
  }
  return (
    <>
      {contentQuery.data && contentQuery.data.length > 0 && (
        <div className="card overflow-x-auto bg-base-100 wrap-break-word shadow">
          <div className="card-body">
            <h2 className="card-title">All Content</h2>
            <p>View, edit, or delete existing content entries.</p>
            <Modal
              isOpen={modalOpen}
              onClose={() => {
                setModalOpen(false);
              }}
            >
              <div className="text-center">
                <button onClick={handlePublish} className="btn btn-primary">
                  Publish
                </button>
                <button onClick={handleUnPublish} className="btn btn-primary">
                  Un Publish
                </button>

              </div>
              <div dangerouslySetInnerHTML={preview}></div>
            </Modal>
            <div className="mt-4">
              <table className="border border-gray-400 dark:border-gray-500 xs:table xs:table-zebra table-auto ">
                <thead>
                  <tr className="dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600">
                      Title
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600">
                      Type
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600">
                      View
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600">
                      Publish
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contentQuery.data &&
                    contentQuery.data.map((el, i) => (
                      <tr key={i}>
                        <td>{el.title}</td>
                        <td>{el.type}</td>
                        <td>
                          <button
                            onClick={() => {
                              handlePreview(el.body || "");
                              setPublish(el.id || '')
                            }}
                            className="btn btn-sm btn-outline mr-2"
                          >
                            {" "}
                            Preview
                          </button>
                        </td>
                        <td>{el.published}</td>
                        <td>
                          <button className="btn btn-sm btn-outline mr-2">
                            Edit
                          </button>
                          <button
                            disabled={isPending}
                            onClick={() => {
                              handleDelete(el.id);
                            }}
                            className="btn btn-sm btn-error"
                          >
                            <FontAwesomeIcon size="xl" icon={faTrashCan} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
