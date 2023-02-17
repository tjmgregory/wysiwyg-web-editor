import { BoxBlockState } from "../../../features/blockEditorSlice";
import { mapObjectStateToComponentFactory } from "./mapObjectStateToComponentFactory";

export const ChildBlockRenderer: React.FC<{
  state: BoxBlockState;
  statePath: string;
}> = ({ state, statePath }) => {
  const mapStateToComponents = mapObjectStateToComponentFactory(statePath);
  // TODO: Fix the ordering issue
  const children = Object.values(state.childBlocks).map(mapStateToComponents);

  return children;
};
