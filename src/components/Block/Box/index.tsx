import { BoxBlockState } from "../../../features/blockEditorSlice";
import { ChildBlockRenderer } from "./ChildBlockRenderer";
import ReduxInteractivityLayer from "./ReduxInteracivityLayer";

export interface UserBoxProps {
  style?: {};
}

const Box: React.FC<React.PropsWithChildren<UserBoxProps>> = ({
  style,
  children,
}) => {
  return <div style={style}>{children}</div>;
};

const BoxBlock: React.FC<{
  state: BoxBlockState;
  statePath: string;
}> = ({ state, statePath }) => (
  <ReduxInteractivityLayer statePath={statePath}>
    <Box {...state.props}>
      <ChildBlockRenderer state={state} statePath={statePath} />
    </Box>
  </ReduxInteractivityLayer>
);

export default BoxBlock;
