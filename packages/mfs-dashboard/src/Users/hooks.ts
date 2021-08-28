import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUsers as fetchUsersAction,
  createUser as createUserAction,
  deleteUser as deleteUserAction,
  createFakeRowData as createFakeRowDataAction,
} from "./reducer";
import {
  usersSelector,
  isLoadingSelector,
  deletionsLoadingSelector,
  rowDataSelector,
} from "./selectors";

export const useEvents = (events, handlers) => {
  useEffect(() => {
    const handleEvent = (event) => {
      const handler = handlers[event.data.type];

      if (!handler) {
        return;
      }

      handler(event);
    };

    events.subscribe(handleEvent);
  }, [events, handlers]);
};

export const useUsersState = ({ events }) => {
  const isLoading = useSelector(isLoadingSelector);
  const users = useSelector(usersSelector);
  const deletionsLoading = useSelector(deletionsLoadingSelector);
  const dispatch = useDispatch();
  const handlers = useMemo(
    () => ({
      ["USERS_QUEUE/POST_SUCCESSFUL"]: () => dispatch(fetchUsersAction()),
      ["USERS_QUEUE/DELETE_SUCCESSFUL"]: () => dispatch(fetchUsersAction()),
    }),
    [dispatch]
  );

  useEvents(events, handlers);

  const createUser = useCallback(
    (userData) => {
      dispatch(createUserAction(userData));
    },
    [dispatch]
  );

  const fetchUsers = useCallback(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  const deleteUser = useCallback(
    (user) => {
      dispatch(deleteUserAction(user));
    },
    [dispatch]
  );

  const rowData = useSelector(rowDataSelector);

  const createFakeRowData = useCallback(
    (fakeRowData) => {
      dispatch(createFakeRowDataAction(fakeRowData));
    },
    [dispatch]
  );

  useEffect(fetchUsers, [fetchUsers]);

  return {
    users,
    createUser,
    fetchUsers,
    deleteUser,
    isLoading,
    deletionsLoading,
    rowData,
    createFakeRowData,
    hasUsers: users.length > 0,
  };
};
