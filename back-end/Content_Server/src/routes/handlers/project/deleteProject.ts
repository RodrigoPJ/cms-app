import { Request, Response } from 'express';
import { AppDataSource } from '../../../database/db-config/data-source';
import { Project } from '../../../database/db-config/entity/Project';

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const itemRepo = AppDataSource.getRepository(Project);

    const result = await itemRepo.delete(projectId);

    if (result.affected === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // 204 No Content is standard for a successful DELETE
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteProject;