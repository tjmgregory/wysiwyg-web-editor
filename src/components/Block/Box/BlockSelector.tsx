import BoxBlock from ".";
import Block from "../../../commmon/Block";
import { BlockState } from "../../../features/blockEditorSlice";
import TextBlock from "../Text";

export const BlockSelector: React.FC<{
  state: BlockState;
  statePath: string;
}> = ({ state, statePath }) => {
  switch (state.block) {
    case Block.Box:
      return <BoxBlock state={state} statePath={statePath} />;
    case Block.Text:
      return <TextBlock state={state} statePath={statePath} />;
    default:
      return null;
  }
};
