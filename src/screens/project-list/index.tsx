import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();
  const debouncedParam = useDebounce(param, 200);

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useEffect(() => {
    client("users").then(setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelProps = {
    param,
    setParam,
    users,
  };
  return (
    <div>
      <SearchPanel {...panelProps} />
      <List list={list} users={users} />
    </div>
  );
};
