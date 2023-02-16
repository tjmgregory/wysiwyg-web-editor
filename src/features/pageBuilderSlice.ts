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

const initialState: PageBuilderState<Objects.Box> = {
  id: "root",
  object: Objects.Box,
  props: {},
  children: {},
};

function newBox(): PageBuilderState<Objects.Box> {
  return {
    id: uuid(),
    object: Objects.Box,
    props: {},
    children: {},
  };
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
      let parent: typeof state;
      if (!action.payload.parentPath) {
        parent = state;
      } else {
        parent = get(state, action.payload.parentPath);
      }
      parent.children = {
        ...state.children,
        [box.id]: box,
      };
    },
  },
});

export const { addChildObject } = pageBuilderSlice.actions;
export default pageBuilderSlice.reducer;
