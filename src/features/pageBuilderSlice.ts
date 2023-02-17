import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import Block from "../commmon/Block";
import blockToComponent from "../commmon/BlockToComponent";
import get from "lodash.get";

export interface PageBuilderState<T extends Block> {
  id: string;
  object: T;
  props: React.ComponentProps<typeof blockToComponent[T]>;
  children: Record<string, PageBuilderState<Block>>;
}

const initialState: Record<"root", PageBuilderState<Block.Box>> = {
  root: {
    id: "root",
    object: Block.Box,
    props: {},
    children: {},
  },
};

function newBox(): PageBuilderState<Block.Box> {
  return {
    id: uuid(),
    object: Block.Box,
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

const pageBuilderSlice = createSlice({
  name: "pageBuilder",
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
      let objectState: typeof state["root"];
      if (!action.payload.parentPath) {
        objectState = state.root;
      } else {
        const realParentPath = expandBlockPath(action.payload.parentPath);
        objectState = get(state, realParentPath);
      }
      objectState.children = {
        ...objectState.children,
        [box.id]: box,
      };
    },
  },
});

export const { addChildBlock } = pageBuilderSlice.actions;
export default pageBuilderSlice.reducer;
