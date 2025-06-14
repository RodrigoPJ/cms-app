import { FormInput } from "./daisy-ui/FormInput";
import { useState } from "react";
import { projectItemList } from "../utils/constants/projectItemList";
import { useAppDispatch, useAppSelector } from "../utils/store/hooks";
import { ContentService } from "../services/content-service/ContentService";

export function NewProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    contentType: "",
  });
  const accId = useAppSelector(state => state.profile.userAccount.id);
  const dispatch = useAppDispatch();

  function handleSubmit() {
    const contService = new ContentService(accId);
    dispatch(
      contService.createNewProject(formData.name, formData.contentType,)
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Create a Project</h2>
      <form onSubmit={handleSubmit} method="dialog" className="space-y-4">
        <FormInput
          {...projectItemList[0]}
          value={formData.name}
          handleChange={handleChange}
        />
        <FormInput
          {...projectItemList[1]}
          value={formData.contentType}
          handleChange={handleChange}
        />
        <button className="btn btn-primary">Create new Project</button>
      </form>
    </div>
  );
}
