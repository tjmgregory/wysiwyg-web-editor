import EditorMode from "../../commmon/EditorMode";
import { useEditorContext } from "./EditorContext";
import styled from "styled-components";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const EditorModeSwitch: React.FC = () => {
  const { editorMode, setEditorMode } = useEditorContext();
  return (
    <Root
      type="single"
      defaultValue={editorMode}
      aria-label="Editor mode"
      onValueChange={setEditorMode}
    >
      <Item value={EditorMode.Edit}>{"Edit"}</Item>
      <Item value={EditorMode.Preview}>{"Preview"}</Item>
    </Root>
  );
};

const Root = styled(ToggleGroup.Root)`
  --background-color: lightgrey;
  display: inline-flex;
  box-shadow: 0 2px 10px #666666;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--background-color);
`;

const Item = styled(ToggleGroup.Item)`
  background-color: var(--background-color);
  outline: none;
  border: none;
  padding: 8px 16px;
  transition: background-color 0.1s;

  &:hover {
    background-color: white;
  }

  &[data-state="on"] {
    background-color: white;
  }
`;

export default EditorModeSwitch;
