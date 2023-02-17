import useBlockStateSelector from "../../../commmon/useBlockStateSelector";
import { BlockSelector } from "./BlockSelector";

export const ReduxBlockSelector: React.FC<{
  parentPath: string;
  id: string;
}> = ({ parentPath, id }) => {
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
