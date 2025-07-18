import { useAppSelector } from "../../../utils/store/hooks";
import { useState } from "react";
import Modal from "../../../components/daisy-ui/Modal";
import { NewProjectForm } from "../../../components/NewProjectForm";
import { useNavigate } from "react-router";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// src/pages/Users.tsx
export default function Users() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const projects = useAppSelector((state) => state.profile.projects);
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Projects Management</h1>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">All Projects</h2>
          <p>Manage projects you own, create, update or delete.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary w-1/3 mb-3"
          >
            Create Project{" "}
          </button>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <NewProjectForm />
          </Modal>
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((el) => (
                  <tr key={el.id}>
                    <td>{el.name}</td>
                    <td>{el.contentType}</td>
                    <td className="text-success">
                      {el.isActive ? "active" : "inactive"}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/dashboard/content?projectId=${el.id}`);
                        }}
                        className="btn btn-sm btn-outline mr-2"
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-error">
                        <FontAwesomeIcon size='xl' icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
