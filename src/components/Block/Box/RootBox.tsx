import { useAppSelector } from "../../../commmon/redux/hooks";
import BoxBlock from ".";
import { stateHasChildBlocks } from "../../../features/blockEditorSlice";

export const RootBox: React.FC = () => {
  const state = useAppSelector((state) => state.blockEditor.root);

  if (!state || !stateHasChildBlocks(state)) {
    // TODO: Add an ability to reset the state
    console.warn("The root block was deleted.");
    return null;
  }

  return <BoxBlock state={state} statePath="root" />;
};
