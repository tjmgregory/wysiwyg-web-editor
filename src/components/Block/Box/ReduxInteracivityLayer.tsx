import { ReactElement } from "react";
import Block from "../../../commmon/Block";
import { useAppDispatch } from "../../../commmon/redux/hooks";
import { addChildBlock } from "../../../features/blockEditorSlice";

const ReduxBlockController: React.FC<{
  statePath: string;
  children: ({ addChild }: { addChild?: () => void }) => ReactElement;
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
  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "hsla(0deg 100% 50%, 0.3)",
      }}
      onClick={addChild}
    >
      {children}
    </div>
  );
};

const ReduxInteractivityLayer: React.FC<
  React.PropsWithChildren<{ statePath: string }>
> = ({ statePath, children }) => (
  <ReduxBlockController statePath={statePath}>
    {({ addChild }) => (
      <InteractivityLayer addChild={addChild}>{children}</InteractivityLayer>
    )}
  </ReduxBlockController>
);

export default ReduxInteractivityLayer;
