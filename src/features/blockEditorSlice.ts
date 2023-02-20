import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import Block from "../common/Block";
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
        backgroundColor: "hotpink",
      },
    },
    childBlocks: {
      [initialTextId]: {
        id: initialTextId,
        block: Block.Text,
        props: {
          variant: "h1",
          value: undefined,
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
      value: undefined,
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
        parentPath: string;
        block: Block;
      }>
    ) {
      const realParentPath = expandBlockPath(action.payload.parentPath);
      const blockState = get(state, realParentPath);
      if (!stateHasChildBlocks(blockState)) {
        return;
      }
      const newBlock = blockGenerator[action.payload.block]();
      blockState.childBlocks = {
        ...blockState.childBlocks,
        [newBlock.id]: newBlock,
      };
    },
    setProp(
      state,
      action: PayloadAction<{
        statePath: string;
        prop: { key: string; value: UserTextProps["value"] };
      }>
    ) {
      const realStatePath = expandBlockPath(action.payload.statePath);
      const blockState = get(state, realStatePath);
      blockState.props[action.payload.prop.key] = action.payload.prop.value;
    },
  },
});

export const { addChildBlock, setProp } = blockEditorSlice.actions;
export default blockEditorSlice.reducer;
