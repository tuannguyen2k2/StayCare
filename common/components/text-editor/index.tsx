"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";
import Editor from "ckeditor5-custom-build";
// import Editor from "ckeditor5-custom-build/build/ckeditor";
// import DefaultEditor from "@ckeditor/ckeditor5-build-classic";
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect, useState } from "react";

// mui
import { Backdrop, CircularProgress } from "@mui/material";
import { CustomUploader } from "./CustomUpload";

type KeyValuePair = {
  [key: string]: any;
};

interface TextEditorProps {
  propRef?: any;
  initialData: string;
  onChange?: (data: string) => void;
  noEdit?: boolean;
  readonly?: boolean;
  onReady?: () => void;
  onError?: () => void;
  uploadImageRequestHeader?: KeyValuePair;
  uploadImageRequestUrl?: string;
}

const TextEditor = ({
  propRef,
  initialData,
  onChange,
  noEdit = false,
  readonly,
  onReady,
  onError,
  uploadImageRequestHeader,
  uploadImageRequestUrl = "",
}: TextEditorProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const uploadImageRequestHeader_ =
    typeof uploadImageRequestHeader !== "undefined"
      ? uploadImageRequestHeader
      : {
          "X-CSRF-TOKEN": "CSRF-Token",
        };

  const uploadAdapterPlugin = (editor: any) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: FileLoader
    ) => {
      return new CustomUploader(loader, uploadImageRequestUrl);
    };
  };

  useEffect(() => {
    setIsReady(true);
  }, []);

  //   if (uploadImageRequestUrl === "")
  //     return <p>Please provide image request url!</p>;

  return isReady ? (
    <CKEditor
      id="blog_editor"
      disabled={noEdit}
      editor={Editor}
      data={initialData}
      config={{
        extraPlugins: [],
        removePlugins: ["Title", uploadImageRequestUrl === "" ? "Image" : ""],
      }}
      onReady={(editor: any) => {
        if (readonly) {
          editor.ui.view.toolbar.element.style.display = "none";
          editor.ui.view.editable.element.style.border = "none";
        }
        if (typeof onReady !== "undefined") onReady();

        // Add upload adapter plugin
        editor.plugins.get("FileRepository").createUploadAdapter = (
          loader: FileLoader
        ) => {
          return new CustomUploader(loader, uploadImageRequestUrl);
        };

        // Add detect delete image
        editor.model.document.on("change:data", () => {
          const changes = editor.model.document.differ.getChanges();
          changes.forEach((change: any) => {
            if (change.type === "remove") {
              if (change.name === "imageBlock") {
                console.log("Image removed");
              }
            }
          });
        });

        propRef.current = editor;
      }}
      onChange={(event: any, editor: any) => {
        if (onChange) {
          const data = editor.getData();
          onChange(data);
        }
      }}
      onError={(error: any, details: any) => {
        if (typeof onError !== "undefined") onError();
        console.log({ error, details });
      }}
    />
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!isReady}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default TextEditor;
