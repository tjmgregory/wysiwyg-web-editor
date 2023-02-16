import Box from "../Objects/Box";
import { EditorContextProvider } from "./EditorContext";
import EditorModeSwitch from "./EditorModeSwitch";

const Editor: React.FC = () => {
  return (
    <EditorContextProvider>
      <EditorModeSwitch />
      <Box parentPath="" id="root" />
    </EditorContextProvider>
  );
};

export default Editor;
