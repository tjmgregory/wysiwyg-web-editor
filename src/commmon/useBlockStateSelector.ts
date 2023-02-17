import get from "lodash.get";
import { expandBlockPath } from "../features/blockEditorSlice";
import { useAppSelector } from "./redux/hooks";

const useBlockStateSelector = (path: string) =>
  useAppSelector(
    (state) =>
      get(state, `blockEditor.${expandBlockPath(path)}`) as
        | typeof state["blockEditor"]["root"]
        | undefined
  );

export default useBlockStateSelector;
