import { useEffect } from "react";
import { useQuill,} from 'react-quilljs';

import type { QuillComponent } from "../../utils/types/components-interface";
 //import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import 'quill/dist/quill.snow.css'; // Add css for snow theme


export default function Quill ({setValue}:QuillComponent)  {
  const theme = 'snow';
 //  const theme = 'bubble';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'image'],
    ],
  };

  const placeholder = 'Compose an epic...';

  const formats = ['bold', 'italic', 'underline', 'strike', 'image'];

  const { quillRef, quill } = useQuill({ theme,modules, formats, placeholder });

    const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  };


  useEffect(() => {
    if (quill) {
      (quill.getModule('toolbar')as any).addHandler('image', selectLocalImage);      
      quill.on('text-change', () => {
        setValue(quill.getSemanticHTML())
      });
    }
  }, [quill]);

  return (
    <div style={{ width: '90%' , height: '50%' }}>
      <div ref={quillRef} />
    </div>
  );
};