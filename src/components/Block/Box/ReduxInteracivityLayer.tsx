import { ReactElement } from "react";
import Block from "../../../commmon/Block";
import EditorMode from "../../../commmon/EditorMode";
import { useAppDispatch } from "../../../commmon/redux/hooks";
import { addChildBlock } from "../../../features/blockEditorSlice";
import { useEditorContext } from "../../Editor/EditorContext";

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

export const InteractivityLayer: React.FC<
  React.PropsWithChildren<{ addChild?: () => void }>
> = ({ addChild, children }) => {
  return <div onClick={addChild}>{children}</div>;
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
