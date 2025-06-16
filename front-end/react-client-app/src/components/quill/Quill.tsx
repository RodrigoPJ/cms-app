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
            image: (ev: boolean) => {
              console.log(ev);
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.click();

              input.onchange = async (ev) => {
                console.log(ev);
                console.log(input.value);

                const file = input.files ? input.files[0] : null;
                if (!file) return;

                // Step 1: Get Pre-signed URL from backend
                const res = await fetch("http://localhost:3001/content/presigned-S3-url", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  mode: 'cors',
                  body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                  }),
                });

                const { url } = await res.json();

                // Step 2: Upload file directly to S3
                const s3Url = await fetch(url, {
                  method: "PUT",
                  body: file,
                });
                const body = await s3Url.arrayBuffer()
                console.log(s3Url.url);
                console.log(body);
                
                
                const imageUrl = url.split("?")[0]; // Public URL without query params
                if (!quillRef.current) return;
                const range = quillRef.current.getSelection();
                if (range)
                  quillRef.current.insertEmbed(range.index, "image", imageUrl);
                console.log(imageUrl);
                
              };
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
      <div ref={editorRef} style={{ height: "250px" }} />
    </div>
  );
};

export default QuillEditor;
