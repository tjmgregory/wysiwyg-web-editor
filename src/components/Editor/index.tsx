import { RootBox } from "../Objects/Box";
import { EditorContextProvider } from "./EditorContext";
import EditorModeSwitch from "./EditorModeSwitch";

const Editor: React.FC = () => {
  return (
    <EditorContextProvider>
      <EditorModeSwitch />
      <RootBox />
    </EditorContextProvider>
  );
};

export default Editor;
