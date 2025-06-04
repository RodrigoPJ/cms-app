import type { CreateContent } from "../utils/types/components-interface";

export function CreateContent({projectId}:CreateContent) {
    console.log(projectId);
    
    return(
         <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Create a Project</h2>
      
      </div>

    )
}