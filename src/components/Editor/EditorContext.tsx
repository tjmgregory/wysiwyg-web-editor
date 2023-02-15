import React, { useContext, useState } from "react";
import EditorMode from "../../commmon/EditorMode";

const context = React.createContext<{
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
} | null>(null);

export function useEditorContext() {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error("Should not use editor components ouside an editor");
  }
  return ctx;
}

export const EditorContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [editorMode, setEditorMode] = useState(EditorMode.Edit);
  return (
    <context.Provider value={{ editorMode, setEditorMode }}>
      {children}
    </context.Provider>
  );
};
