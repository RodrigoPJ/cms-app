import { useState } from "react";
import type { CreateContent } from "../utils/types/components-interface";
import Quill from "./quill/Quill";
import { useAppDispatch } from "../utils/store/hooks";

export function CreateContent({projectId, setContents}:CreateContent) {
    const [quillValue, setQuillValue]  = useState('');
    const dispatch = useAppDispatch();
    const saveContent = ()=>{
      console.log(projectId, setContents);
      
    }
    return(
      <div>
        <h2 className="mb-4">Create your content</h2>
        <input placeholder= 'name' />
        <Quill setValue={setQuillValue} />
        <button className="btn btn-primary mt-3" onClick={saveContent}>Save</button>
      </div>
    )
}