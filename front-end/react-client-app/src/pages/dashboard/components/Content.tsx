import { useEffect, useState } from "react";
import { ContentList } from "../../../components/ContentList";
import { useAppSelector } from "../../../utils/store/hooks";
import type { Content } from "../../../utils/types/data-types";
import Modal from "../../../components/daisy-ui/Modal";
import { CreateContent } from "../../../components/CreateContent";
import { Card } from "../../../components/daisy-ui/Card";

// src/pages/Content.tsx
export default function Content() {
  const projects = useAppSelector((state) => state.profile.projects);
  const [contents, setContents] = useState<Content[]>([]);
  const [projectId, setProjectId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const activeProject = projects.filter((pr) => pr.isActive);
    if (activeProject[0] && activeProject[0].contents && activeProject[0].id) {
      setProjectId(activeProject[0].id);
      setContents(activeProject[0].contents);
    }
  }, [projects]);
    function openContentCreator(){
      setModalOpen(true);
    }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Management</h1>
      <Card
      title="Create New Content"
      body="Add a title, description, and publish options for your content."
      button={{
        text:'Create new',
        action: openContentCreator
      }}
      />
      <ContentList contents={contents} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateContent projectId={projectId} />
      </Modal>
    </div>
  );
}
