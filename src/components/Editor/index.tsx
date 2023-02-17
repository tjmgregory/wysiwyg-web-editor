import { ReduxBlockSelector } from "../Block/Box/ReduxBlockSelector";
import { EditorContextProvider } from "./EditorContext";
import EditorModeSwitch from "./EditorModeSwitch";

const Editor: React.FC = () => {
  return (
    <EditorContextProvider>
      <EditorModeSwitch />
      <ReduxBlockSelector key="root" statePath="root" />
    </EditorContextProvider>
  );
};

export default Editor;
