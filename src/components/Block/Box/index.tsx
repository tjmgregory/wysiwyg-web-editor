import Block from "../../../commmon/Block";
import { useAppDispatch, useAppSelector } from "../../../commmon/redux/hooks";
import useBlockStateSelector from "../../../commmon/useBlockStateSelector";
import { addChildBlock, BlockState } from "../../../features/pageBuilderSlice";

type ParentChild = (props: {
  addRight?: (node: React.ReactNode) => void;
}) => React.ReactNode;

const mapObjectStateToComponentFactory =
  (parentPath: string) =>
  (state: BlockState<Block>): React.ReactNode => {
    return <ReduxBlock parentPath={parentPath} id={state.id} />;
  };

export const RootBox: React.FC = () => {
  const state = useAppSelector((state) => state.pageBuilder.root.children);
  const dispatch = useAppDispatch();

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

const ReduxBlock: React.FC<{ parentPath: string; id: string }> = ({
  parentPath,
  id,
}) => {
  const statePath = `${parentPath}.${id}`;
  const state = useBlockStateSelector(statePath);
  const dispatch = useAppDispatch();

  const addChild = () =>
    dispatch(
      addChildBlock({
        parentPath: statePath,
        block: Block.Box,
      })
    );

  if (!state) {
    console.warn(
      "Box being rendered despite lack of state - rendering nothing."
    );
    return null;
  }

  const mapStateToComponents = mapObjectStateToComponentFactory(
    `${parentPath}.${id}`
  );
  // TODO: Fix the ordering issue
  const children = Object.values(state.children).map(mapStateToComponents);

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
