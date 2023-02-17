import React, { ReactElement } from "react";
import EditorMode from "../../../commmon/EditorMode";
import { useAppDispatch } from "../../../commmon/redux/hooks";
import { setProp, TextBlockState } from "../../../features/blockEditorSlice";
import { useEditorContext } from "../../Editor/EditorContext";

const variantTagMap: Record<UserTextProps["variant"], React.FC> = {
  h1: (props) => <h1 {...props} />,
  p: (props) => <p {...props} />,
};

export interface UserTextProps {
  variant: "h1" | "p";
  value: string | number | undefined;
}

const Text: React.FC<UserTextProps> = ({ variant, value }) =>
  variantTagMap[variant]({ children: value });

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

const ReduxBlockPropController: React.FC<{
  statePath: string;
  children: (props: {
    setValue: (value: UserTextProps["value"]) => void;
  }) => ReactElement;
}> = ({ statePath, children }) => {
  const dispatch = useAppDispatch();
  const setValue = (value: UserTextProps["value"]) =>
    dispatch(
      setProp({
        statePath,
        prop: { key: "value", value },
      })
    );

  return children({ setValue });
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
