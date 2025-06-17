// components/QuillEditor.jsx
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import type { QuillComponent } from "../../utils/types/components-interface";
import { DataContent } from "../../services/content-service/DataContent";

const QuillEditor = ({ value, setValue, fileAdded }: QuillComponent) => {
  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);
  if (value === "delete" && quillRef.current) {
    quillRef.current.root.innerHTML = "";
  }

  useEffect(() => {
    if (!editorRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Write something amazing...",
      modules: {
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"],
            ["clean"],
          ],
          handlers: {
            image: () => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.click();

              input.onchange = async () => {
                console.log(input);
                
                const file = input.files ? input.files[0] : null;
                if (!file) return;

                // Step 1: Get Pre-signed URL from backend
               const url = await DataContent.uploadTosS3(file);
                console.log(url);
                
                
                const imageUrl = url.split("?")[0]; // Public URL without query params
                fileAdded(imageUrl);
                if (!quillRef.current) return;
                const range = quillRef.current.getSelection();
                if (range)
                  quillRef.current.insertEmbed(range.index, "image", imageUrl);
              };
            },
          },
        },
      },
    });

    // Handle content changes
    quillRef.current.on("text-change", () => {
      if (quillRef.current) {        
        setValue(quillRef.current.getSemanticHTML());
      }
    });

    // Set initial content
    if (value) {
      quillRef.current.root.innerHTML = value;
    }

    return () => {
      quillRef.current = null;
    };
  }, []);

  return (
    <div className="quill-wrapper border border-gray-300 rounded-lg p-2">
      <div ref={editorRef} style={{ height: "250px" }} />
    </div>
  );
};

export default QuillEditor;
