import get from "lodash.get";
import { expandObjectPath } from "../features/pageBuilderSlice";
import { useAppSelector } from "./redux/hooks";

const useObjectStateSelector = (path: string) =>
  useAppSelector(
    (state) =>
      get(state, `pageBuilder.${expandObjectPath(path)}`) as
        | typeof state["pageBuilder"]["root"]
        | undefined
  );

export default useObjectStateSelector;
