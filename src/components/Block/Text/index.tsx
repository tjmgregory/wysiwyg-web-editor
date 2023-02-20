import React from "react";
import EditorMode from "../../../commmon/EditorMode";
import { TextBlockState } from "../../../features/blockEditorSlice";
import { useEditorContext } from "../../Editor/EditorContext";
import { ReduxBlockPropController } from "../ReduxBlockPropController";
import { Text } from "./Text";

export interface UserTextProps {
  variant: "h1" | "p";
  value: string | number | undefined;
}

const TextOrInput: React.FC<
  UserTextProps & {
    setValue: (value: UserTextProps["value"]) => void;
  }
> = ({ variant, value, setValue }) => {
  const { editorMode } = useEditorContext();

  if (editorMode === EditorMode.Preview) {
    return <Text variant={variant} value={value} />;
  }

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};

const TextBlock: React.FC<{ state: TextBlockState; statePath: string }> = ({
  state,
  statePath,
}) => (
  <ReduxBlockPropController statePath={statePath}>
    {({ setValue }) => <TextOrInput {...state.props} setValue={setValue} />}
  </ReduxBlockPropController>
);

export default TextBlock;
