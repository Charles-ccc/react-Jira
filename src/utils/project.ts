import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { Project } from "screens/project-list/list";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
