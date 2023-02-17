import { BoxBlockState } from "../../../features/blockEditorSlice";
import { ReduxBlockSelector } from "./ReduxBlockSelector";

export const ChildBlockRenderer: React.FC<{
  childBlocks: BoxBlockState["childBlocks"];
  statePath: string;
}> = ({ childBlocks, statePath }) => {
  // TODO: Fix the ordering issue
  const children = Object.values(childBlocks).map((childBlock) => (
    <ReduxBlockSelector
      key={childBlock.id}
      statePath={`${statePath}.${childBlock.id}`}
    />
  ));

  return <>{children}</>;
};
