import { useEffect, useState, type ChangeEvent } from "react";
import { ContentList } from "../../../components/ContentList";
import { useAppDispatch, useAppSelector } from "../../../utils/store/hooks";
import type { Content, Project } from "../../../utils/types/data-types";
import Modal from "../../../components/daisy-ui/Modal";
import { CreateContent } from "../../../components/CreateContent";
import { Card } from "../../../components/daisy-ui/Card";
import { ContentService } from "../../../services/content-service/ContentService";
import { addAllContents } from "../../../utils/store/profileSlice";

// src/pages/Content.tsx
export default function Content() {
  const projects = useAppSelector((state) => state.profile.projects);
  const dispatch = useAppDispatch();
  const [contents, setContents] = useState<Content[]>([]);
  const [project, setProjectId] = useState<Project>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const activeProject = projects.filter((pr) => pr.isActive);
    console.log(activeProject);

    if (activeProject[0] && activeProject[0].id) {
      setProjectId(activeProject[0]);
    }
  }, []);

  useEffect(()=>{
     const activeProject = projects.find(el => el.id === project?.id);
     if(activeProject && activeProject.accountId && activeProject.id) {
              console.log('heere');
              console.log(activeProject);
              

      if(!activeProject.contents) {
        const contServ = new ContentService(activeProject.accountId);
        
        dispatch(contServ.getAllContents(activeProject.id)).then(content =>{
          setContents(content);
        }).catch(e => console.log(e))
      }
     }
  }, [project])

  function openContentCreator() {
    setModalOpen(true);
  }
  function projectChange(ev:ChangeEvent<HTMLSelectElement>){
    console.log(ev.target.value);
    const selectedProject = projects.find(el => el.id === ev.target.value)
    if (selectedProject)
    setProjectId(selectedProject)
    
  }

  return (
    <div className="space-y-6 p-4">
      <Modal fullScreen={true} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateContent projectId={project?.id ? project.id : ''} setModalOpen={setModalOpen} />
      </Modal>

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <select onChange={projectChange} className="max-w-3/12 select select-ghost hover:border-violet-800" name="active-project" id="activeId-project">
        {projects.map(proj=>{
          return <option key={proj.id} value={proj.id}>{proj.name}</option>
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
      {contents.length > 1 && <ContentList contents={contents} />}
    </div>
  );
}
