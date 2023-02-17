import get from "lodash.get";
import { expandBlockPath } from "../features/pageBuilderSlice";
import { useAppSelector } from "./redux/hooks";

const useBlockStateSelector = (path: string) =>
  useAppSelector(
    (state) =>
      get(state, `pageBuilder.${expandBlockPath(path)}`) as
        | typeof state["pageBuilder"]["root"]
        | undefined
  );

export default useBlockStateSelector;
