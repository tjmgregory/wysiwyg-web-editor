import get from "lodash.get";
import { useState } from "react";
import Objects from "../../../commmon/Objects";
import { useAppDispatch, useAppSelector } from "../../../commmon/redux/hooks";
import { addChildObject } from "../../../features/pageBuilderSlice";
import Text from "../Text";

type ParentChild = (props: {
  addRight?: (node: React.ReactNode) => void;
}) => React.ReactNode;

const Box: React.FC<{ parentPath: string; id: string }> = ({
  parentPath,
  id,
}) => {
  const state = useAppSelector(
    (state) =>
      get(state, parentPath)?.children[id] as typeof state["pageBuilder"]
  );
  const dispatch = useAppDispatch();

  const insertNode = () =>
    dispatch(addChildObject({ parentPath, object: Objects.Box }));

  return <Div addChild={insertNode}></Div>;
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
