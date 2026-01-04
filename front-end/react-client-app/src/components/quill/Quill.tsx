// components/QuillEditor.jsx
import { useEffect, useRef, useImperativeHandle } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import type { QuillComponent } from "../../utils/types/components-interface";
import { DataContent } from "../../services/content-service/DataContent";

const QuillEditor = ({ fileAdded, quillRefProp }: QuillComponent) => {
  const containerRef = useRef(null);
  const internalQuillRef = useRef<Quill | null>(null);

  useImperativeHandle(quillRefProp, () => internalQuillRef.current as Quill);

  useEffect(() => {
    if (!containerRef.current || internalQuillRef.current) return;

    internalQuillRef.current = new Quill(containerRef.current, {
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
                const file = input.files ? input.files[0] : null;
                if (!file) return;

                // Step 1: Get Pre-signed URL from backend
               const url = await DataContent.uploadTosS3(file);
                console.log(url);
                
                
                const imageUrl = url.split("?")[0]; // Public URL without query params
                fileAdded(imageUrl);
                if (!internalQuillRef.current) return;
                const range = internalQuillRef.current.getSelection();
                if (range)
                  internalQuillRef.current.insertEmbed(range.index, "image", imageUrl);
              };
            },
          },
        },
      },
    });

    return () => {
      internalQuillRef.current = null;
    };
  }, [fileAdded]);

  return (
    <div className="quill-wrapper border border-gray-300 rounded-lg p-2">
      <div ref={containerRef} style={{ height: "250px" }} />
    </div>
  );
};

export default QuillEditor;
