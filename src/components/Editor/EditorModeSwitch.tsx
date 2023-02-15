import EditorMode from "../../commmon/EditorMode";
import { useEditorContext } from "./EditorContext";

const EditorModeSwitch: React.FC = () => {
  const { editorMode, setEditorMode } = useEditorContext();
  return (
    <>
      <p>{editorMode}</p>
      <button
        onClick={() =>
          setEditorMode(
            editorMode === EditorMode.Edit
              ? EditorMode.Preview
              : EditorMode.Edit
          )
        }
      >
        {"Change mode"}
      </button>
    </>
  );
};

export default EditorModeSwitch;
