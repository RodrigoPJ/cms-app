import { useState,useRef, useCallback, type ChangeEvent, type FormEvent } from "react";
import type { CreateContent } from "../utils/types/components-interface";
import { FormInput } from "./daisy-ui/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataContent } from "../services/content-service/DataContent";
import Quill from "quill";
import QuillEditor from "./quill/Quill";

export function CreateContent({ projectId, setModalOpen }: CreateContent) {
  const quillRef = useRef<Quill>(null);
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
      const editorContent = quillRef.current?.getSemanticHTML();
      const savedContent = await DataContent.postContent(content, editorContent || '');
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
      if(quillRef.current) quillRef.current.root.innerHTML = "";
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

  const onFileAdded = useCallback(
    (url: string) => {
      console.log(url);
    },[])
  
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
        <QuillEditor quillRefProp={quillRef} fileAdded={onFileAdded} />
        <button className="btn btn-primary mt-5" onClick={saveContent}>
          Save
        </button>
      </div>
    </form>
  );
}
