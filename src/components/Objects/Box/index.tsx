import get from "lodash.get";
import Objects from "../../../commmon/Objects";
import { useAppDispatch, useAppSelector } from "../../../commmon/redux/hooks";
import { addChildObject } from "../../../features/pageBuilderSlice";

type ParentChild = (props: {
  addRight?: (node: React.ReactNode) => void;
}) => React.ReactNode;

export const RootBox: React.FC = () => {
  const state = useAppSelector((state) => state.pageBuilder);
  const dispatch = useAppDispatch();

  const addChild = () =>
    dispatch(
      addChildObject({
        object: Objects.Box,
      })
    );

  return <Div addChild={addChild}></Div>;
};

const Box: React.FC<{ parentPath: string; id: string }> = ({
  parentPath,
  id,
}) => {
  const state = useAppSelector(
    (state) =>
      get(state, parentPath)?.children[id] as typeof state["pageBuilder"]
  );
  const dispatch = useAppDispatch();

  const addChild = () =>
    dispatch(
      addChildObject({
        parentPath: `${parentPath}.${id}`,
        object: Objects.Box,
      })
    );

  return <Div addChild={addChild}></Div>;
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

export default Box;
