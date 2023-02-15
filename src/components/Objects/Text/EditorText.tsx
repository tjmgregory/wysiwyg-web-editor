import { useEditorContext } from "../../Editor/EditorContext";
import Text from "./index";

const EditorText: React.FC<Omit<React.ComponentProps<typeof Text>, "mode">> = (
  delegateProps
) => {
  const { editorMode } = useEditorContext();
  return <Text mode={editorMode} {...delegateProps} />;
};

export default EditorText;
