import useBlockStateSelector from "../../commmon/useBlockStateSelector";
import { BlockSelector } from ".";

export const ReduxBlockSelector: React.FC<{ statePath: string }> = ({
  statePath,
}) => {
  const state = useBlockStateSelector(statePath);

  if (!state) {
    console.warn(
      "Block being rendered despite lack of state - rendering nothing."
    );
    return null;
  }

  return <BlockSelector state={state} statePath={statePath} />;
};
