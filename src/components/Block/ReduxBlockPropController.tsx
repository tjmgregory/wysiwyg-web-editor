import React, { ReactElement } from "react";
import { useAppDispatch } from "../../commmon/redux/hooks";
import { setProp } from "../../features/blockEditorSlice";
import { UserTextProps } from "./Text/index";

export const ReduxBlockPropController: React.FC<{
  statePath: string;
  children: (props: {
    setValue: (value: UserTextProps["value"]) => void;
  }) => ReactElement;
}> = ({ statePath, children }) => {
  const dispatch = useAppDispatch();
  const setValue = (value: UserTextProps["value"]) => dispatch(
    setProp({
      statePath,
      prop: { key: "value", value },
    })
  );

  return children({ setValue });
};
