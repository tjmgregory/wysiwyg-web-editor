import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import Block from "../commmon/Block";
import get from "lodash.get";
import { UserBoxProps } from "../components/Block/Box";
import { UserTextProps } from "../components/Block/Text";

type Blocks =
  | {
      block: Block.Box;
      props: UserBoxProps;
    }
  | {
      block: Block.Text;
      props: UserTextProps;
    };

export type BlockState = {
  id: string;
  children: Record<string, BlockState>;
} & Blocks;

const initialState: Record<"root", BlockState> = {
  root: {
    id: "root",
    block: Block.Box,
    props: {},
    children: {},
  },
};

function newBox(): BlockState {
  return {
    id: uuid(),
    block: Block.Box,
    props: {},
    children: {},
  };
}

export function expandBlockPath(path: string) {
  return path.split(".").join(".children.");
}

export function collapseBlockPath(path: string) {
  return path.split(".children.").join(".");
}

const blockEditorSlice = createSlice({
  name: "blockEditor",
  initialState,
  reducers: {
    addChildBlock(
      state,
      action: PayloadAction<{
        parentPath?: string;
        block: Block;
      }>
    ) {
      const box = newBox();
      let blockState: typeof state["root"];
      if (!action.payload.parentPath) {
        blockState = state.root;
      } else {
        const realParentPath = expandBlockPath(action.payload.parentPath);
        blockState = get(state, realParentPath);
      }
      blockState.children = {
        ...blockState.children,
        [box.id]: box,
      };
    },
  },
});

export const { addChildBlock } = blockEditorSlice.actions;
export default blockEditorSlice.reducer;
