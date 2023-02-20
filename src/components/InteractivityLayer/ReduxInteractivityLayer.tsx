import { ReactElement } from "react";
import Block from "../../common/Block";
import EditorMode from "../../common/EditorMode";
import { useAppDispatch } from "../../common/redux/hooks";
import { addChildBlock } from "../../features/blockEditorSlice";
import { useEditorContext } from "../Editor/EditorContext";
import InteractivityLayer from ".";

const ReduxBlockController: React.FC<{
  statePath: string;
  children: (props: { addChild?: () => void }) => ReactElement;
}> = ({ statePath, children }) => {
  const dispatch = useAppDispatch();
  const addChild = () =>
    dispatch(
      addChildBlock({
        parentPath: statePath,
        block: Block.Box,
      })
    );

  return children({ addChild });
};

const ReduxInteractivityLayer: React.FC<
  React.PropsWithChildren<{ statePath: string }>
> = ({ statePath, children }) => {
  const { editorMode } = useEditorContext();
  if (editorMode === EditorMode.Preview) {
    return <>{children}</>;
  }
  return (
    <ReduxBlockController statePath={statePath}>
      {({ addChild }) => (
        <InteractivityLayer addChild={addChild}>{children}</InteractivityLayer>
      )}
    </ReduxBlockController>
  );
};

export default ReduxInteractivityLayer;
