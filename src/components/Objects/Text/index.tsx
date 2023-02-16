import { useState } from "react";
import EditorMode from "../../../commmon/EditorMode";
import { useEditorContext } from "../../Editor/EditorContext";

const Text: React.FC = () => {
  const { editorMode } = useEditorContext();
  return <TextOrInput editorMode={editorMode} />;
};

const TextOrInput: React.FC<{ editorMode: EditorMode }> = ({ editorMode }) => {
  const [value, setValue] = useState("");
  if (editorMode === EditorMode.Edit) {
    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
  }
  return <h1>{value}</h1>;
};

export default Text;
