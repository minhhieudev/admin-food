import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor({ onBlur, data, placeholder }) {
  return (
    <CKEditor
      placeholder={placeholder}
      editor={ClassicEditor}
      data={data}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          editor.editing.view.document.getRoot().placeholder = placeholder;
          return writer.setStyle(
            "height",
            "250px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onBlur={onBlur}
    />
  );
}

export default Editor;
