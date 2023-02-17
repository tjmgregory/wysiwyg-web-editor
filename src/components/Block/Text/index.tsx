import React, { useState } from "react";
import EditorMode from "../../../commmon/EditorMode";
import { useEditorContext } from "../../Editor/EditorContext";

const variantTagMap: Record<UserTextProps["variant"], React.FC> = {
  h1: (props) => <h1 {...props} />,
  p: (props) => <p {...props} />,
};

export interface UserTextProps {
  variant: "h1" | "p";
}

const Text: React.FC<UserTextProps> = ({ variant }) => {
  const { editorMode } = useEditorContext();
  return <TextOrInput editorMode={editorMode} variant={variant} />;
};

const TextOrInput: React.FC<UserTextProps & { editorMode: EditorMode }> = ({
  editorMode,
  variant,
}) => {
  const [value, setValue] = useState("");
  if (editorMode === EditorMode.Edit) {
    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
  }
  return variantTagMap[variant]({ children: value });
};

export default Text;
