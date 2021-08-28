import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import api from "./api";
import generateFakeData from "../Utils/generateFakeData";
import { showInfoSnack } from "../Snacks/reducer";
import { i18nnextCommonDashboard as i18n } from "@mfs/i18n";

// Simple implementation which should be revisited
const isNetworkError = (error) => error.message === "Network Error";

interface UsersState {
  data: User[];
  error: any;
  isLoading: boolean;
  deleteLoading: string[];
  rowData: RowData[];
}

const initialState: UsersState = {
  data: [],
  error: null,
  isLoading: false,
  deleteLoading: [],
  rowData: generateFakeData(10000),
};

export const fetchUsers = createAsyncThunk<User[]>("users/fetch", api.get);
export const createUser = createAsyncThunk<any, User>(
  "users/create",
  async (user, { dispatch }) => {
    try {
      const res = await api.post(user);
      dispatch(fetchUsers());
      return res;
    } catch (e) {
      if (isNetworkError(e)) {
        dispatch(showInfoSnack(i18n.t("Users.snacks.createUserQueue")));
      }

      throw new Error(`User was not created due to ${e}`);
    }
  }
);
export const deleteUser = createAsyncThunk<string, User>(
  "users/delete",
  async (user, { dispatch }) => {
    try {
      const res = await api.delete(user.name);
      dispatch(fetchUsers());
      return res;
    } catch (e) {
      if (isNetworkError(e)) {
        dispatch(showInfoSnack(i18n.t("Users.snacks.deleteUserQueue")));
      }

      throw new Error(`User was not deleted due to ${e}`);
    }
  }
);

export const createFakeRowData = createAction<TableDataProps>(
  "createFakeRowData"
);

const usersSlice = createSlice({
  name: "users",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.data = payload.reverse();
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteUser.pending, (state, action) => {
      const userID = action.meta.arg.id;

      state.deleteLoading = [...state.deleteLoading, userID];
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const userID = action.meta.arg.id;
      state.data = state.data.filter((user) => user.id !== userID);
      state.deleteLoading = state.deleteLoading.filter((id) => id !== userID);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      const userID = action.meta.arg.id;
      state.deleteLoading = state.deleteLoading.filter((id) => id !== userID);
    });
    builder.addCase(createFakeRowData, (state, action) => {
      const nextId = state.rowData.length;
      const { name, surname, position, occupation, location } = action.payload;

      state.rowData.push({
        id: nextId,
        name: name || `prop1_${nextId}`,
        surname: surname || `prop2_${nextId}`,
        position: position || `prop3_${nextId}`,
        occupation: occupation || `prop4_${nextId}`,
        location: location || `prop5_${nextId}`,
      });
    });
  },
});

export default usersSlice.reducer;
