import Block from "../../../commmon/Block";
import { useAppDispatch, useAppSelector } from "../../../commmon/redux/hooks";
import useBlockStateSelector from "../../../commmon/useBlockStateSelector";
import {
  addChildBlock,
  BlockState,
  BoxBlockState,
  stateHasChildBlocks,
} from "../../../features/blockEditorSlice";

type ParentChild = (props: {
  addRight?: (node: React.ReactNode) => void;
}) => React.ReactNode;

const mapObjectStateToComponentFactory =
  (parentPath: string) =>
  (state: BlockState): React.ReactNode => {
    return <ReduxBlock parentPath={parentPath} id={state.id} />;
  };

export const RootBox: React.FC = () => {
  const state = useAppSelector((state) => {
    if (stateHasChildBlocks(state.blockEditor.root)) {
      return state.blockEditor.root.childBlocks;
    }
  });
  const dispatch = useAppDispatch();

  if (!state) {
    // TODO: Add an ability to reset the state
    console.warn("The root block was deleted.");
    return null;
  }

  const addChild = () =>
    dispatch(
      addChildBlock({
        block: Block.Box,
      })
    );

  const mapStateToComponents = mapObjectStateToComponentFactory("root");
  // TODO: Fix the ordering issue
  const children = Object.values(state).map(mapStateToComponents);

  return <Div addChild={addChild}>{children}</Div>;
};

const BlockSelector: React.FC<{
  state: BlockState;
  statePath: string;
}> = ({ state, statePath }) => {
  switch (state.block) {
    case Block.Box:
      return <Box state={state} statePath={statePath} />;
    // TODO: The rest of these
    default:
      return null;
  }
};

const ReduxBlock: React.FC<{ parentPath: string; id: string }> = ({
  parentPath,
  id,
}) => {
  const statePath = `${parentPath}.${id}`;
  const state = useBlockStateSelector(statePath);

  if (!state) {
    console.warn(
      "Box being rendered despite lack of state - rendering nothing."
    );
    return null;
  }

  return <BlockSelector state={state} statePath={statePath} />;
};

export interface UserBoxProps {
  style?: {};
}

const Box: React.FC<{ state: BoxBlockState; statePath: string }> = ({
  state,
  statePath,
}) => {
  const dispatch = useAppDispatch();

  const mapStateToComponents = mapObjectStateToComponentFactory(statePath);
  // TODO: Fix the ordering issue
  const children = Object.values(state.childBlocks).map(mapStateToComponents);

  const addChild = () =>
    dispatch(
      addChildBlock({
        parentPath: statePath,
        block: Block.Box,
      })
    );

  return <Div addChild={addChild}>{children}</Div>;
};

const Div: React.FC<React.PropsWithChildren<{ addChild: () => void }>> = ({
  addChild,
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button onClick={addChild}>{"Add Child"}</button>
      {children}
    </div>
  );
};

const childTitle: ParentChild = ({ addRight }: Parameters<ParentChild>[0]) => {
  return <h1>{addRight ? "Can add right" : "Cant add right"}</h1>;
};

export default ReduxBlock;
