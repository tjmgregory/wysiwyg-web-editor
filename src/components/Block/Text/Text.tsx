import React from "react";
import { UserTextProps } from "./index";

const variantTagMap: Record<UserTextProps["variant"], React.FC> = {
  h1: (props) => <h1 {...props} />,
  p: (props) => <p {...props} />,
};
export const Text: React.FC<UserTextProps> = ({ variant, value }) => variantTagMap[variant]({ children: value });
