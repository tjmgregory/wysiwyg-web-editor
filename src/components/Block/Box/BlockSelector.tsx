import Box from ".";
import Block from "../../../commmon/Block";
import { BlockState } from "../../../features/blockEditorSlice";
import Text from "../Text";

export const BlockSelector: React.FC<{
  state: BlockState;
  statePath: string;
}> = ({ state, statePath }) => {
  switch (state.block) {
    case Block.Box:
      return <Box state={state} statePath={statePath} />;
    case Block.Text:
      return <Text {...state.props} />;
    default:
      return null;
  }
};
