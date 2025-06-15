// components/QuillEditor.jsx
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import type { QuillComponent } from "../../utils/types/components-interface";

const QuillEditor = ({ value, setValue }: QuillComponent) => {
  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);

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
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.click();

              input.onchange = async () => {};
            },
          },
        },
      },
    });

    // Handle content changes
    quillRef.current.on("text-change", () => {
      if (quillRef.current) {
        setValue(quillRef.current.root.getHTML());
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
      <div ref={editorRef} style={{ height: "300px" }} />
    </div>
  );
};

export default QuillEditor;
