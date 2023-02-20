import { BoxBlockState } from "../../../features/blockEditorSlice";
import { ChildBlockRenderer } from "../../BlockSelector/ChildBlockRenderer";
import ReduxInteractivityLayer from "../../InteractivityLayer/ReduxInteractivityLayer";

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
      <ChildBlockRenderer
        childBlocks={state.childBlocks}
        statePath={statePath}
      />
    </Box>
  </ReduxInteractivityLayer>
);

export default BoxBlock;
