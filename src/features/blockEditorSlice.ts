import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import Block from "../commmon/Block";
import get from "lodash.get";
import { UserBoxProps } from "../components/Block/Box";
import { UserTextProps } from "../components/Block/Text";

type SharedBlockFields = {
  id: string;
};

export type BoxBlockState = SharedBlockFields & {
  block: Block.Box;
  props: UserBoxProps;
  childBlocks: Record<string, BlockState>;
};

export type TextBlockState = SharedBlockFields & {
  block: Block.Text;
  props: UserTextProps;
};

export type BlockState = BoxBlockState | TextBlockState;

const initialTextId = uuid();
const initialState: Record<"root", BlockState> = {
  root: {
    id: "root",
    block: Block.Box,
    props: {
      style: {
        display: "block",
        backgroundColor: "hotpink",
      },
    },
    childBlocks: {
      [initialTextId]: {
        id: initialTextId,
        block: Block.Text,
        props: {
          variant: "h1",
        },
      },
    },
  },
};

function newBox(): BoxBlockState {
  return {
    id: uuid(),
    block: Block.Box,
    props: {},
    childBlocks: {},
  };
}

function newText(): TextBlockState {
  return {
    id: uuid(),
    block: Block.Text,
    props: {
      variant: "p",
    },
  };
}

export function expandBlockPath(path: string) {
  return path.split(".").join(".childBlocks.");
}

export function stateHasChildBlocks(
  state: BlockState
): state is BlockState & BoxBlockState {
  return state.block === Block.Box;
}

const blockGenerator: Record<Block, () => BlockState> = {
  [Block.Box]: newBox,
  [Block.Text]: newText,
};

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
      let blockState: BlockState;
      if (!action.payload.parentPath) {
        blockState = state.root;
      } else {
        const realParentPath = expandBlockPath(action.payload.parentPath);
        blockState = get(state, realParentPath);
      }
      if (!stateHasChildBlocks(blockState)) {
        return;
      }
      const newBlock = blockGenerator[action.payload.block]();
      blockState.childBlocks = {
        ...blockState.childBlocks,
        [newBlock.id]: newBlock,
      };
    },
  },
});

export const { addChildBlock } = blockEditorSlice.actions;
export default blockEditorSlice.reducer;
