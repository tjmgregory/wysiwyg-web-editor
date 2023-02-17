import styled from "styled-components";
import { ReduxBlockSelector } from "../Block/Box/ReduxBlockSelector";
import { EditorContextProvider } from "./EditorContext";
import EditorModeSwitch from "./EditorModeSwitch";

const Editor: React.FC = () => {
  return (
    <EditorContextProvider>
      <ReduxBlockSelector key="root" statePath="root" />
      <Toolbar>
        <EditorModeSwitch />
      </Toolbar>
    </EditorContextProvider>
  );
};

const Toolbar = styled.div`
  position: absolute;
  bottom: 0;
  margin: auto;
`;

export default Editor;
