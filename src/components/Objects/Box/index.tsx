import get from "lodash.get";
import Objects from "../../../commmon/Objects";
import { useAppDispatch, useAppSelector } from "../../../commmon/redux/hooks";
import {
  addChildObject,
  expandObjectPath,
  PageBuilderState,
} from "../../../features/pageBuilderSlice";

type ParentChild = (props: {
  addRight?: (node: React.ReactNode) => void;
}) => React.ReactNode;

const mapObjectStateToComponentFactory =
  (parentPath: string) =>
  (state: PageBuilderState<Objects>): React.ReactNode => {
    return <Box parentPath={parentPath} id={state.id} />;
  };

export const RootBox: React.FC = () => {
  const state = useAppSelector((state) => state.pageBuilder.root.children);
  const dispatch = useAppDispatch();

  const addChild = () =>
    dispatch(
      addChildObject({
        object: Objects.Box,
      })
    );

  const mapStateToComponents = mapObjectStateToComponentFactory("root");
  // TODO: Fix the ordering issue
  const children = Object.values(state).map(mapStateToComponents);

  return <Div addChild={addChild}>{children}</Div>;
};

const Box: React.FC<{ parentPath: string; id: string }> = ({
  parentPath,
  id,
}) => {
  const objectPath = expandObjectPath(`${parentPath}.${id}`);
  console.log(objectPath);
  const state = useAppSelector(
    (state) =>
      get(
        state,
        `pageBuilder.${objectPath}`
      ) as typeof state["pageBuilder"]["root"]
  );
  const dispatch = useAppDispatch();

  const addChild = () =>
    dispatch(
      addChildObject({
        parentPath: `${parentPath}.${id}`,
        object: Objects.Box,
      })
    );

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

export default Box;
