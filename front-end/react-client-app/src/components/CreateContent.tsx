import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateContent } from "../utils/types/components-interface";
import Quill from "./quill/Quill";
import { useAppDispatch } from "../utils/store/hooks";
import { FormInput } from "./daisy-ui/FormInput";
import { ContentService } from "../services/content-service/ContentService";

export function CreateContent({ projectId, setModalOpen }: CreateContent) {
  const [quillValue, setQuillValue] = useState("");
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    properties: "",
    type: "",
  });
function changeHandler(e:ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const saveContent = (e:FormEvent) => {
    e.preventDefault()
    console.log(projectId, quillValue);
    const content = {
      title: formData.title,
      type: formData.type,
      properties: formData.properties,
      projectId
    };
    const contentService = new ContentService(projectId);

    dispatch(contentService.createNewContent(content,quillValue)).then(()=>{
      setModalOpen(false);
    })

  };

  return (
    <form>
      <h2 className="mb-4  text-center font-bold text-2xl">
        Create your content
      </h2>
      <div className="flex gap-2 my-3">
        <div className="flex flex-col justify-center text-center">
          <label htmlFor="ctn-title">Title</label>
          <FormInput
            id="ctn-title"
            name="title"
            type="text"
            value={formData.title}
            handleChange={changeHandler}
          />
        </div>

        <FormInput
          id="ctn-type"
          name="type"
          label="Type: "
          type="text"
          value={formData.type}
          handleChange={changeHandler}
        />
        <FormInput
          id="props1"
          name="properties"
          label="Properties: "
          type="text"
          value={formData.properties}
          handleChange={changeHandler}
        />
      </div>
      <div className="flex flex-col">
        <Quill setValue={setQuillValue} /> 
        <button className="btn btn-primary mt-5" onClick={saveContent}>
          Save
        </button>
      </div>
    </form>
  );
}
