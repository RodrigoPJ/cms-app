import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateContent } from "../utils/types/components-interface";
import { FormInput } from "./daisy-ui/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataContent } from "../services/content-service/DataContent";
import QuillEditor from "./quill/Quill";

export function CreateContent({ projectId, setModalOpen }: CreateContent) {
  const [tiptapValue, setTiptapValue] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    properties: "",
    type: "",
  });
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async (projectId: string) => {
      const content = {
        title: formData.title,
        type: formData.type,
        properties: formData.properties,
        projectId,
      };
      const savedContent = await DataContent.postContent(content, tiptapValue);
      return savedContent;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["project-content", projectId],
        exact: true,
      });
      setFormData({
        title: "",
        body: "",
        properties: "",
        type: "",
      });
      setTiptapValue("delete");
      setModalOpen(false);
    },
  });

  function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const saveContent = (e: FormEvent) => {
    e.preventDefault();
    mutate(projectId);
  };
  function onFileAdded(url:string) {
    setFormData({ ...formData, properties: JSON.stringify({url}) })
  }

  return (
    <form>
      <h2 className="mb-4  text-center font-bold text-2xl">
        Create your content
      </h2>
      <div className="flex gap-2 my-3">
        <div className="flex flex-col justify-center text-center">
          <label htmlFor="ctn-title">Title</label>
          {isPending && <p>saving .... </p>}
          <FormInput
            id="ctn-title"
            name="title"
            type="text"
            value={formData.title}
            handleChange={changeHandler}
          />
        </div>

        <div className="flex flex-col">
          <label>Type</label>
          <select
            onChange={changeHandler}
            className="select select-ghost hover:border-violet-800"
            name="type"
            id="content_type"
            value={formData.type}
          >
            {["image", "video", "audio"].map((proj) => {
              return (
                <option key={proj} value={proj}>
                  {proj}
                </option>
              );
            })}
          </select>
        </div>
        <FormInput
          id="ctn-props"
          name="properties"
          label="Properties: "
          type="text"
          value={formData.properties}
          handleChange={changeHandler}
        />
      </div>
      <div className="flex flex-col">
        <QuillEditor value={tiptapValue} setValue={setTiptapValue} fileAdded={onFileAdded} />
        <button className="btn btn-primary mt-5" onClick={saveContent}>
          Save
        </button>
      </div>
    </form>
  );
}
