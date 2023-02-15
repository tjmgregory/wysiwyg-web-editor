import { useState } from "react";
import EditorMode from "../../../commmon/EditorMode";

const Text: React.FC<{ mode: EditorMode }> = ({ mode }) => {
  const [value, setValue] = useState("");
  if (mode === EditorMode.Edit) {
    return <input onChange={(e) => setValue(e.target.value)} />;
  }
  return <h1>value</h1>;
};

export default Text;
