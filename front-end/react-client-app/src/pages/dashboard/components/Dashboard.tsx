import { useEffect, useState } from "react";
import { InformationGrid } from "../../../components/daisy-ui/InformationGrid";
import { useAppSelector } from "../../../utils/store/hooks";
import type { Stat } from "../../../utils/types/components-interface";
import { Card } from "../../../components/daisy-ui/Card";
import Modal from "../../../components/daisy-ui/Modal";
import { NewProjectForm } from "../../../components/NewProjectForm";

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const profile = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (profile.projects.length === 0) {
      const emptyStat = {
        title: "No projects started",
        value: "0",
      };
      const statList = [emptyStat];
      setStats(statList);
    } else {
      const activeProject = profile.projects.find((el) => el.isActive);

      const statList: Stat[] = [
        {
          title: "Projects Open",
          value: profile.projects.length.toString(),
        },
        {
          title: "Active Project",
          value: activeProject?.name
            ? activeProject.name
            : "No projects active",
        },
        {
          title: "Content in project",
          value: activeProject?.contentType
            ? activeProject?.contentType
            : "Empty content",
        },
      ];

      if (statList) setStats(statList);
    }
  }, [profile]);

  return (
    <div className="p-4 overflow-y-auto">
      <h2 className="mb-2 font-bold text-primary">
        Welcome {profile.userAccount.userName}.
      </h2>
      {/* Overview Cards */}
      <InformationGrid stats={stats} />
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary mb-3"
      >
        Create Project{" "}
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <NewProjectForm />
      </Modal>
      {/* Table or Chart */}
      {stats.length === 0 && (
        <Card
          title="No projects started"
          body="Start a project to start adding content to your site"
        />
      )}
    </div>
  );
}
