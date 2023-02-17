import { BlockState } from "../../../features/blockEditorSlice";
import { ReduxBlockSelector } from "./ReduxBlockSelector";

export const mapObjectStateToComponentFactory =
  (parentPath: string) =>
  (state: BlockState): React.ReactNode => {
    return (
      <ReduxBlockSelector
        key={state.id}
        statePath={`${parentPath}.${state.id}`}
      />
    );
  };
