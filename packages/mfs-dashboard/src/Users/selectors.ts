import { createSelector } from "@reduxjs/toolkit";

const selfState = (state) => state.users;

export const usersSelector = createSelector(selfState, (state) => state.data);
export const isLoadingSelector = createSelector(
  selfState,
  (state) => state.isLoading
);
export const deletionsLoadingSelector = createSelector(
  selfState,
  (state) => state.deleteLoading
);
export const rowDataSelector = createSelector(
  selfState,
  (state) => state.rowData
);
