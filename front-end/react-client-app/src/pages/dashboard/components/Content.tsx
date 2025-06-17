import { useEffect, useState, type ChangeEvent } from "react";
import { ContentList } from "../../../components/ContentList";
import { useAppSelector } from "../../../utils/store/hooks";
import type { Content, Project } from "../../../utils/types/data-types";
import Modal from "../../../components/daisy-ui/Modal";
import { CreateContent } from "../../../components/CreateContent";
import { Card } from "../../../components/daisy-ui/Card";
import { useSearchParams } from "react-router";

// src/pages/Content.tsx
export default function Content() {
  const projects = useAppSelector((state) => state.profile.projects);
  const [project, setProjectId] = useState<Project>();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearchparams] = useSearchParams();

  useEffect(() => {
    if (search.has('projectId')) {
      const projectId = search.get("projectId");
      console.log(projectId);
      if (projectId) {
        const selectedProject = projects.find((el) => el.id === projectId);
        if (selectedProject) {
          console.log("set project from search");

          setProjectId(selectedProject);
          console.log(selectedProject);
          //setSearchparams('')
        }
      }
    } else {
      if (projects.length > 0) {
        const activeProject = projects.find((el) => el.isActive);
        if (activeProject) {
          console.log("set project from projects");

          setProjectId(activeProject);
        }
      }
    }
  }, [search, projects]);

  function openContentCreator() {
    setModalOpen(true);
  }

  function projectChange(ev: ChangeEvent<HTMLSelectElement>) {
    const selectedProject = projects.find((el) => el.id === ev.target.value);
    if (selectedProject) {
      setProjectId(selectedProject);
    }
  }

  return (
    <div className="space-y-6 p-4">
      {project && (
        <Modal
          fullScreen={true}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <CreateContent
            projectId={project.id ? project.id : ""}
            setModalOpen={setModalOpen}
          />
        </Modal>
      )}

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <select
          onChange={projectChange}
          className="max-w-3/12 select select-ghost hover:border-violet-800"
          name="active-project"
          id="activeId-project"
          value={project?.id}
        >
          {projects.map((proj) => {
            return (
              <option key={proj.id} value={proj.id}>
                {proj.name}
              </option>
            );
          })}
        </select>
      </div>

      <Card
        title="Create New Content"
        body="Add a title, description, and publish options for your content."
        button={{
          text: "Create new",
          action: openContentCreator,
        }}
      />
      {project && <ContentList projectId={project.id || ""} />}
    </div>
  );
}
