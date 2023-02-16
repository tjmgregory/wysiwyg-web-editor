import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import Objects from "../commmon/Objects";
import objectsToComponents from "../commmon/ObjectsToComponents";
import get from "lodash.get";

export interface PageBuilderState<T extends Objects> {
  id: string;
  object: T;
  props: React.ComponentProps<typeof objectsToComponents[T]>;
  children: Record<string, PageBuilderState<Objects>>;
}

const initialState: Record<"root", PageBuilderState<Objects.Box>> = {
  root: {
    id: "root",
    object: Objects.Box,
    props: {},
    children: {},
  },
};

function newBox(): PageBuilderState<Objects.Box> {
  return {
    id: uuid(),
    object: Objects.Box,
    props: {},
    children: {},
  };
}

export function expandObjectPath(path: string) {
  return path.split(".").join(".children.");
}

export function collapseObjectPath(path: string) {
  return path.split(".children.").join(".");
}

const pageBuilderSlice = createSlice({
  name: "pageBuilder",
  initialState,
  reducers: {
    addChildObject(
      state,
      action: PayloadAction<{
        parentPath?: string;
        object: Objects;
      }>
    ) {
      const box = newBox();
      let objectState: typeof state["root"];
      if (!action.payload.parentPath) {
        objectState = state.root;
      } else {
        const realParentPath = expandObjectPath(action.payload.parentPath);
        objectState = get(state, realParentPath);
      }
      objectState.children = {
        ...objectState.children,
        [box.id]: box,
      };
    },
  },
});

export const { addChildObject } = pageBuilderSlice.actions;
export default pageBuilderSlice.reducer;
